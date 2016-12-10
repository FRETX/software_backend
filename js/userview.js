function UserView(parent) {
	
  this.state = {
	  "user": getCookie('user')
  }

  this.build_dom(parent);
  this.load_styles();
  this.bind_dom();
}

UserView.prototype = {
	constructor: UserView,

  submit() { $.post('logout'); }
}

Object.assign( UserView.prototype, element);
Object.assign( UserView.prototype, ev_channel);

UserView.prototype.HTML = `

  <div id="UserView">
    <img rv-src='state.user.photo_url'/>
    <div class='name'>{state.user.name}</div>
    <div class='submit' rv-on-click='this.submit'>Log Out</button>
  </div>

`.untab(2);

UserView.prototype.CSS = `
  
  #UserView {
    display: inline-block;
  }

  #UserView .name {
    display: inline-block;
  }

`.untab(2);