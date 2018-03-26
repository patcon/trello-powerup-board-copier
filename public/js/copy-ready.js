var t = window.TrelloPowerUp.iframe();

var getMyBoard = function() {
  return t.arg('newBoard');
};

var openBoardLink = function() {
  t.navigate({
    url: getMyBoard().shortUrl
  });
};