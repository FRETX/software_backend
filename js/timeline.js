

function timeline(parent) {
  this.dom = build_dom();
  this.state = {};
}

timeline.prototype = {

  build_dom: function() {
    document.createElement
  },
  
  bind_dom: function() {
    rivets.bind(this.dom, { data: this.state } );
  }

}