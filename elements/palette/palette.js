function Palette(parent,chordpicker) {
    
  this.state = {
  	chords: []
  }

  this.build_dom(parent);
  this.bind_dom();
  this.load_styles();

}

Palette.prototype = {

  constructor: Palette,	

  build_dom:   function(parent) { this.dom = render(this.HTML);  if(!empty(parent)) parent.appendChild(this.dom); },
  bind_dom:    function()       { rivets.bind(this.dom, { data: this.state, obj: this }); },
  load_styles: function()       { load_css('changespicker_styles', this.CSS); }

}

Palette.prototype.HTML = `

<div id='palette'>
   
  <div class='chords'>

    <div class='chord' rv-each-chord='data.chords'>
        
    </div>
    
    <div class='add_btn'></div>

  </div>

</div>

`;

Palette.prototype.CSS = `

`;