var t = window.TrelloPowerUp.iframe();

t.render(function() {
  return t.sizeTo('#content');
})

var appKey = '17ccd791431275b4c0afade4c83763bf';
var returnUrl = encodeURIComponent('https://trello-powerup-board-copier.glitch.me/callback.html');
var appName = encodeURIComponent('Board Copier Power-Up');
var oauthUrl = 'https://trello.com/1/authorize?key='+appKey+
    '&name='+appName+
    '&expiration=never'+
    '&callback_method=fragment'+
    '&return_url='+returnUrl+
    '&scope=read,write';

var tokenLooksValid = function(token) {
  return /^[0-9a-f]{64}$/.test(token);
};

var authorizeOpts = {
  height: 680,
  width: 580,
  validToken: tokenLooksValid
};

var authBtn = document.getElementById('authorize');
authBtn.addEventListener('click', function() {
  t.authorize(oauthUrl, authorizeOpts)
  .then(function(token) {
    return t.set('board', 'private', 'authToken', token)
  })
  .then(function() {
    // now that the token is stored, we can close this popup
    // you might alternatively choose to open a new popup
    return t.closePopup();
  });
});