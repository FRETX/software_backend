function Controlbar(parent) {
  this.state = {
  	time_s: 0,
    punch: new Punch(0, 'No Chord'),
  	get clock() { return display_time(this.time_s, { tenths: true } ); }
  }
  this.build_dom(parent);
  this.bind_dom();
  this.load_styles();
  this.bind_handlers();
}

Controlbar.prototype = {
  constructor: Controlbar,

  build_dom(parent) { this.dom = render(this.HTML);  if(!empty(parent)) parent.appendChild(this.dom); },
  bind_dom()        { rivets.bind(this.dom, { data: this.state, this: this }); },
  load_styles()     { load_css('changespicker_styles', this.CSS); },

}

/////////////////////////////// HANDLERS /////////////////////////////////

Object.assign(
  Controlbar.prototype, {

    bind_handlers() {
      this.on_time_change  = this.on_time_change.bind(this);
      this.on_punch_change = this.on_punch_change.bind(this);
      this.jog_left        = this.jog_left.bind(this);
      this.jog_right       = this.jog_right.bind(this);
    },

    on_time_change(time_s) { this.state.time_s = time_s; },
    on_punch_change(punch) { console.log(punch); this.state.punch = punch; },
    jog_left()  { this.state.punch.jog(-100); },
    jog_right() { this.state.punch.jog(100);  }
  }
);

/////////////////////////////// HANDLERS /////////////////////////////////

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
      <button>1/4x</button>
      <button>1/2x</button>
      <button>3/4x</button>
      <button>1x</button>
    </div>
    <div class='group'>
      <div>{data.punch.chord}</div>
      <span class='jog' rv-on-click='this.jog_left'>-</span>
      <span>{data.punch._display_time }</span>
      <span class='jog' rv-on-click='this.jog_right'>+</span>
      <br>
      <span rv-on-click='this.delete'>X</span>
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
  color: rgb(0,128,0);
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
  cursor: pointer;
}

#controlbar .group {
  display: inline-block;
  background: rgb(50,50,50);
  border-radius: 0.2em;
  width: 10em;
  height: 2em;
  vertical-align: middle;
}

#controlbar .group div,
#controlbar .group span {
  color: rgb(100,255,100);
  font-size: 0.5em;
  margin-top: 0.1em;
}

#controlbar .group button {
  color: rgb(100,255,100);
  background: rgb(50,50,50);
  font-size: 0.5em;
  cursor: pointer;
}

#controlbar .jog {
  display: inline-block;
  border: 1px solid rgb(100,255,100);
  width: 1.2em;
  cursor: pointer;
}

`;