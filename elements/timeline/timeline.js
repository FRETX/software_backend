function Timeline(parent) {
  this.state = {
  	punches: [ new Punch(0,'A min'), new Punch(4.333,'D min'), new Punch(6.232,'G 7'), new Punch(9.333,'D min') ],
  	duration: 12
  };
  this.link_punches();
  this.setup_rivets();
  this.build_dom(parent);
  this.bind_dom();
  this.load_styles();
}

Timeline.prototype = {

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
  }

}

Timeline.prototype.HTML = `

<div id='timeline'>   
  <div class='chords'>
    <div class='chord' rv-each-punch='data.punches' rv-data-selected='punch.selected' rv-style-width='punch.duration_s | em' >
        <div class='chordname'> { punch.chord } </div>
        <div class='chordtime'> { punch.disp_time } </div>
    </div>
  </div>
  <div class='scale'>
    <div class='second' rv-times-sec='data.duration'></div>
  </div> 
</div>

`;

Timeline.prototype.CSS = `

#timeline {
  overflow-x: scroll;
  background-color: rgba(0,0,0,0.2);
  box-shadow: 0 0 0.4em black;
  padding: 0.4em;
}

#timeline .chords {
  padding-bottom: 0.4em;
  white-space: nowrap;
}

#timeline .chord {
  display: inline-block;
  background-color: rgba(250,100,150,0.5);
  padding: 0.5em 2em;
  margin: 0.2em;
  text-align: center;
  border-radius: 2em;
}

#timeline .chord .chordname {
  padding: 0.2em;
}

#timeline .chordtime {  
  font-size: 0.8em;
}

#timeline .scale {
  background-color: white;
  height: 2em;
  border-radius: 2em;
}

`;