data = {
  punches: [0,1,2]
}

$(document).ready(function() {
  setup_data_bindings();
  setup_event_triggers();
  popcorn();
});

function setup_data_bindings() {
  rivets.bind($('body'), { data: data });
}

function setup_event_triggers() {
  $('.addvid input').on('focus', on_addvid_focus);
  $('.addvid input').on('blur', on_addvid_blur);
}

function on_addvid_focus(e) {
  if(e.target.value == "Add the link to your YouTube video here..." ) { e.target.value = ''; }
}

function on_addvid_blur(e) {
  e.target.value = e.target.value ? e.target.value : "Add the link to your YouTube video here..."
}

function popcorn() {
  //wrapper = Popcorn.HTMLYouTubeVideoElement('#vid');
  //wrapper.src = 'http://www.youtube.com/watch?v=CxvgCLgwdNk';

  pop = Popcorn.smart('#vid', 'http://www.youtube.com/watch?v=CxvgCLgwdNk' );

  pop.footnote({
    start: 2,
    end: 6,
    text: "Pop!",
    target: "footnotediv"
  });

  pop.play();
}