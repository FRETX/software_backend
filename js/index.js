/////////////////////////////////////////////// SETUP /////////////////////////////////////////////////////////

var picker;

$(document).ready(function() {
  get_song_list();
  setup_data_bindings();
  setup_ui_event_handlers();
  picker = new chordpicker();
  load_youtube_api(on_youtube_ready);
});

function setup_data_bindings() {
  rivets.bind($('body'), { data: data, ctrl: ctrl });
}

function setup_ui_event_handlers() {
  $('.addvid input').on('focus', on_addvid_focus);
  $('.addvid input').on('blur', on_addvid_blur);
  $('.addvid button').on('click', on_addvid_click);
  $('#songlist').on('click', on_songlist_click);
  $('#open').on('click', on_open_click);
  $('.chord').on('focus', on_chord_focus);
}

/////////////////////////////////////////////// SETUP /////////////////////////////////////////////////////////


////////////////////////////////////////////// EVENTS /////////////////////////////////////////////////////////

function on_video_data(data) {
  $('.vidinfo .title')[0].innerHTML = data['title'];
  $('.vidinfo .description')[0].innerHTML = data['description'];
}

function on_youtube_ready() {
  player = new youtube_player();
  player.on_time_change(on_time_change);
  player.on_video_data(on_video_data);
}

function on_time_change(time) {
  console.log(time);
  console.log(punches.in_range(time));
}

punches = {
  range: function() {
    if(data.current_punch_index == 0) {
      if(data.punches[0]['time'] > 0) return { start: 0, end: data.punches[0]['time'], index: -1 };
      if(data.punches.length==1) return { start: 0, end: player.duration(), index: 0 };
      return { start: 0, end: data.punches[1]['time'], index: 0 };
    }
    return { start: data.punches[data.current_punch_index-1]["time"], end: data.punches[data.current_punch_index]["time"] };
  },
  in_range: function(time) {
    var range = punches.range();
    console.log(range);
    return(time >= range.start && time < range.end); 
  },
  set: function(time) {
    
  }
}

////////////////////////////////////////////// EVENTS /////////////////////////////////////////////////////////


///////////////////////////////////////////// UI EVENTS //////////////////////////////////////////////////////

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
  picker.set_chord( e.target.value );
  picker.get_chord( function(chord) { data.on_deck = chord; } );
}

function on_chord_focus(e) {
  e.target.blur();
}

function on_open_click(e) {
  id('songlist').style.display = 'inline-block';
}

function on_songlist_click(e) {
  id('songlist').style.display = 'none';
}

///////////////////////////////////////////// UI EVENTS //////////////////////////////////////////////////////

/////////////////////////////////////////// RIVETS ///////////////////////////////////////////////////////////

data = {
  on_deck: 'No Chord',
  punches: [{ "time": 0, "disp_time": '00:00:00', "chord": "No Chord" }],
  current_punch_index: 0
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
  },
  load_song: function(e,m) {
    cancelEvent(e);
    player.load(m.song['youtube_id']);
    data.punches = m.song['punches'];
    id('songlist').style.display = 'none';
  }
}

/////////////////////////////////////////// RIVETS ///////////////////////////////////////////////////////////


///////////////////////////////////////// API CALLS //////////////////////////////////////////////////////////

function get_song_list() { $.get('/songs/list', on_song_list ); }

function upload() {
  var title = window.prompt("Enter The Name Of Your Song", player.videodata.title);
  var songdata = {
    id: player.videodata.id,
    title: title,
    chords: data.punches
  }
  $.post('/songs/add', JSON.stringify(songdata));
}

///////////////////////////////////////// API CALLS //////////////////////////////////////////////////////////

/////////////////////////////////////// API CALLBACKS ////////////////////////////////////////////////////////

function on_song_list(list) {
  data['songs'] = list;
  console.log(list);
}

/////////////////////////////////////// API CALLBACKS ////////////////////////////////////////////////////////