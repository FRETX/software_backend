var picker;

data = {
  on_deck: 'No Chord',
  punches: [{ "time": 0, "disp_time": '00:00:00', "chord": "No Chord" }],
  current_punch_index: 0,
  current_punch_range: function() {
    if(data.current_punch_index == 0) {
      
    return { start: data.punches[data.current_punch_index-1]["time"], end: data.punches[data.current_punch_index]["time"] };
  },
  in_punch_range: function(time) {
    var range = data.current_punch_range();
    console.log(range);
    return(time >= range.start && time < range.end); 
  }
}

ctrl = {
  add_punch: function() {
    var time = player.current_time;
    var disp_time = secs_to_hms(time);
    var this_punch = { "time": time, "disp_time": disp_time, "chord": "No Chord" };
    data.punches.push(this_punch);
    data.punches.sort(SortByTime);

    var objDiv = document.getElementById("punchlist");
    objDiv.scrollTop = objDiv.scrollHeight;
    this_punch.chord = data.on_deck;
  },
  delete_punch: function(e,m) {
    var i = data.punches.indexOf(m.punch);
  	data.punches.splice(i,1);
  },
  choose_chord: function(e,m) {
    picker.set_chord(m.punch.chord);
    picker.get_chord(function(chord) {
      m.punch.chord = chord;
    });
  }
}

$(document).ready(function() {
  setup_data_bindings();
  setup_event_triggers();
  picker = new chordpicker();
  load_youtube_api(on_youtube_ready);
});

function on_youtube_ready() {
  player = new youtube_player();
  player.on_time_change(on_time_change);
  player.on_video_data(on_video_data);
}

function on_time_change(time) {
  console.log(data.in_punch_range(time));

 // var obj = $.grep(data.punches, function(o, i) {
  //  return( o['time'] >= time && data.punches[i-1]['time'] < time )  
 // })[0];
 // if(obj!= undefined)
 //   obj['selected'] = 'selected';
}

function on_video_data(data) {
  $('.vidinfo .title')[0].innerHTML = data['title'];
  $('.vidinfo .description')[0].innerHTML = data['description'];
}

function upload() {
  var title = window.prompt("Enter The Name Of Your Song", videodata.title);
  var songdata = {
    id: videodata.id,
    title: title,
    chords: data.punches
  }
  $.post('/song', JSON.stringify(songdata));
}

function setup_data_bindings() {
  rivets.bind($('body'), { data: data, ctrl: ctrl });
}

function setup_event_triggers() {
  $('.addvid input').on('focus', on_addvid_focus);
  $('.addvid input').on('blur', on_addvid_blur);
  $('.addvid button').on('click', on_addvid_click);
  $('.chord').on('focus', on_chord_focus);
}

function on_addvid_focus(e) {
  if(e.target.value == "Add the link to your YouTube video here..." ) { e.target.value = ''; }
  else { e.target.select(); }
}

function on_addvid_blur(e) {
  e.target.value = e.target.value ? e.target.value : "Add the link to your YouTube video here..."
}

function on_addvid_click(e) {
  var regex = /https:\/\/www.youtube.com\/watch\?v=(.{11})/;
  var match = regex.exec($('#link').val());
  if(!match) { alert('invalid syntax'); return; }
  player.loadVideoById(match[1], 0, "large")
  get_video_data(match[1]);
}

function on_ondeck_click(e) {
  picker.set_chord(e.target.value);
  picker.get_chord(function(chord) {
    data.on_deck = chord;
  });
}

function on_chord_focus(e) {
  e.target.blur();
}

function secs_to_hms(secs) {
  hrs  = Math.floor(secs/3600);
  secs = secs - hrs*3600;
  mins = Math.floor(secs/60);
  secs = secs - mins*60;
  secs = Math.round(secs);

  hrs  =  hrs.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false });
  mins = mins.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false });
  secs = secs.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false });

  return(hrs + ':' + mins + ':' + secs);
}

function SortByTime(a, b) { 
  return ((a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0));
}