function Timeline(parent) {
  this.state = {
  	punches: [ new Punch(0,'A min'), new Punch(4.333,'D min'), new Punch(6.232,'G 7'), new Punch(9.333,'D min') ],
  	duration: 12
  };
  this.link_punches();
  this.dom = this.build_dom();
  parent.appendChild(this.dom);
  this.bind_dom();
}

Timeline.prototype = {

  link_punches: function() {
    this.state.punches.forEach(function(e,i,a) {
      e.next_node = ( i + 1 < this.state.punches.length ) ? this.state.punches[i+1] : new Punch(this.state.duration,'No Chord');
    }.bind(this));
  },

  build_dom: function() {
    return render([ 
      `<div id='timeline'>`,    
        `<div class='chords'>`,
          `<div class='chord' rv-each-punch='data.punches' rv-data-selected='punch.selected' rv-style-flex='punch.duration_s' >`,
            `<div class='chordname'> { punch.chord } </div>`,
            `<div class='chordtime'> { punch.disp_time } </div>`,
          `</div>`,
        `</div>`,
        `<div class='scale'>`,
		  `<div class='second' rv-times-sec='data.duration'></div>`,
        `</div>`,
      `</div>`
    ].join(''));
  },
  
  bind_dom: function() {
    rivets.bind(this.dom, { data: this.state } );
  }

}

$(document).ready(function() {
  timeline = new Timeline(document.body);
});

rivets.binders['style-*'] = function(el, value){
  el.style.setProperty(this.args[0], value);
};