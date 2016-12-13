function UserView(parent) {
	
  this.state = {
	  "user": null
  }

  this.build_dom(parent);
  this.load_styles();
  this.bind_dom();
  this.get_user();
}

UserView.prototype = {
	constructor: UserView,

  login()  { document.cookie = "loc=" + window.location.pathname; window.location = '/login'; },
  logout() { $.post('/logout', function() { location.reload(); } ); },

  get_user() {
    $.get('/current_user')
      .fail( function()     { this.state.user = null; }.bind(this))
      .done( function(user) { this.state.user = user; }.bind(this));
  }

}

Object.assign( UserView.prototype, element);
Object.assign( UserView.prototype, ev_channel);

UserView.prototype.HTML = `

  <div id="UserView">
    <div rv-if='state.user'>
      <img rv-src='state.user.photo_url'/>
      <div class='name'>{state.user.name}</div>
      <div class='logout' rv-on-click='this.logout'>Logout</div>
    </div>
    <div rv-unless='state.user'>
      <div class='login' rv-on-click='this.login'>Login</div>
    </div>
  </div>

`.untab(2);

UserView.prototype.CSS = `
  
  #UserView > div {
    display: flex;
  }

  #UserView img {
    height: 2em;
    vertical-align: middle;
    border-radius: .75em 0 0 .75em;
    box-shadow: 0 0 0.2em black;
  }

  #UserView .name {
    line-height: 2em;
    display: inline-block;
    box-shadow: 0 0 0.2em black;
    padding: 0 1em;
  }

  #UserView .logout {
    line-height: 2em;
    background: rgba(0,0,0,0.6);
    display: inline-block;
    border-radius: 0 .75em .75em  0;
    box-shadow: 0 0 0.2em black;
    padding: 0 1em;
    color: white;
    cursor: pointer;
  }

  #UserView .login {
    line-height: 2em;
    background: rgba(0,0,0,0.6);
    display: inline-block;
    border-radius: .75em;
    box-shadow: 0 0 0.2em black;
    padding: 0 1em;
    color: white;
    cursor: pointer;
  }

`.untab(2);