ev_channel = {

  ev_listners: [],

  ev_fire(eventname, payload) {
    var listners = this.ev_listners.filter( function(listner) { return listner.event == eventname; } );
    listners.forEach( function(listner) { listner.callback.call(this,payload); } );
  },	
  
  ev_sub(eventname,callback) {
  	var token = this.ev_gen_token();
    var listner = { token: token, event: eventname, callback: callback }
    this.ev_listners.push(listner);
    return token;
  },

  ev_unsub(token) {
    this.listners = this.ev_listners.filter( function(listner) { return listner.token != token; } );
  },

  ev_gen_token() { return Math.random().toString(36).slice(2); }

}