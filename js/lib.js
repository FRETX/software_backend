function make(tag, cls, parent) {
  var element = document.createElement(tag);
  element.className = cls;
  if(parent!=null) { parent.appendChild(element); }
  return element;
}

function id(tag) { return document.getElementById(tag); }

function cancelEvent(e) { e.stopPropagation(); e.cancelBubble = true; }

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function render(html) {
  var elem = document.createElement('div');
  elem.innerHTML = html;
  if(elem.children.length==0) throw 'Error Rendering HTML: No Elements Generated'
  if(elem.children.length>1)  throw 'Error Rendering HTML: Only One Parent Allowed'
  return elem.children[0]  
}

String.prototype.untab = function(spacing) {
  var lines = this.split("\n");
  lines = lines.filter(function(el) { return el.length > spacing; } )
  lines = lines.map(function(el) { 
    return el.split('').splice(spacing,lines[0].length-spacing).join('')
  });
  return lines.join('\n');  
}

function load_css(id,css) {
  var elem = document.createElement('style');
  elem.id = name;
  elem.innerHTML = css;
  document.getElementsByTagName("head")[0].appendChild(elem);  
}

function SortByTime(a, b) { 
  return ((parseFloat(a.time) < parseFloat(b.time)) ? -1 : ((parseFloat(a.time) > parseFloat(b.time)) ? 1 : 0));
}

function empty(obj) {
  return( typeof(obj) == 'undefined' || obj == null );
}

function val_or_default(obj,def) {
  return( empty(obj) ? def : obj);  
}

function val_or_null(obj) {
  return val_or_default(obj,null);
}