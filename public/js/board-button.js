var Promise = window.TrelloPowerUp.Promise;
var t = window.TrelloPowerUp.iframe();

var accessRequired = function() {
	return t.popup({
			title: 'Authorize Board Copier',
			url: 'auth.html',
			height: 140,
	});
};

var renderCopyLink = function(boardData, type) {
  if (type == 'new') {
    return t.popup({
        title: 'Board Copied!',
        url: 'show-board.html',
        args: {
          boardData: boardData,
          contextText: 'A copy of this template board has been created just for you!',
          buttonText: 'Take me to my onboarding!',
        },
        height: 140,
    });
  } else if (type == 'existing') {
    return t.popup({
        title: 'Board Already Exists!',
        url: 'show-board.html',
        args: {
          boardData: boardData,
          contextText: 'A copy of this template board already exists!',
          buttonText: 'Take me there!',
        },
        height: 140,
    });
  };
};

var renderBoardButtonUsingPowerUpApi = function() {
	accessRequired();
};

var existingBoardId = function() {
  return t.get('board', 'private', 'myBoardId', false);
};

var promiseRejected = function(rejected) {
  console.log('Promise rejected: ' + rejected);
};

var renderBoardButtonUsingTrelloAPI = function(token) {
  console.log('running renderBoardButtonUsingTrelloAPI...');
  return existingBoardId()
    .then(function(myBoardId) {
      if (myBoardId) {
        window.Trello.boards.get(myBoardId, null, function(existingBoard) {
          // success
          console.log("We're in success, and here's the arg: " + existingBoard);
          console.log('board exists! '+JSON.stringify(existingBoard, null, 2));
          return renderCopyLink(existingBoard, 'existing');
        }, function(err) {
          // error
          console.log("We're in error: " + JSON.stringify(err, null, 2));
          return copyBoard(token)
            .then(onCopyComplete)
            .catch(promiseRejected);
        })
      } else {
        return copyBoard(token)
          .then(onCopyComplete)
          .catch(promiseRejected);
      };
    })
    .catch(promiseRejected);
};

var onCopyComplete = function(newBoard) {
  t.set('board', 'private', 'myBoardId', newBoard.id);
  notifySlack(newBoard);
  renderCopyLink(newBoard, 'new');
};

var copyBoard = function(token) {
  return Promise.all([
    t.board('id', 'name'),
    t.member('username')
  ])
  .spread(function(templateBoard, user) {
    var newBoardName = templateBoard.name.replace(/\s*\[template\]\s*/, '');
    newBoardName = `${user.username}'s ${newBoardName}`;
    var params = {
      'name': newBoardName,
      'idBoardSource': templateBoard.id,
      'keepFromSource': 'cards',
      'prefs_permissionLevel': 'public',
      'prefs_comments': 'public',
      'prefs_background': 'green',
      'token': token
    };
    return window.Trello.post('boards', params, copySuccess, copyFailure);
  })
};

var copySuccess = function(newBoard) {
  console.log('Successfully copied board.');
};

var copyFailure = function(res) {
  console.log('Failed copying board.');
};

var notifySlack = function(newBoard) {
  return t.get('board', 'shared', 'slackHookUrl', null)
  .then(function(slackHookUrl) {
    if (slackHookUrl) {
      var opts = {
        url: slackHookUrl,
        type: 'post',
        data: JSON.stringify({text: 'New onboarding initiated! '+newBoard.url })
      };
      return $.ajax(opts)
      .then(notifySuccess)
      .fail(notifyFailure);
    } else {
      console.log('WARN: slackHookUrl is not set in settings.');
    };
  });
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
  .catch(promiseRejected);
});
