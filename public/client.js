/* global TrelloPowerUp */

var WHITE_COPY_ICON = './images/copy-icon.png';
var BLACK_COPY_ICON = './images/copy-icon-black.png';

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
  
  'show-settings': function(t, options){
    // when a user clicks the gear icon by your Power-Up in the Power-Ups menu
    // what should Trello show. We highly recommend the popup in this case as
    // it is the least disruptive, and fits in well with the rest of Trello's UX
    
    if (t.getContext().permissions.board == 'write') {
      return t.popup({
        title: 'Board Copier Settings',
        url: './settings.html',
        height: 184 // we can always resize later
      });
    } else {
     return t.popup({
        title: 'Board Copier Settings',
        url: './settings-denied.html',
        height: 184 // we can always resize later
      });
    };
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
