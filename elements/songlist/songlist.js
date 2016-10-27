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
      if(e.target.value == '') this.state.filtered_songs = this.state.songs;
      else {
        this.state.filtered_songs = this.state.songs.filter( function(song) { return song.title.indexOf(e.target.value)!=-1; } );
      }
    }.bind(this);
  	this.on_click     = function(e,m)  { this.select(m.index); }.bind(this);  
  	this.on_song_list = function(list) { this.state.songs = list; this.list_loaded(); }.bind(this);
  },

  get length() { return this.state.songs.length; },
  get random() { return this.state.songs[ Math.floor( Math.random() * this.length ) ]; }

}

///////////////////////////////// EVENTS ///////////////////////////////////////////////

Object.assign(Songlist.prototype, {

  on_select(callback) { this.callbacks.on_select.push(callback); },
  select(index) {
    for(var i=0; i < this.callbacks.on_select.length; i++) {
      if( ! isFunction(this.callbacks.on_select[i]) ) continue;
      this.callbacks.on_select[i](this.state.songs[index]);
    } 
  },

  on_list_loaded(callback) { this.callbacks.on_list_loaded.push(callback); },
  list_loaded() {
    this.state.filtered_songs = this.state.songs;
    for(var i=0; i < this.callbacks.on_list_loaded.length; i++) {
      if( ! isFunction(this.callbacks.on_list_loaded[i]) ) continue;
      this.callbacks.on_list_loaded[i]();
    } 
  }

});

///////////////////////////////// EVENTS ///////////////////////////////////////////////


Songlist.prototype.HTML = `
  <div id="songlist">
    <div class="searchbar">
      <input rv-on-input='this.on_search'></input>
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
  }

  .songitem:hover  { background-color: rgba(0,0,0,0.2); }
  .songitem:active { background-color: rgba(0,0,0,0.3); }

  .songitem * {
    vertical-align: middle;
  }


  input {
  	font-size: 1em;
    width: 100%;
  }

`.untab(2);