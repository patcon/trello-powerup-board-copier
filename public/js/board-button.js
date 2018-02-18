var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();
var accessRequired = function() {
	return t.popup({
			title: 'Authorize Board Copier',
			url: 'auth.html',
			height: 140,
	});
};

var renderBoardButtonUsingPowerUpApi = function() {
	accessRequired();
};

var renderBoardButtonUsingTrelloAPI = function(token) {
  return Promise.all([
    t.board('id', 'name'),
    t.member('username')
  ])
  .spread(function(templateBoard, user) {
    var newBoardName = user.username + "'s " + templateBoard.name;
    var params = {
      'name': newBoardName,
      'idBoardSource': templateBoard.id,
      'keepFromSource': 'cards',
      'prefs_permissionLevel': 'public',
      'prefs_comments': 'public',
      'token': token
    };
    return Trello.post('boards', params, copySuccess, copyFailure)
    .then(function(res) {
      console.log(res);
    });
  })
  .then(function() {
    t.closePopup();
  });
};

var copySuccess = function(res) {
  console.log('Successfully copied board.');
};

var copyFailure = function(res) {
  console.log('Failed copying board.');
};

var copyBoard = function(token) {
  
  /**
  .then(function(username){
    console.log(username);
  });
  return Promise.all([
    t.board('id', 'name'),
    t.member('id')
  ])
  .spread(function(templateBoardId, templateBoardName, username) {
    console.log(username);
    var newBoardName = username + "'s " + templateBoardName;
    console.log(newBoardName);
    var params = {
      'name': newBoardName,
      'idBoardSource': templateBoardId,
      'keepFromSource': 'cards',
      'prefs_permissionLevel': 'public',
      'prefs_comments': 'public',
    };
    Trello.post('boards', params, copySuccess, copyFailure);
  })
  .then(function(){
    console.log('blah');
  });
  **/

};

t.render(function(){
  	return Promise.all([
			t.get('organization', 'private', 'authToken'),
			t.get('board', 'private', 'authToken')
	])
	.spread(function(orgToken, boardToken){
		if(orgToken) {
			return renderBoardButtonUsingTrelloAPI(orgToken);
		} else if(boardToken) {
			return renderBoardButtonUsingTrelloAPI(boardToken);
		} else {
			return renderBoardButtonUsingPowerUpApi();
		}
	})
	.then(function(){
		return t.sizeTo('#content');
  })
});