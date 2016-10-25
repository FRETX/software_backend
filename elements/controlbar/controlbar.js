function Controlbar(parent) {
  this.state = {
  	time_s: 0,
  	get clock() { return display_time(this.time_s, { tenths: true } ); }
  }
  this.build_dom(parent);
  this.bind_dom();
  this.load_styles();
  this.bind_handlers();
}

Controlbar.prototype = {
  constructor: Controlbar,

  build_dom:   function(parent) { this.dom = render(this.HTML);  if(!empty(parent)) parent.appendChild(this.dom); },
  bind_dom:    function()       { rivets.bind(this.dom, { data: this.state, obj: this }); },
  load_styles: function()       { load_css('changespicker_styles', this.CSS); },
  
  bind_handlers: function() { 
    this.on_time_change = function(time_s) {
      this.state.time_s = time_s;
    }.bind(this);
  }
}

Controlbar.prototype.HTML = `
  <div id='controlbar'>
    <div class='clock'>{ data.clock < time_s }</div>
    <div class='transport'>
      <button>&#xF488;</button>
      <button>&#xF210;</button>
      <button>&#xF427;</button>
    </div>
    <div class='group'>
      <div>Playback Speed</div>
      <button>0.25x</button>
      <button>0.5x</button>
      <button>0.75x</button>
      <button>1x</button>
  </div>
`;

Controlbar.prototype.CSS = `
  
#controlbar {
  display: inline-block;
  position: relative;
  height: 1.75em;
  padding: 0.3em;
}

#controlbar .clock {
  vertical-align: middle;
  display: inline-block;
  background: black;
  padding: 0.15em 0.4em;
  border-radius: 0.2em;
  color: rgb(120,255,120);
  box-shadow: 0 0 0.2em;
  font-family: 'ninepin';
  width: 9em;
  text-align: center;
  height: 2em;
  line-height: 2em;
  box-sizing: border-box;
  margin-right: 0.1em;
}

#controlbar .transport {
  vertical-align: middle;
  position: relative;
  display: inline-block;
}

#controlbar .transport button {
  vertical-align: middle;
  display: inline-block;
  background: rgb(50,50,50);
  border: 0;

  font-family: Ionicons;

  border-radius: 0.2em;
  box-shadow: 0 0 0.2em;
  color: rgb(100,255,100);
  margin: 0 0.1em; 
  height: 2em;
  line-height: 1.8em;
  width: 2em;
}

#controlbar .group {
  display: inline-block;
  background: rgb(50,50,50);
  border-radius: 0.2em;
  width: 8em;
  height: 2em;
  vertical-align: middle;
}

#controlbar .group div {
  color: rgb(100,255,100);
  font-size: 0.5em;
  margin-top: 0.1em;
}

#controlbar .group button {
  color: rgb(100,255,100);
  background: rgb(50,50,50);
  font-size: 0.5em;
}

`;