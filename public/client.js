/* global TrelloPowerUp */

var WHITE_COPY_ICON = 'https://cdn.glitch.com/7e09bb0f-ecb6-4ca0-9b86-b1a5f9fc76a9%2Fcopy-icon.png?1504977336303';
var BLACK_COPY_ICON = 'https://cdn.glitch.com/7e09bb0f-ecb6-4ca0-9b86-b1a5f9fc76a9%2Fcopy-icon-black.png?1505000340238';

var boardButtonCallback = function(t){
  return t.popup({
    title: 'Board Copier',
    url: './board-button.html',
    height: 250
  });
};

TrelloPowerUp.initialize({
  
  'board-buttons': function(t, options) {
    return [{
      icon: WHITE_COPY_ICON,
      text: 'Copy Board',
      callback: boardButtonCallback,
    }];
  },
  
  'authorization-status': function(t, options){
    return t.get('board', 'private', 'authToken')
    .then(function(authToken) {
      return { authorized: authToken != null }
    });
  },
  
  'show-authorization': function(t, options){
    return t.popup({
      title: 'Authorize Account',
      url: './auth.html',
      height: 140,
    });
  }
});

var copySuccess = function() {
  console.log('Successfully copied board.');
};

var copyFailure = function() {
  console.log('Failed copying board.');
};

var copyBoard = function(t, opts) {
  var templateBoardId, templateBoardName = t.board('id', 'name');
  var username = t.member('id');
  var newBoardName = username + "'s " + templateBoardName;
  console.log(newBoardName);
  var params = {
    'name': newBoardName,
    'idBoardSource': templateBoardId,
    'keepFromSource': 'cards',
    'prefs_permissionLevel': 'public',
    'prefs_comments': 'public',
  };
  window.Trello.post('boards', params, copySuccess, copyFailure);
};