var picker;

data = {
  punches: [{ "time": 0, "disp_time": '00:00:00', "chord": "No Chord" }]
}

ctrl = {
  add_punch: function() {
    var time = player.getCurrentTime();
    var disp_time = secs_to_hms(time);
    var this_punch = { "time": time, "disp_time": disp_time, "chord": "No Chord" };
    data.punches.push(this_punch);
    data.punches.sort(SortByTime);

    var objDiv = document.getElementById("punchlist");
    objDiv.scrollTop = objDiv.scrollHeight;
    if(id('ask_chord').checked == true) {
      picker.set_chord('No Chord');
      picker.get_chord(function(chord) {
        this_punch.chord = chord;
      });
    }
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
  load_youtube();
});

function upload() {
  
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

  hrs  = hrs.toLocaleString('en-US',  {minimumIntegerDigits: 2, useGrouping:false});
  mins = mins.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  secs = secs.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

  return(hrs + ':' + mins + ':' + secs);
}

function SortByTime(a, b) { 
  return ((a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0));
}

