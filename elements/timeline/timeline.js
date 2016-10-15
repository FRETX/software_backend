function Timeline(parent) {
  this.state = {
  	punches: [ ],
  	duration: 12,
  };
  this.link_punches();
  this.setup_rivets();
  this.build_dom(parent);
  this.bind_dom();
  this.load_styles();
  this.draw_scale();
  this.set_drag_handlers();
}

Timeline.prototype = {
  
  load: function(punches) {
    this.state.punches = punches;
    this.link_punches();
    this.draw_chords();
  },

  link_punches: function() {
    this.state.punches.forEach(function(e,i,a) {
      e.next_node = ( i + 1 < this.state.punches.length ) ? this.state.punches[i+1] : new Punch(this.state.duration,'No Chord');
    }.bind(this));
  },

  build_dom:   function(parent) { this.dom = render(this.HTML);  if(!empty(parent)) parent.appendChild(this.dom); },
  bind_dom:    function()       { rivets.bind(this.dom, { data: this.state, obj: this }); },
  load_styles: function()       { load_css('timeline_styles', this.CSS); },
  
  bind_dom: function() {
    rivets.bind(this.dom, { data: this.state } );
  },

  setup_rivets: function() {
    rivets.formatters.em      = function(arg)       { return arg*2 + 'em'; }
    rivets.binders['style-*'] = function(el, value) { el.style.setProperty(this.args[0], value); };
  },

  set_duration(value) {
    this.state.duration = value;
    this.draw_scale();
  },

  draw_scale() {
    this.scale = this.dom.getElementsByClassName('scale')[0];
    this.scale.innerHTML = '';
    for(var i=0; i<this.state.duration; i++) {
      let tick = document.createElement('div');
      tick.className = 'tick';
      tick.style.marginLeft = this.s_to_ems(1) + 'em'; 
      this.scale.appendChild(tick);
    }
  },

  draw_chords() {
    this.chordline = this.dom.getElementsByClassName('chords')[0];
    this.chordline.innerHTML = '';
    for(var i=0; i<this.state.punches.length; i++) {
      let chord = this.generateChordElement(this.state.punches[i]);
      if(i==0) { chord.style.marginLeft = this.s_to_ems(this.state.punches[0].time) + 'em'; }
      this.chordline.appendChild(chord);
    }
  },

  update_time(time_s) {
    this.indicator = this.dom.getElementsByClassName('indicator')[0];
    let width_ems = this.s_to_ems(time_s);
    let width_px  = parseFloat(getComputedStyle(this.dom).fontSize) * width_ems;

    this.indicator.style.width = width_ems + 'em';
    this.dom.scrollLeft = width_px - (this.dom.clientWidth/2);
  },

  s_to_ems(time_s) {
    return 15 * time_s;
  }

}

Timeline.prototype.generateChordElement = function(punch,offset) {
  return render(`
<div class='chord' style='width:${ this.s_to_ems(punch.duration_s) + 'em'};' >
  <div class='chordname'>${punch.chord}</div>
  <div class='chordtime'>${punch.disp_time}</div>
</div>
`)};



////////////////////////// MANUAL SCROLLING //////////////////////////////////////

Object.assign( Timeline.prototype, {
  
  set_drag_handlers() {
    this._attachment = false;
    this._lastPosition = null;
    this._delta = null;
    this.dom.addEventListener('mousedown',  this.on_mouse_down.bind(this)  );
    this.dom.addEventListener('mousemove',  this.on_mouse_move.bind(this)  );
    this.dom.addEventListener('mouseup',    this.on_mouse_up.bind(this)    );
    this.dom.addEventListener('mouseenter', this.on_mouse_enter.bind(this) );
  },

  on_mouse_down(e) {
    this._attachment = true;
    this._lastPosition = e.clientX;
  },

  on_mouse_move(e) {
    if( ! this._attachment ) return;
    let delta = e.clientX - this._lastPosition;
    this.dom.scrollLeft = this.dom.scrollLeft - delta;
    this._lastPosition = e.clientX;
  },

  on_mouse_up() {
    this._attachment = false;
  },

  on_mouse_enter(e) {
    if(e.buttons==0) this._attachment = false;
  }

});

////////////////////////// MANUAL SCROLLING //////////////////////////////////////






Timeline.prototype.HTML = `

<div id='timeline'>   
  <div class='chords'></div>
  <div class='scale'></div>
  <div class='indicator'></div>
</div>

`;

Timeline.prototype.CSS = `

#timeline {
  overflow: hidden;
  position: relative;
  background-color: rgb(0,0,0,0.1);
  box-shadow: 0 0 0.1em black;
  padding: 0.4em;
}

#timeline {
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

#timeline {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

#timeline .chords {
  display: inline-block;
  padding-bottom: 0.4em;
  white-space: nowrap;
  position: relative;
  z-index: 1;
}

#timeline .chord {
  display: inline-block;
  background-color: rgb(250,100,150);
  padding: 0.5em 2em;
  margin: 0.2em;
  text-align: center;
  border-radius: 2em;
  box-shadow: 0 0 0.1em black;
  box-sizing: border-box;
  overflow: hidden;
}

#timeline .chord .chordname {
  padding: 0.2em;
}

#timeline .chordtime {  
  font-size: 0.8em;
}

#timeline .scale {
  display: inline-block;
  background-color: white;
  height: 1em;
  white-space: nowrap;
  position: relative;
  box-shadow: 0 0 0.1em black;
  z-index: 1;
}

#timeline .scale .tick {
  display: inline-block;
  background-color: black;
  width: 1px;
  height: 100%;
}

#timeline .indicator {
  background: rgba(0,255,0,0.3);
  z-index: 0;
  position: absolute;
  display: inline-block;
  left: 0;
  top: 0;
  bottom: 0;
  border-right: 1px solid white;
}

`;