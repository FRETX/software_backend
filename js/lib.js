
function id(tag) { return document.getElementById(tag); }

function cancelEvent(e) { e.stopPropagation(); e.cancelBubble = true; }