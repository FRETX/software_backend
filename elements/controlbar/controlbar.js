function Controlbar(parent, player, timeline) {
  this.player = player;
  this.timeline = timeline;
  this.player.on_time_change( this.on_time_change.bind(this) );
}

Controlbar.prototype = {
  constructor: Controlbar,
  
  on_time_change: function(time_s) {
    
  }
}

Controlbar.prototype.HTML = `
  <div id='controlbar'>
    
  </div>
`;

Controlbar.prototype.CSS = `

`;