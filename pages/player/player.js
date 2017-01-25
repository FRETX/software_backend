data = {
  songs: []
}

/////////////////////////////////////////////// SETUP /////////////////////////////////////////////////////////

$(document).ready(function() {

  window.scrollTo(0,1);

  modal     = new Modal();
  feedback  = new FeedbackForm();
  punchlist = new Punchlist();
  chordlib  = new Chordlib();

  userview  = new UserView(  id('userview_container')  );
  ytplayer  = new YTPlayer(  id('ytplayer_container')  );
  fretboard = new Fretboard( id('fretboard_container') );
  timeline  = new Timeline(  id('timeline_container')  );
  palette   = new Palette();

  songlist  = new Songlist( id('songlist_container'), 'songs/list');

  feedback.ev_sub('done', modal.hide );
  modal.ev_sub('exit', function() { songlist.mount(id('songlist_container')); });

  songlist.ev_sub('selected', function(song) { 
    load_song( song );
    modal.hide(); 
    songlist.mount(id('songlist_container')); 
    history.pushState({ 'youtube_id': song.youtube_id }, "", song.youtube_id);
  });
  
  songlist.ev_sub('list_loaded', function() { load_song( songlist.find(location.pathname.slice(1)) ); });

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

  add_click_listeners();
  
});

/////////////////////////////////////////////// SETUP /////////////////////////////////////////////////////////

function load_song(song) {
  if(song==null) return;
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
}


////////////////////////////////////////// CLICK LISTENERS ///////////////////////////////////////////////////

function add_click_listeners() {
  //id('get_fretx').addEventListener('click', goto_indiegogo );
  id('share').addEventListener('click', share_on_fb );
  id('view_songs').addEventListener('click', open_new_song );

  //var menuitems = id('appmenu').children;
  //menuitems[0].addEventListener('click', open_new_song  );
  //menuitems[1].addEventListener('click', goto_indiegogo );
  //menuitems[2].addEventListener('click', get_feedback   );
}

function open_new_song(e) {
  modal.show(songlist.dom);
  cancelEvent(e)
}

function to_editor(e) {
  window.location = '/editor';
}

function goto_indiegogo(e) { 
  window.location.href = "http://fretx.rocks";
  cancelEvent(e);
}

function share_on_fb(e) {
  FB.ui({
    method: 'share',
    href: 'http://player.fretx.rocks/' + ytplayer.video_id,
    quote: `Learn how to play "${ytplayer.videodata.title}"`
  }, function(response){});
  cancelEvent(e);
}

function get_feedback(e) {
  modal.show(feedback.dom);
  cancelEvent(e);
}

////////////////////////////////////////// CLICK LISTENERS ///////////////////////////////////////////////////

window.addEventListener('popstate', function(e) {
  if(e.state == null) return;
  load_song( songlist.find(e.state.youtube_id) );
});