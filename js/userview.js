function UserView(user) {
	
  this.state = {
	"user": user
  }

  this.build_dom(parent);
  this.load_styles();
  this.bind_dom();
}

UserView.prototype = {
	constructor: UserView,

}

Object.assign( UserView.prototype, element);
Object.assign( UserView.prototype, ev_channel);

UserView.prototype.HTML = `
  <div id="UserView">
    
  </div>
`.untab(2);

UserView.prototype.CSS = `


`.untab(2);