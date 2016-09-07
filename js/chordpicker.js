
function chordpicker() {
  this.container = document.createElement('div');
  this.container.className = 'chordpicker';
  this.rootlist = new rootlist();
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

chordpicker.prototype = {
  constructor: chordpicker,
  show: function() { this.container.style.display = 'block'; },
  hide: function() { this.container.style.display = 'none'; },
  set_chord: function(name) {
  	if(name == 'No Chord') {

  	}
  	var arr = name.split(' ');
    
    arr[0]
  },
  get_chord: function(cb) {
  	this.show();
    this.callback = cb;
  },
  chordname: function() {
  	if(this.rootitem == undefined) return;
  	if(this.rootitem.innerHTML == 'No Chord') return 'No Chord'
  	if(this.qualitem == undefined) {
  	  return this.rootitem.innerHTML + ' Maj'; 
  	}
  	return this.rootitem.innerHTML + ' ' + this.qualitem.innerHTML;
  },

  set_root: function(note) {


  	this.root = note;
  	this.rootitem = undefined;
    for(var i=0; i<this.rootlist.children.length; i++) {
      
      //if( this.rootlist.children[i].innerHTML.split(' ')[0];
    }
  },
}

//////////////////////////// CLICK HANDLERS ////////////////////////////////////

Object.assign(
  chordpicker.prototype, {

    on_root_click: function(e) {
      cancelEvent(e);
  	  if(!e.target.hasAttribute('data-note')) return;
      this.rootitem.className = '';
      this.rootitem = e.target;
      this.rootitem.className = 'sel';
      if(this.rootitem.innerHTML == 'No Chord') {
        this.hide();
      }
      else {
        this.qualitylist.style.display = 'inline-block';
      }
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
    }	
  }
)

//////////////////////////// CLICK HANDLERS ////////////////////////////////////

//////////////////////////////// LISTS /////////////////////////////////////////

function rootlist() {
  return this.build_list();
}

rootlist.prototype = {
  constructor: rootlist,

  build_list: function() {
    this.elements = [];
    var list = make('ul', 'roots', null);
    for(var i=0; i<this.roots.length; i++) {
      list.appendChild(this.build_root(this.roots[i]));
    }
    return list;
  },

  build_root: function(obj) {
  	if( !(obj instanceof Array) ) return this.list_item(obj);
    item = document.createElement('li');
    item.appendChild( this.list_item(obj[0]) );
    item.appendChild( this.list_item(obj[1]) );
    return item;
  },

  list_item: function(obj) {
    return render(`<li data-note="${obj.val}">${obj.label}</li>`);
  },

  roots: [
    { val:12, label:'B' }, [  
      { val:11, label:'A#' },
      { val:11, label:'Bb' }],
    { val:10, label:'A' }, [
      { val: 9, label:'G#' },
      { val: 9, label:'Ab' }],
    { val: 8, label:'G' }, [
      { val: 7, label:'F#' },
      { val: 7, label:'Gb' }],
    { val: 6, label:'F' },
    { val: 5, label:'E' }, [
      { val: 4, label:'D#' },
      { val: 4, label:'Eb' }],
    { val: 3, label:'D' }, [
      { val: 2, label:'C#' },
      { val: 2, label:'Db' }],
    { val: 1, label:'C' },
    { val: 0, label:'No Chord' }
  ]
}

function qualitylist() { 
  return this.build_list();
}

qualitylist.prototype = {
  constructor: qualitylist,

  build_list: function() {

  },

  list_item: function(obj) {
  	return render(`<li data-quality='${obj.val}'>${obj.label}</li>`);
  },

  qualities: [
    { label: 'Maj', val: [1,3,5] },
    { label: 'min', val: [1,'5','7','maj7','m7','sus4','add9','sus2','7sus4','7#9','9']

}

//////////////////////////////// LISTS /////////////////////////////////////////

















function build_list(cls,arr) {
  var list = document.createElement('ul');
  for(var i=0; i<arr.length; i++) {
  	var item = document.createElement('li');
  	if( arr[i] instanceof Array ) {
  	  var subitem1 = document.createElement('li');
  	  var subitem2 = document.createElement('li');
      subitem1.appendChild(document.createTextNode(arr[i][0]));
      subitem2.appendChild(document.createTextNode(arr[i][1]));
      subitem1.className = 'tip';
      subitem2.className = 'tip';
  	  item.appendChild(subitem1);
  	  item.appendChild(subitem2);
  	}
  	else {
  	  var subitem1 = document.createElement('li');

  	  item.className = 'tip';	
  	  item.appendChild(document.createTextNode(arr[i]));
  	}
  	list.appendChild(item);
  }
  list.className = cls;
  return list;
}