
function changespicker(parent, picker) {
  this.state = {
  	chords: [],
    current_index: 0
  }
  this.bind_handlers();
  this.build_dom(parent);
  this.bind_dom();
  this.load_styles();
  this.picker = picker;
}

changespicker.prototype = {
  constructor: changespicker,

  show: function() { this.dom.style.display = 'block'; },
  hide: function() { this.dom.style.display = 'none';  },

  get_changes: function(cb) {
    this.show();
  	this.callback = cb;
  },

  build_dom:   function() { this.dom = render(this.HTML); if(!empty(parent)) parent.appendChild(this.dom); },
  bind_dom:    function() { rivets.bind(this.dom, { data: this.state, obj: this }); },
  load_styles: function() { load_css('changespicker_styles', this.CSS); },

  bind_handlers: function() {
  	this.cancelEvent = function(e) { cancelEvent(e); } ;

    this.close = function()  { 
      this.hide(); 
      if( this.callback != undefined) { this.callback(this.state.chords); }
    }.bind(this);

    this.add_chord = function()  {
      this.picker.set_chord('No Chord'); 
      this.picker.get_chord( function(chord) { this.state.chords.push(chord); }.bind(this) );
    }.bind(this);

    this.rem_chord = function(e,m) {
      this.state.chords.splice(m.index,1);
    }.bind(this);

    this.edit_chord = function(e,m) {
      e.target.blur();
      this.picker.set_chord(e.target.value);
      this.picker.get_chord( function(chord) { e.target.value = chord; } );
    }.bind(this);
  }
}

//////////////////////////////////////// HTML TEMPLATE ////////////////////////////////////////////////////

changespicker.prototype.HTML = `

<div id='changespicker' rv-on-click='obj.close'>
  <div class='changelist' rv-on-click='obj.cancelEvent'>
    <div class='description'>
      Enter a Chord Progresion
    </div>
    <div class='chord' rv-each-chord='data.chords'>
      <button rv-on-click='obj.rem_chord'> X </button>
      <input rv-value='chord' rv-on-focus='obj.edit_chord'>
    </div>
    <button class='add' rv-on-click='obj.add_chord'>+</button>
  </div>
</div>

`;

//////////////////////////////////////// HTML TEMPLATE ////////////////////////////////////////////////////
	

///////////////////////////////////////// CSS STYLES //////////////////////////////////////////////////////

changespicker.prototype.CSS = `

#changespicker {
  position: absolute;
  left: 0; right: 0;
  top: 0; bottom: 0;
  display: none;
  background-color: rgba(0,0,0,0.6);
  z-index: 1;
}

#changespicker::before {
  content: '';
  height: 100%;
  width: 5px;
  vertical-align: middle;
  display: inline-block;
}

#changespicker .changelist {
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 0;
  vertical-align: middle;
  padding: 10px;
  background-color: rgba(200,100,100,1)
}

#changespicker .description {
  font-size: 12pt;
  margin-bottom: 5px;
}

#changespicker .chord {
  display: flex;
  margin: 5px;
}

#changespicker .chord button {
  width: 30px;
}

#changespicker .chord input {
  width: 170px;
  text-align: center;
}

#changespicker .add {
  width: 200px
}

`;

///////////////////////////////////////// CSS STYLES //////////////////////////////////////////////////////