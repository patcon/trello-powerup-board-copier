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
  copyBoard(token)
  .then(notifySlack)
  .finally(function() {
    t.closePopup();
  });
};

var copyBoard = function(token) {
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
    return Trello.post('boards', params, copySuccess, copyFailure);
  })
};

var copySuccess = function(newBoard) {
  console.log('Successfully copied board.');
};

var copyFailure = function(res) {
  console.log('Failed copying board.');
};

var notifySlack = function(newBoard) {
  var opts = {
    url: 'https://hooks.slack.com/services/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',
    type: 'post',
    data: JSON.stringify({text: 'New onboarding initiated! '+newBoard.url })
  };
  return $.ajax(opts)
  .then(notifySuccess)
  .fail(notifyFailure);
};

var notifySuccess = function() {
  console.log('Successfully notified Slack.');
};

var notifyFailure = function() {
  console.log('Failed notifying Slack.');
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