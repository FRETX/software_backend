var youtube_api_ready = false;

function load_youtube_api(callback) {
  youtube_api_ready = callback;
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
  youtube_api_ready = true;
  if(isFunction(youtube_api_ready)) { youtube_api_ready(); }
}

function wait_for_youtube_api(callback) {
  var timer = setInterval( function() {
    if(youtube_api_ready) {
      callback();
      clearInterval(timer);
    }
  }, 100);
}


function youtube_player(video_id) {
  this.timer = false;
  this.video_id = false;
  this._current_time = 0;
  this.videodata = {};
  wait_for_youtube_api( function(video_id) {
    this.player = this.build_player('player',video_id);
  }.bind(this,video_id));
  
}


youtube_player.prototype = {
  constructor: youtube_player,
  url_regex: /https:\/\/www.youtube.com\/watch\?v=(.{11})/,
  
  build_player: function(parent_id,vid_id) {
    this.video_id = vid_id;
    return new YT.Player(parent_id, {
      height: '390', 
      width: '640',
      videoId: vid_id,
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this)
      }
    });
  },

  get current_time() { return this.player.getCurrentTime().toFixed(3); },

  onPlayerReady: function(event) {
    event.target.playVideo();
    this.get_video_data();
  },

  onPlayerStateChange: function(event) {
    if(this.timer)  { clearInterval(this.timer); this.timer = false; }
    if( event.data == YT.PlayerState.PLAYING ) {
      this.timer = setInterval( function() {
        if(isFunction(this.timechange_callback)) {
          var time_s = this.player.getCurrentTime();
          this._current_time = typeof(time_s) == 'undefined' ? 0 : time_s.toFixed(3);
          this.timechange_callback(this._current_time);
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