
function chordpicker() {
  this.container = document.createElement('div');
  this.container.className = 'chordpicker';
  this.rootlist = build_list('roots',['C','C#','D','D#','E','F','F#','G','G#','A','A#','B','No Chord']);
  this.qualitylist = build_list('qualities',['Maj','min','5','7','maj7','m7','sus4','add9','sus2','7sus4','7#9','9']);
  
  this.rootlist.onclick = this.on_root_click.bind(this);
  this.qualitylist.onclick = this.on_quality_click.bind(this);
  this.container.onclick = this.on_container_click.bind(this);

  this.container.appendChild(this.rootlist);
  this.container.appendChild(this.qualitylist);
  this.rootlist.lastChild.className = 'sel';
  this.rootitem = this.rootlist.lastChild;
  document.body.appendChild(this.container);
}

function build_list(cls,arr) {
  var list = document.createElement('ul');
  for(var i=0; i<arr.length; i++) {
  	var item = document.createElement('li');
  	var content = document.createTextNode(arr[i]);
  	item.appendChild(content);
  	list.appendChild(item);
  }
  list.className = cls;
  return list;
}

chordpicker.prototype = {
  constructor: chordpicker,
  show: function() { this.container.style.display = 'block'; },
  hide: function() { this.container.style.display = 'none'; },
  get_chord: function(cb) {
  	this.show();
    this.callback = cb;
  },
  on_root_click: function(e) {
  	if(e.target.tagName != 'LI') return;
    this.rootitem.className = '';
    this.rootitem = e.target;
    this.rootitem.className = 'sel';
    if(this.rootitem.innerHTML == 'No Chord') {
      this.hide();
      
    }
    else {
      this.qualitylist.style.display = 'inline-block';
    }
    cancelEvent(e);
  },
  on_quality_click: function(e) {
    if(e.target.tagName != 'LI') return;
    if(this.qualitem != undefined) this.qualitem.className = '';
    this.qualitem = e.target;
    this.qualitem.className = 'sel';
    cancelEvent(e);
  },
  on_container_click: function() {
  	if( this.callback != undefined) { this.callback(this.chordname()); }
  	this.hide();
  },
  chordname: function() {
  	if(this.rootitem == undefined) return;
  	if(this.rootitem.innerHTML == 'No Chord') return 'No Chord'
  	if(this.qualitem == undefined) {
  	  return this.rootitem.innerHTML + ' Maj'; 
  	}
  	return this.rootitem.innerHTML + ' ' + this.qualitem.innerHTML;
  }
}