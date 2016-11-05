data = {
  songs: []
}

/////////////////////////////////////////////// SETUP /////////////////////////////////////////////////////////

$(document).ready(function() {

  punchlist = new Punchlist();
  chordlib  = new Chordlib();

  ytplayer  = new YTPlayer(  id('ytplayer_container')  );
  fretboard = new Fretboard( id('fretboard_container') );
  timeline  = new Timeline(  id('timeline_container')  );
  songlist  = new Songlist(  id('songlist_container')  );
  palette   = new Palette();

  //songlist.on_list_loaded( function()     { load_song( songlist.random ); } );
  //songlist.on_select(      function(song) { load_song( song );            } );

  songlist.ev_sub('list_loaded', function()     { load_song( songlist.random ); } );
  songlist.ev_sub('selected',    function(song) { load_song( song ); } );

  timeline.on_scrub  = function(time_s) { ytplayer.current_time = time_s; } 
  timeline.get_color = function(chord_label) { return palette.get_color(chord_label); } 

  ytplayer.on_time_change( timeline.update_time  );
  ytplayer.on_time_change( punchlist.update_time );

  ytplayer.on_video_data(on_video_data); 

  ytplayer.ev_sub('duration', function(duration) { timeline.set_duration(duration); })
  ytplayer.ev_sub('ended', function() { timeline.update_time(); } )

  punchlist.ev_sub( 'current_punch_changed', function(punch) {
    fretboard.load_chord(chordlib.get_chord(punch.chord));
  });

  id('logo').addEventListener('click', function() { window.location.href = "http://fretx.rocks"; } );
  
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
  timeline.load(punches);
  ytplayer.load(song.youtube_id);
}

function on_video_data() {
  punchlist.update_time(0);
  //setTimeout(function() { timeline.set_duration(ytplayer.duration); }, 1200)
}