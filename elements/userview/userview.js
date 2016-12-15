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
      <div class='name'>{state.user.name}</div>
      <img rv-src='state.user.photo_url'/>
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
    height: 1.5em;
    width: 1.5em;
    vertical-align: middle;
    border: 1px solid black;
  }

  #UserView .name {

    line-height: 100%;
    display: inline-block;
    padding: 0 1em;
    border-radius: .25em 0 0 .25em;
    display: none;
  }

  #UserView .logout {
    line-height: 1.6em;
    display: inline-block;
    padding: 0 .5em;
    cursor: pointer;
  }

  #UserView .login {
    line-height: 1.6em;
    display: inline-block;
    padding: 0 .5em;
    cursor: pointer;
  }

  #UserView .login:hover,
  #UserView .logout:hover {
    color: #B00;
  }

`.untab(2);