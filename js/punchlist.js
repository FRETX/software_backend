function Punchlist() {
	this.punches = [];
	this.current_index = 0;
  this.current_time = 0;
  this.punch_callbacks = [];
}

Punchlist.prototype = {
	constructor: Punchlist,

  get first_punch()   { return( this.punches[0] ); },
  get last_punch()    { return( this.punches[this.punches.length - 1] ); },
  get current_punch() { return( this.punches[this.current_index     ] ); },
  get next_punch()    { return( this.punches[this.current_index + 1 ] ); },
  get prev_punch()    { return( this.punches[this.current_index - 1 ] ); },

	add_punch: function(punch) {
    this.punches.push( new Punch(punch.time, punch.chord) );
    this.punches.sort( SortByTime );
    this._on_list_change();
	},

	add_punches: function(punches) {
    for(var i=0; i<punches.length; i++) { this.punches.push( new Punch(punches[i].time, punches[i].chord) ); }
    this.punches.sort( SortByTime );
    this._on_list_change();
	},

	del_punch: function(punch) {
		var i = typeof(punch) == number ? punch : data.punches.indexOf(m.punch);
    data.punches.splice(i,1);
    this._on_list_change();
	},

	clear: function() { 
    this.punches = []; 
    this._on_list_change(); 
  },

	load: function (punches) {
		this.punches = [];
		this.add_punches(punches);
  },

  jog: function(offset_ms) {
    for(var i=0; i<this.punches.length; i++) this.punches[i].jog(offset_ms); 
  }
}

Object.assign( 
  Punchlist.prototype, {

    link_list: function() {
      for(var i=0; i<this.punches.length; i++) {
        prev_punch = ( i!=0 ) ? this.punches[i-1] : null 
        next_punch = ( i==this.punches.length-1 ) ? null : this.punches[i+1];
        this.punches[i].link(prev_punch, next_punch);
      }
    }

  }
);


Object.assign( 
  Punchlist.prototype, {

  }
);

Object.assign(
  Punchlist.prototype, {

    update_time: function(time_s) {
      this.current_time = time_s;
      if(this.current_punch.occupies(time_s)) return;
      this.set_current_punch(time_s);
    },

    _on_list_change: function() {
      this.link_list();
      console.log(this.punches);
    },

    _on_punch_change: function() {
      console.log(this.current_punch);
      for(var i=0; i < this.punch_callbacks.length; i++) {
        if( ! isFunction(this.punch_callbacks[i]) ) continue;
        this.punch_callbacks[i](this.current_punch);
      }
    },

    on_punch_change: function(callback) {
      this.punch_callbacks.push(callback);
    }

  }
);


Object.assign(
  Punchlist.prototype, {
    
    set_current_punch: function(time_s) {
      console.log(time_s);
      for(var i=0; i<this.punches.length; i++) {
        if(this.punches[i].occupies(time_s)) {
          this.current_index = i;
          this._on_punch_change();
          return;
        }
      }
    }

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