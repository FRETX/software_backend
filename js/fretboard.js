
function Fretboard(parent) {
  this.state = {
  	strings: [
  	  { frets: [ 0, 1, 0, 1, 0 ] },
      { frets: [ 1, 0, 1, 0, 1 ] },
      { frets: [ 0, 0, 0, 0, 0 ] },
      { frets: [ 0, 0, 0, 0, 0 ] },
      { frets: [ 0, 0, 0, 0, 0 ] },
      { frets: [ 0, 0, 0, 0, 0 ] },
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
  bind_handlers: function()       {

  }
}

Object.assign(
  Fretboard.prototype, {

  }
)

//////////////////////////////////////// HTML TEMPLATE ////////////////////////////////////////////////////

Fretboard.prototype.HTML = `

<div id='fretboard'>
  <div class='string' rv-each-string='data.strings'>
    <div class='fret' rv-each-fret='string.frets' >
      <div class='str'></div>
      <div class='light' rv-data-state='fret'></div>
      <div class='wire'></div>
    </div>
  </div>
</div>

`;

//////////////////////////////////////// HTML TEMPLATE ////////////////////////////////////////////////////

///////////////////////////////////////// CSS STYLES //////////////////////////////////////////////////////

Fretboard.prototype.CSS = `

#fretboard {
  width: 300px;
  height: 200px;
  background-color: rgba(0,0,0,0.5);
}

#fretboard .string {
  position: relative;
  height: 16.66%;
  width: 100%;
}

#fretboard .fret {
  position: relative;
  display: inline-block;
  width: 25%; 
  height: 100%
}



#fretboard .fret .light[data-state='0'] {
  background-color: transparent;
}

#fretboard .fret .light[data-state='1'] {
  background-color: blue;
}

#fretboard .fret .wire {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 10%;
  background-color: rgba(255,255,0,0.5);
  z-index: 4;
}

#fretboard .fret .str {
  position: absolute;
  top: 0; bottom: 0;
  left: 0; right: 0;
  margin: auto;
  height: 4px;
  background-color: rgba(255,0,0,1);
  z-index: 5;
}

#fretboard .fret .light {
  position: absolute;
  top: 0; bottom: 0;
  right: 15%;
  margin: auto;
  height: 20px;
  width: 20px;
  background-color: rgba(255,0,0,1);
  z-index: 6;
  border-radius: 10px;
}

#fretboard .fret:first-child .wire {
	background-color: rgba(255,255,255,0.5);
	width: 20%;
	left: 0;
	right: auto;
}


#fretboard .fret:nth-child(1),
#fretboard .fret:nth-child(2) { width: 12.5%; }

`;

///////////////////////////////////////// CSS STYLES //////////////////////////////////////////////////////

$(document).ready(function() {
  fretboard = new Fretboard(document.body);
});