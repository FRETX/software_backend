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