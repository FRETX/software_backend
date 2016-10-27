/////////////////////////////////////////////// SETUP /////////////////////////////////////////////////////////

var chord_picker;
var changes_picker;

$(document).ready(function() {
  
  get_song_list();
  setup_data_bindings();
  setup_ui_event_handlers();

  chordlib       = new Chordlib();
  chord_picker   = new chordpicker();
  punchlist      = new Punchlist();
  changes_picker = new changespicker(document.body, chord_picker);
  fretboard      = new Fretboard( id('fretboard_container') );
  palette        = new Palette( id('palette_container'), chord_picker );
  timeline       = new Timeline( id('timeline_container') );
  ctrlbar        = new Controlbar( id('ctrlbar_container') );

  palette.on_chord   = function(chord)       { punches.add(chord.label); }
  timeline.get_color = function(chord_label) { return palette.get_color(chord_label); } 
  timeline.on_scrub  = function(time_s)      { player.current_time = time_s; } 
  
  punchlist.on_punch_change( function(punch) {
    fretboard.load_chord(chordlib.get_chord(punch.chord));
  });

  load_youtube_api();

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
  $('#pickchanges').on('click', on_pick_changes );
}

/////////////////////////////////////////////// SETUP /////////////////////////////////////////////////////////


////////////////////////////////////////////// DATA EVENTS ////////////////////////////////////////////////////

function on_video_data(data) {
  $('.vidinfo .title')[0].innerHTML = data['title'];
  fretboard.reset();
  punchlist.update_time(0);
  setTimeout(function() { timeline.set_duration(player.duration); }, 1200)
}

function on_time_change(time) {
  timeline.update_time(time);
  punchlist.update_time(time);
}

function on_song_list(list) {
  data['songs'] = list;  
  build_player();
}

////////////////////////////////////////////// DATA EVENTS /////////////////////////////////////////////////////

punches = {
  range: function() {
    if(data.current_punch_index == -1 ) {
      return { start: 0, end: data.punches[0]['time'], index: -1 };
    }
    if(data.current_punch_index == 0) {
      if(data.punches.length==1) return { start: data.punches[0]['time'], end: player.duration(), index: 0 };
      return { start: data.punches[0]['time'], end: data.punches[1]['time'], index: 0 };
    }
    if(data.current_punch_index >= data.punches.length-1) return { start: data.punches[data.punches.length-1]["time"], end: player.duration, index: data.punches.length-1 };
    return { start: data.punches[data.current_punch_index]["time"], end: data.punches[data.current_punch_index+1]["time"] };
  },
  in_range: function(time) {
    if(data.punches.length == 0) return true;
    var range = punches.range();
    //console.log(range);
    return(time >= parseFloat(range.start) && time < parseFloat(range.end)); 
  },
  /*
  set: function(time) {
    //console.log("setting: " + time);
    //data.current_punch_index
    if(data.punches[0].time > time) data.current_punch_index = -1;
    for(var i=0; i<data.punches.length; i++) {
      if( punches.in_punch(i,time) ) {
        //console.log("in punch: " + i);
        data.punches[i]['selected'] = true;
        data.current_punch_index = i;
        fretboard.load_chord(chordlib.get_chord(data.punches[i].chord));
      } 
      else {
        data.punches[i]['selected'] = false;
      }
    }
  },*/
  in_punch: function(index,time) { 
    time = parseFloat(time);
    var last_node  = ( index == data.punches.length - 1 );
    var this_punch = data.punches[index];
    var next_punch = last_node ? null : data.punches[index+1];

    if( time < parseFloat(this_punch['time']) ) return false;  // TOO LOW
    if( last_node ) return true                                // LAST NODE
    if( time >= parseFloat(next_punch['time']) ) return false; // TOO HIGH
    return true;                                               // JUST RIGHT
  },
  add: function(chord) {  
    data.punches.push( new Punch( player.current_time, chord ) );
    data.punches.sort(SortByTime);
    timeline.load(data.punches);
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
  player.load($('#link').val());
  data.punches = [new Punch(0,'No Chord')];
}

function on_ondeck_click(e) {
  chord_picker.set_chord( e.target.value );
  chord_picker.get_chord( function(chord) { data.next_chord = chord; } );
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

function on_pick_changes(e) {
  if(empty(changes_picker)) return;
  changes_picker.get_changes( function(changes) { 
    data.changes = changes;
    data.changes_index = 0;
    update_change();
  } );
}

///////////////////////////////////////////// UI EVENTS //////////////////////////////////////////////////////


/////////////////////////////////////////// RIVETS ///////////////////////////////////////////////////////////

data = {
  next_chord: 'No Chord',
  punches: [ new Punch(0,'No Chord') ],
  current_punch_index: -1,
  changes: [],
  changes_index: 0
}

ctrl = {

  delete_punch: function(e,m) {
    var i = data.punches.indexOf(m.punch);
    data.punches.splice(i,1);
  },
  choose_chord: function(e,m) {
    chord_picker.set_chord(m.punch.chord);
    chord_picker.get_chord(function(chord) {
      m.punch.chord = chord;
    });
  },
  load_song: function(e,m) {
    cancelEvent(e);
    load_song(m.song);
    id('songlist').style.display = 'none';
  },
  jog_fw: function(e,m) { m.punch.jog(100);  },
  jog_bw: function(e,m) { m.punch.jog(-100); },
  prev_chord: function(e,m) { prev_change(); },
  next_chord: function(e,m) { next_change(); }

}

/////////////////////////////////////////// RIVETS ///////////////////////////////////////////////////////////


///////////////////////////////////////// API CALLS //////////////////////////////////////////////////////////

function get_song_list() { $.get('/songs/list', on_song_list ); }

function upload() {
  var title = window.prompt("Enter The Name Of Your Song", player.videodata.title);
  var punches = [];
  for(var i=0; i<data.punches.length; i++) {
    punches.push(data.punches[i].to_model());
  }
  var songdata = {
    id: player.videodata.id,
    title: title,
    chords: punches
  }
  $.post('/songs/add', JSON.stringify(songdata) )
    .done( function() { alert("Upload Successful!"); } )
    .fail( function(resp) { 
      alert("Upload Failed! \n" + resp.responseText);     
    } );
} 

///////////////////////////////////////// API CALLS //////////////////////////////////////////////////////////


////////////////////////////////////////// ORPHANS ///////////////////////////////////////////////////////////

function build_player() {
  song = data['songs'][Math.floor(Math.random()*data['songs'].length)];
  player = new youtube_player(song['youtube_id']);
    player.on_time_change(on_time_change);
    player.on_time_change(ctrlbar.on_time_change);
    player.on_video_data(on_video_data);  
  load_punches(song['punches']);
}

function load_song(song) {
  data.current_punch_index = 0;
  load_punches(song['punches']);
  player.load(song['youtube_id']);
  //id('punchlist').scrollTop = 0;
}

function load_punches(punches) {
  punchlist.load(punches);
  data.punches = [];
  for(var i=0; i<punches.length; i++) {
    data.punches.push( new Punch(punches[i].time, punches[i].chord) );
  }
  palette.load(data.punches);
  timeline.load(data.punches);
  timeline.duration
}

function jog_song(offset_ms) {
  for(var i=0; i<data.punches.length; i++) data.punches[i].jog(offset_ms); 
}