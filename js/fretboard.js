
function Fretboard(parent) {
  this.state = {
    name: 'No Chord',
    fingering: [0],
  	strings: [
  	  { frets: [ {val:0}, {val:0}, {val:0}, {val:0}, {val:0} ] },
      { frets: [ {val:0}, {val:0}, {val:0}, {val:0}, {val:0} ] },
      { frets: [ {val:0}, {val:0}, {val:0}, {val:0}, {val:0} ] },
      { frets: [ {val:0}, {val:0}, {val:0}, {val:0}, {val:0} ] },
      { frets: [ {val:0}, {val:0}, {val:0}, {val:0}, {val:0} ] },
      { frets: [ {val:0}, {val:0}, {val:0}, {val:0}, {val:0} ] }
  	]
  }
  this.build_dom(parent);
  this.bind_dom();
  this.load_styles();
}

Fretboard.prototype = {
  constructor:   Fretboard,
  build_dom:     function(parent) { this.dom = render(this.HTML);  if(!empty(parent)) parent.appendChild(this.dom); },
  bind_dom:      function()       { rivets.bind(this.dom, { data: this.state, obj: this }); },
  load_styles:   function()       { load_css('fretboard_styles', this.CSS); },

  reset: function() {
    this.state.name = 'No Chord';
    this.state.fingering = [0];
    this.clear_display();
  },

  load_chord: function(chord) {
    //console.log(chord.name);
    if(chord.root_value == 0 ) { this.reset(); return; }
    if(this.state.fingering == chord.fingering) return;
    this.state.name = chord.name;
    this.state.fingering = chord.fingering;
    this.update_display();
  },

  update_display: function() {
    this.clear_display();
    for(var i=0; i<this.state.fingering.length; i++) {
      if(this.state.fingering[i]==0) break;
      var cmd = this.state.fingering[i].toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }).split('');
      this.state.strings[cmd[1]-1].frets[cmd[0]].val = 1; 
    }
    
  },

  clear_display: function() {
    for(var i=0; i<6; i++) {
      for(var j=0; j<5; j++) {
        this.state.strings[i].frets[j].val = 0;
      }
    }
  }

}

//////////////////////////////////////// HTML TEMPLATE ////////////////////////////////////////////////////

Fretboard.prototype.HTML = `

<div id='fretboard'>

  <div class='fret_display'>

    <div class='strings'>
      <div class='row' rv-each-string='data.strings'> 
        <div class='string'> </div>
      </div>
    </div>

    <div class='lights' >
      <div class='row' rv-each-string='data.strings'>
        <div class='fret' rv-each-fret='string.frets' >
          <div class='light' rv-data-state='fret.val'></div>
        </div>
      </div>
    </div>

    <div class='frets'>
      <div class='fret'><div class='wire'></div></div>
      <div class='fret'><div class='wire'></div></div>
      <div class='fret'><div class='wire'></div></div>
      <div class='fret'><div class='wire'></div></div>
      <div class='fret'><div class='wire'></div></div>
    </div>

  </div>

  <div class='chordname' rv-text='data.name'></div>

</div>

`;

//////////////////////////////////////// HTML TEMPLATE ////////////////////////////////////////////////////

///////////////////////////////////////// CSS STYLES //////////////////////////////////////////////////////

Fretboard.prototype.CSS = `

#fretboard {
  display: inline-block;
  position: relative;
}

#fretboard .fret_display {
  box-shadow: 0 0 5px black;
  background-color: rgba(70,70,70,1);
  position: relative;
  width: 300px;
  height: 200px;
  border-radius: 2px;
}

#fretboard .strings,
#fretboard .lights,
#fretboard .frets {
  position: absolute;
  left: 0; right: 0;
  top: 0; bottom: 0;
}

#fretboard .frets   { z-index: 1; }
#fretboard .strings { z-index: 2; }
#fretboard .lights  { z-index: 3; }

#fretboard .row {
  position: relative;
  height: 16.66%;
  width: 100%;
}

#fretboard .fret {
  position: relative;
  display: inline-block;
  width: 24%; 
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#fretboard .strings .string {
  position: absolute;
  margin: auto;
  top: 0; bottom: 0;
  left: 0; right: 0;
  display: inline-block;
  height: 4px;
  box-shadow: 0 0 5px black;
}

#fretboard .frets {
  width: 100%;
  font-size: 0;
}

#fretboard .frets .wire {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background-color: rgba(255,255,0,0.5);
  border-radius: 2.5px;
  box-shadow: 0 0 4px black;
  margin: 1px 0;
}

#fretboard .frets .fret:first-child .wire {
  background-color: rgba(255,255,255,0.5);
  width: 12px;
  left: 0;
  right: auto;
  box-shadow: 5px 0 4px -4px black;
  border-radius: 2px;
  margin: 0;
}

#fretboard .lights .light {
  position: absolute;
  top: 0; bottom: 0;
  right: 15%;
  margin: auto;
  height: 20px;
  width: 20px;
  background-color: rgba(255,0,0,1);
  border-radius: 10px;
}

#fretboard .chordname {
  font-size: 18pt;
  font-weight: bold;
  margin: 10px;
}

#fretboard .fret:nth-child(1),
#fretboard .fret:nth-child(2) { width: 14%; }

#fretboard .strings .string {
  background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAK0lEQVQIW2N8fdrzPwMUiJpuZ2CECYA4IAAWgHFen/ZkYGRgYABrAXFAAABygxD/zAO+2gAAAABJRU5ErkJggg==) repeat;
}

#fretboard .fret .wire {
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#e2e2e2+0,dbdbdb+31,d1d1d1+33,d1d1d1+33,fefefe+100 */
  background: rgb(226,226,226); /* Old browsers */
  background: -moz-linear-gradient(left,  rgba(226,226,226,1) 0%, rgba(219,219,219,1) 31%, rgba(209,209,209,1) 33%, rgba(209,209,209,1) 33%, rgba(254,254,254,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(left,  rgba(226,226,226,1) 0%,rgba(219,219,219,1) 31%,rgba(209,209,209,1) 33%,rgba(209,209,209,1) 33%,rgba(254,254,254,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to right,  rgba(226,226,226,1) 0%,rgba(219,219,219,1) 31%,rgba(209,209,209,1) 33%,rgba(209,209,209,1) 33%,rgba(254,254,254,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e2e2e2', endColorstr='#fefefe',GradientType=1 ); /* IE6-9 */
}

#fretboard .fret .light[data-state='0'] { background-color: transparent; }

#fretboard .fret .light[data-state='1'] {
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f94154+0,ff97a1+19,ff2339+38&1+0,0.5+48,0+76 */
  background: -moz-radial-gradient(center, ellipse cover,  rgba(249,65,84,1) 0%, rgba(255,151,161,0.8) 19%, rgba(255,35,57,0.6) 38%, rgba(255,35,57,0.5) 48%, rgba(255,35,57,0) 76%); /* FF3.6-15 */
  background: -webkit-radial-gradient(center, ellipse cover,  rgba(249,65,84,1) 0%,rgba(255,151,161,0.8) 19%,rgba(255,35,57,0.6) 38%,rgba(255,35,57,0.5) 48%,rgba(255,35,57,0) 76%); /* Chrome10-25,Safari5.1-6 */
  background: radial-gradient(ellipse at center,  rgba(249,65,84,1) 0%,rgba(255,151,161,0.8) 19%,rgba(255,35,57,0.6) 38%,rgba(255,35,57,0.5) 48%,rgba(255,35,57,0) 76%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f94154', endColorstr='#00ff2339',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

#fretboard .fret:first-child  .light[data-state='1'] {
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#404df9+0,969dff+19,2332ff+38&1+0,0.5+48,0+76 */
  background: -moz-radial-gradient(center, ellipse cover,  rgba(64,77,249,1) 0%, rgba(150,157,255,0.8) 19%, rgba(35,50,255,0.6) 38%, rgba(35,50,255,0.5) 48%, rgba(35,50,255,0) 76%); /* FF3.6-15 */
  background: -webkit-radial-gradient(center, ellipse cover,  rgba(64,77,249,1) 0%,rgba(150,157,255,0.8) 19%,rgba(35,50,255,0.6) 38%,rgba(35,50,255,0.5) 48%,rgba(35,50,255,0) 76%); /* Chrome10-25,Safari5.1-6 */
  background: radial-gradient(ellipse at center,  rgba(64,77,249,1) 0%,rgba(150,157,255,0.8) 19%,rgba(35,50,255,0.6) 38%,rgba(35,50,255,0.5) 48%,rgba(35,50,255,0) 76%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#404df9', endColorstr='#002332ff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

`;

///////////////////////////////////////// CSS STYLES //////////////////////////////////////////////////////