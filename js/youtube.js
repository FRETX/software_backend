var youtube_api_ready;

function load_youtube_api(callback) {
  youtube_api_ready = callback;
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
  if(isFunction(youtube_api_ready)) { youtube_api_ready(); }
}


function youtube_player() {
  this.timer = false;
  this.video_id = false;
  this.current_time = 0;
  this.videodata = {};
  this.player = this.build_player('player',null);
}


youtube_player.prototype = {
  constructor: youtube_player,
  default_video_id: 'gbW55CTqf_U',
  url_regex: /https:\/\/www.youtube.com\/watch\?v=(.{11})/,
  
  build_player: function(parent_id,vid_id) {
    console.log(this);
    this.video_id = vid_id || this.default_video_id;
    return new YT.Player(parent_id, {
      height: '390', 
      width: '640',
      videoId: this.video_id,
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this)
      }
    });
  },

  onPlayerReady: function(event) {
    event.target.playVideo();
    this.get_video_data();
  },

  onPlayerStateChange: function(event) {
    if(this.timer)  { clearInterval(this.timer); this.timer = false; }
    if( event.data == YT.PlayerState.PLAYING ) {
      this.timer = setInterval( function() {
        if(isFunction(this.timechange_callback)) {
          this.current_time = this.player.getCurrentTime();
          this.timechange_callback(this.current_time);
        }
      }.bind(this), 300 );
    }
  },

  onVideoData: function(data) {
    this.videodata = data;
    if(isFunction(this.videodata_callback)) {
      this.videodata_callback(data);
    }
  },

  on_time_change: function(callback) {
    this.timechange_callback = callback;
  },

  on_video_data: function(callback) {
    this.videodata_callback = callback
  },

  load: function(url) {
    var match = this.url_regex.exec(url);
    if(!match && url.length != 11) { alert('invalid syntax'); return; }
    this.video_id = url.length == 11 ? url : match[1];
    this.player.loadVideoById(this.video_id, 0, "large");
    this.get_video_data();
  },

  stop: function() {
    this.player.stopVideo();
  },

  get_video_data: function() {
    $.get('/youtube/videodata/' + this.video_id, this.onVideoData.bind(this));
  },

  duration: function() {
    return this.player.getDuration();
  }

}