var player;
var videodata;
var done = false;

function load_youtube() {
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'gbW55CTqf_U',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  get_video_data('gbW55CTqf_U');
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
}

function stopVideo() {
  player.stopVideo();
}

function get_video_data(id) {
  $.get('/youtube/videodata/' + id, on_video_data);
}

function on_video_data(data) {
  videodata = data;
  $('.vidinfo .title')[0].innerHTML = data['title'];
  $('.vidinfo .description')[0].innerHTML = data['description'];
  console.log(data);
}