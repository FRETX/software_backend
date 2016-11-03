data = {
  songs: []
}

/////////////////////////////////////////////// SETUP /////////////////////////////////////////////////////////

$(document).ready(function() {

  punchlist = new Punchlist();
  chordlib  = new Chordlib();

  ytplayer  = new YTPlayer(   id('ytplayer_container')  );
  fretboard = new Fretboard(  id('fretboard_container') );
  ctrlbar   = new Controlbar( id('ctrlbar_container')   );
  timeline  = new Timeline(   id('timeline_container')  );
  songlist  = new Songlist(   id('songlist_container')  );
  palette   = new Palette(    id('palette_container')   );

  songlist.on_list_loaded( function()     { load_song( songlist.random ); } );
  songlist.on_select(      function(song) { load_song( song );            } );

  timeline.on_scrub  = function(time_s) { ytplayer.current_time = time_s; } 
  timeline.get_color = function(chord_label) { return palette.get_color(chord_label); } 

  ytplayer.on_time_change( timeline.update_time   );
  ytplayer.on_time_change( punchlist.update_time  );
  ytplayer.on_time_change( ctrlbar.on_time_change );
  ytplayer.on_video_data(on_video_data); 
  ytplayer.ev_sub( 'duration', timeline.set_duration );

  palette.ev_sub( 'selected', add_chord_now );

  punchlist.ev_sub( 'list_changed', timeline.load );
  punchlist.ev_sub( 'current_punch_changed', current_punch_changed );
  punchlist.ev_sub( 'current_punch_changed', ctrlbar.on_punch_change );
  
});

/////////////////////////////////////////////// SETUP /////////////////////////////////////////////////////////

function load_song(song) {
  fretboard.reset();
  var punches = [];
  for(var i=0; i<song.punches.length; i++) {
    punches.push( new Punch(song.punches[i].time, song.punches[i].chord) );
  }
  punchlist.load(punches);
  palette.load(punches);
  ytplayer.load(song.youtube_id);
}

function on_video_data() {
  punchlist.update_time(0);
}

function current_punch_changed(punch) {
  fretboard.load_chord(chordlib.get_chord(punch.chord));
  palette.highlight_chord(punch.chord);
}

function add_chord_now(chord) {
  console.log(chord);
  punchlist.add_punch( { time: ytplayer.current_time , chord: chord.label } );
} 