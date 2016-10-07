function Punchlist() {
	this.punches = [];
	this.current_index;

}

Punchlist.prototype = {
	constructor: Punchlist,

	add_punch: function(punch) {
        this.punches.push( punch );
        this.punches.sort( SortByTime );
	},

	add_punches: function(punches) {
        for(var i=0; i<punches.length; i++) {
            this.punches.push( new Punch(punches[i].time, punches[i].chord) ); }
        this.punches.sort( SortByTime );
	},

	del_punch: function(punch) {
		var i = typeof(punch) == number ? punch : data.punches.indexOf(m.punch);
        data.punches.splice(i,1);
	},

	clear: function() { this.punches = []; },

	load_punches: function (punches) {
		this.clear();
		this.add_punches(punches);
        this.punches = [];
    },

    jog: function(offset_ms) {
        for(var i=0; i<this.punches.length; i++) this.punches[i].jog(offset_ms); 
    }

}

Object.assign( 
  Punchlist.prototype, {

    link_list: function() {
      for(var i=0; i<this.punches.length; i++) {
        
      }
    }
  }
);


Object.assign( 
  Punchlist.prototype, {
  	first_punch:   function() { return( this.punches[0] ); }
    last_punch:    function() { return( this.punches[this.punches.length - 1] ); },
    current_punch: function() { return( this.punches[this.current_index     ] ); },
    next_punch:    function() { return( this.punches[this.current_index + 1 ] ); },
    prev_punch:    function() { return( this.punches[this.current_index - 1 ] ); }
  }
);


/*
punches = {
  range: function() {
    if(data.current_punch_index == 0) {
      if(data.punches[0]['time'] > 0) return { start: 0, end: data.punches[0]['time'], index: -1 };
      if(data.punches.length==1) return { start: 0, end: player.duration(), index: 0 };
      return { start: 0, end: data.punches[1]['time'], index: 0 };
    }
    if(data.current_punch_index >= data.punches.length) return { start: data.punches[data.punches.length-1]["time"], end: player.duration(), index: data.punches.length-1 };
    return { start: data.punches[data.current_punch_index-1]["time"], end: data.punches[data.current_punch_index]["time"] };
  },
  in_range: function(time) {
    if(data.punches.length == 0) return true;
    var range = punches.range();
    return(time >= range.start && time < range.end); 
  },
  set: function(time) {
    //console.log("setting: " + time);
    data.current_punch_index 
    for(var i=0; i<data.punches.length; i++) {
      if( punches.in_punch(i,time) ) {
        //console.log("in punch: " + i);
        data.punches[i]['selected'] = true;
        data.current_punch_index = i;
        fretboard.load_chord(chordlib.get_chord(data.punches[i].chord));
        if(i < 3 && id('punchlist').scrollTop < 40) return;
        $('.punchrow')[i].scrollIntoView(false);
        id('punchlist').scrollTop += 85; 
        
      } 
      else {
        data.punches[i]['selected'] = false;
      }
    }
  },

}*/