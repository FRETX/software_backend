function Controlbar(parent) {
  this.state = {
  	clock: '00:00:12.673'
  }
  this.build_dom(parent);
  this.bind_dom();
  this.load_styles();
}

Controlbar.prototype = {
  constructor: Controlbar,

  build_dom:   function(parent) { this.dom = render(this.HTML);  if(!empty(parent)) parent.appendChild(this.dom); },
  bind_dom:    function()       { rivets.bind(this.dom, { data: this.state, obj: this }); },
  load_styles: function()       { load_css('changespicker_styles', this.CSS); },
  
  on_time_change: function(time_s) {
    
  }
}

Controlbar.prototype.HTML = `
  <div id='controlbar'>
    <div class='clock'>{data.clock}</div>
    <div class='transport'>
      <button>&#xF488;</button>
      <button>&#xF210;</button>
      <button>&#xF427;</button>
    </div>
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
  font-family: 'the_display_st';
}

#controlbar .transport {
  vertical-align: middle;
  position: relative;
  display: inline-block;
}

#controlbar .transport button {
  vertical-align: middle;
  display: inline-block;
  height: 100%;
  background: rgb(50,50,50);
  border: 0;
  padding: 0 0.5em;

  font-family: Ionicons;
  font-size: 1em;

  border-radius: 0.2em;
  box-shadow: 0 0 0.2em;
  color: rgb(100,255,100);
  margin: 0 0.2em; 
}

`;