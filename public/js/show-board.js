var t = window.TrelloPowerUp.iframe();

var openBoardLink = function() {
  t.navigate({
    url: t.arg('boardData').shortUrl
  });
};

document.getElementById("context").innerHTML = t.arg('contextText');
document.getElementById("button").innerHTML = t.arg('buttonText');