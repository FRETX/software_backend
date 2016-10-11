function Palette(parent,chordpicker) {
    
  this.state = {
  	chords: []
  }

  this.chordpicker = chordpicker;
  this.build_dom(parent);
  this.setup_rivets();
  this.bind_handlers();
  this.load_styles();
  this.bind_dom();

}

Palette.prototype = {

  constructor: Palette,	

  build_dom:   function(parent) { this.dom = render(this.HTML);  if(!empty(parent)) parent.appendChild(this.dom); },
  bind_dom:    function()       { rivets.bind(this.dom, { data: this.state, obj: this }); },
  load_styles: function()       { load_css('changespicker_styles', this.CSS); },

  get_color:   function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) { color += letters[Math.floor(Math.random() * 16)]; }
    return color;
  },

  already_exists: function(chord) {
    let result = $.grep(this.state.chords, function(x) { 
      return x.label == chord; 
    });
    if(result.length) return true;
    return false;
  },

  setup_rivets: function() {
    rivets.binders['style-*'] = function(el, value) { el.style.setProperty(this.args[0], value); };
  },

  bind_handlers: function() {

    this.add_chord = function(e,m) {
      this.chordpicker.set_chord('No Chord');
      this.chordpicker.get_chord( function(chord) {
        if( this.already_exists(chord) ) return;
        this.state.chords.push( { label: chord, color: this.get_color() } );
      }.bind(this));
    }.bind(this);

    this.del_chord = function(e,m) {
      cancelEvent(e.originalEvent);
      this.state.chords.splice(m.index,1);
    }.bind(this);

    this.sel_chord = function(e,m) {
      if( ! isFunction(this.on_chord) ) return;
      this.on_chord(m.chord);
    }.bind(this);

  }

}

Palette.prototype.HTML = `

<div id='palette'>
   
  <div class='chords'>

    <div class='chord' rv-each-chord='data.chords' rv-on-click='obj.sel_chord'>
      <div class='color' rv-style-background-color='chord.color'></div>
      <div class='gloss'></div>
      <div class='delete' rv-on-click='obj.del_chord'>X</div>
      <div class='label' rv-text='chord.label'></div>
    </div>

    <div class='addbtn' rv-on-click='obj.add_chord'>
      <div class='gloss'></div>
      <div class='label'>+</div>
    </div>

  </div>

</div>

`;

Palette.prototype.CSS = `

  #palette {
    font-size: 15px;
    padding: 1em;
    overflow-x: scroll;
    white-space: nowrap;
  }

  #palette .addbtn .label{
    font-size: 3em;
  }

  #palette .addbtn,
  #palette .chord {
    display: inline-block;
    width: 5em;
    height: 6em;
    line-height: 6em;
    padding: 1em;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    margin: .5em;
    border: .01em solid black;
    font-weight: bold;
    border-radius: 0.5em;
    box-shadow: 0 0 .1em black;
    position: relative; 
  }

  #palette .delete {
    content: 'X';
    position: absolute;
    top: -.75em; left: -.75em;
    line-height: 1.5em;
    width: 1.5em; height: 1.5em;
    border: 0.1em solid black;
    border-radius: 0.75em;
    display: inline-block;
    font-family: sans-serif;
    box-shadow: 0 0 .1em black;
  }

  #palette .color,
  #palette .gloss {
    diplay: inline-block;
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    border-radius: 0.5em;
  }

  #palette .gloss {
    z-index: 0;
  }
  
  #palette .label        { position: relative; z-index: 1; }

  #palette               { background-color: rgba(0,0,0,0.1);  }

  #palette .delete:hover { background-color: rgb(255,50,50);   }

  #palette .addbtn       { background-color: rgb(140,140,140); }

  #palette .chord:hover .gloss,
  #palette .addbtn:hover .gloss { background-color: rgba(255,255,255,0.3); }

  #palette .gloss {
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&0.6+0,0+100;White+to+Transparent */
    background: -moz-linear-gradient(top,  rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top,  rgba(255,255,255,0.6) 0%,rgba(255,255,255,0) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom,  rgba(255,255,255,0.6) 0%,rgba(255,255,255,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#99ffffff', endColorstr='#00ffffff',GradientType=0 ); /* IE6-9 */
  }

  #palette .delete {
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ff3019+0,cf0404+100;Red+3D */
    background: rgb(255,48,25); /* Old browsers */
    background: -moz-radial-gradient(center, ellipse cover,  rgba(255,48,25,1) 0%, rgba(207,4,4,1) 100%); /* FF3.6-15 */
    background: -webkit-radial-gradient(center, ellipse cover,  rgba(255,48,25,1) 0%,rgba(207,4,4,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: radial-gradient(ellipse at center,  rgba(255,48,25,1) 0%,rgba(207,4,4,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff3019', endColorstr='#cf0404',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }

`;