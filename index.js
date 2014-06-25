module.exports = function(s) {

  var zero = String.fromCharCode(33);

  if (typeof s == 'undefined') return zero;

  s = s.split('');
  var last = s[s.length-1];

  if (last.charCodeAt(0) == 255) {
    s.push(zero);
  }
  else {
    var n = last.charCodeAt(0);
    var c = String.fromCharCode(n + 1);
    s[s.length - 1] = c;
  }

  return s.join('');
};

