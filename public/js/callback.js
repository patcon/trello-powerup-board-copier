let authorize;

try {
  if (window.opener && typeof window.opener.authorize === 'function') {
    authorize = window.opener.authorize;
  }
} catch (e) {
  // Security settings are preventing this, fall back to local storage.
}

var regexToken = /[&#]?token=([0-9a-f]{64})/;
var token = regexToken.exec(location.hash)[1];

if (authorize) {
  authorize(token);
} else {
  localStorage.setItem('token', token);
}

setTimeout(function(){ window.close(); }, (1 * 1000));