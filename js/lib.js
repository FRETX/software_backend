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

function secs_to_hms(secs) {
  hrs  = Math.floor(secs/3600);
  secs = secs - hrs*3600;
  mins = Math.floor(secs/60);
  secs = secs - mins*60;
  secs = Math.round(secs);

  hrs  =  hrs.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false });
  mins = mins.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false });
  secs = secs.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false });

  return(hrs + ':' + mins + ':' + secs);
}

function SortByTime(a, b) { 
  return ((a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0));
}