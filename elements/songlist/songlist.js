function Songlist(parent) {
  this.state = {
  	songs: [],
  	filtered_songs: [],
  	search_text: ''
  }

  this.callbacks = {
    on_select: [],
    on_list_loaded: []
  }

  this.build_dom(parent);
  this.load_styles();
  this.bind_handlers();
  this.bind_dom();
  this.fetch();
}

Songlist.prototype = {
  constructor: Songlist,

  build_dom:   function(parent) { this.dom = render(this.HTML);  if(!empty(parent)) parent.appendChild(this.dom); },
  load_styles: function()       { load_css('timeline_styles', this.CSS); },
  bind_dom:    function()       {
    rivets.formatters.img_url = function(val) { return `http://img.youtube.com/vi/${val}/1.jpg`; }
  	rivets.bind(this.dom, { data: this.state, this: this }); 
  },
  
  fetch() { $.get('/songs/list', this.on_song_list ); },

  bind_handlers() {
  	this.on_search    = function(e)  { 
      if( e.target.value == '' || e.target.value == 'Search' ) this.state.filtered_songs = this.state.songs;
      else {
        this.state.filtered_songs = this.state.songs.filter( function(song) { return song.title.toLowerCase().indexOf(e.target.value.toLowerCase())!=-1; } );
      }
    }.bind(this);
  	this.on_click     = function(e,m)  { this.select(m.index); }.bind(this);  
  	this.on_song_list = function(list) { this.state.songs = list; this.list_loaded(); }.bind(this);
    this.on_input_focus = function(e,m) {
      e.target.style.color = 'black';
      if(e.target.value == "Search" ) { e.target.value = ''; }
      else { e.target.select(); }
    }.bind(this);
    this.on_input_blur = function(e,m) { 
      console.log(e.target.value);
      e.target.value = ( e.target.value == '' ? "Search" : e.target.value ); 
      if(e.target.value == 'Search' ) { e.target.style.color = 'grey'; }
    }.bind(this);
  },

  get length() { return this.state.songs.length; },
  get random() { 
    var rnd = Math.random();
    var idx = Math.floor( rnd * this.length );
    var song = this.state.songs[ idx ];
    console.log(`Random Song: ${song.title} len:${this.length} rnd:${rnd} idx:${idx}`);
    return song;
  }

}

///////////////////////////////// EVENTS ///////////////////////////////////////////////

Object.assign( Songlist.prototype, ev_channel );

Object.assign(Songlist.prototype, {

  select(index) {
    this.ev_fire('selected', this.state.filtered_songs[index] );
  },

  list_loaded() {
    this.state.filtered_songs = this.state.songs;
    this.ev_fire('list_loaded');
  }

});

///////////////////////////////// EVENTS ///////////////////////////////////////////////


Songlist.prototype.HTML = `
  <div id="songlist">
    <div class="searchbar">
      <input rv-on-input='this.on_search' rv-on-focus='this.on_input_focus' rv-on-blur='this.on_input_blur' value='Search' style='color: grey;'></input>
    </div>
    <div class="searchlist">
      <div class="songitem" rv-each-song="data.filtered_songs" rv-on-click="this.on_click">
        <img rv-src="song.youtube_id | img_url"></img>
        <span rv-text="song.title"></span>
      </div>
    </div>
  </div>  
`.untab(2);

Songlist.prototype.CSS = `
  
  #songlist {
  	display: flex;
  	flex-direction: column;
  	border: 1px solid black;
  	height: 100%;
  	box-sizing: border-box;
  }

  .searchbar {
    padding: 0.5em;
  }

  .searchlist {
  	padding: 0.5em;
  	overflow-y: scroll;  
  }

  .songitem {
    cursor: pointer;
  	border: 1px solid black;
  	padding: 0.5em;
  	margin: 0.5em 0;
    box-shadow: 0 0 0.2em black;
    text-align: left;
    white-space: nowrap;
  }

  .songitem:hover  { background-color: rgba(0,0,0,0.2); }
  .songitem:active { background-color: rgba(0,0,0,0.3); }

  .songitem * {
    vertical-align: middle;
  }

  .songitem img {
    width: 4em;
    max-width: 25%
  }

  .songitem span {
    font-size: 0.8em;
    width: 75%;
    padding: 0.2em;
    display: inline-block;
    white-space: normal;
  }

  .songitem:first-child {
    margin-top: 0;
  }


  input {
  	font-size: 1.3em;
    width: 100%;
  }

`.untab(2);