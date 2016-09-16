function Punch(time_s,chord) {
  this._display_time = null;
  this._time = val_or_null(time_s);
  this._chord = val_or_null(chord);
  this._next_node = null;
}

Punch.prototype = {

  constructor: Punch,

  //////////////////////// PROPERTIES //////////////////////////////////

  get time()         { return val_or_null(this._time); },
  set time(s)        { this._time = s; this.generate_display_time(); },

  get disp_time()    { return val_or_default( this._display_time, this.generate_display_time() ); },
  get display_time() { return val_or_default( this._display_time, this.generate_display_time() ); },

  get chord()        { return val_or_default( this._chord, 'No Chord' ); },
  set chord(c)       { this._chord = c; },

  set next_node(n)   { this._next_node = n; },
  get duration_s()   { 
  	return ( empty(this._next_node) ? null : this._next_node.time - this.time );
  },

  //////////////////////// PROPERTIES //////////////////////////////////

  generate_display_time: function() {
  	if( empty(this._time) ) return '';

  	ms   = ( this._time * 1000 ).toFixed();
    hrs  = Math.floor( ms / 3600000 );
    ms   = ms - hrs * 3600000;
    mins = Math.floor( ms / 60000 );
    ms   = ms - mins * 60000;
    secs = Math.floor( ms / 1000 );
    ms   = ms - secs * 1000;

    hrs  =  hrs.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    mins = mins.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    secs = secs.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    ms   =   ms.toLocaleString('en-US', { minimumIntegerDigits: 3, useGrouping: false });

    this._display_time = ( hrs == '00' ? '' : hrs + ':') + mins + ':' + secs + '.' + ms;
    return this._display_time;
  },

  jog: function(offset_ms) {
    let t = this.time + ( offset_ms / 1000 );
    this.time = t < 0 ? 0 : t;
    return this;
  },

  to_model: function() {
    return { time: this.time, disp_time: this.disp_time, chord: this.chord };
  },

  to_json: function() {
  	return JSON.stringify( this.to_model )
  }

}