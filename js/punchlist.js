function Punchlist() {
	this.punches = [];
	this.current_index = -1;
  this.current_time = 0;
  this.punch_callbacks = [];
  this.update_time = this.update_time.bind(this);
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
    this.current_index = -1;
    this.current_time = 0;
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
      if( parseFloat(time_s) < parseFloat(this.punches[0].time) && this.current_index!=-1 ) {
        this.current_index=-1;
        this._on_punch_change();
        return;
      }

      if(this.current_index==-1) {
        if(parseFloat(time_s) < parseFloat(this.punches[0].time) ) return;
        this.set_current_punch(time_s);
        return;
      }
      if( empty(this.current_punch) ) return;
      if(this.current_punch.occupies(time_s)) return;
      this.set_current_punch(time_s);
    },

    _on_list_change: function() {
      this.link_list();
      //console.log(this.punches);
    },

    _on_punch_change: function() {
      var punch = this.current_index==-1 ? new Punch(0,'No Chord'): this.current_punch;
      //console.log(punch.chord);
      for(var i=0; i < this.punch_callbacks.length; i++) {
        if( ! isFunction(this.punch_callbacks[i]) ) continue;
        this.punch_callbacks[i](punch);
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
      //console.log(`${time_s} ${this.current_index} ${this.punches[0].time}`);
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