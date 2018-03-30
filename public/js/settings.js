var t = window.TrelloPowerUp.iframe();

window.settings.addEventListener('submit', function(event) {
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('board', 'shared', 'slackHookUrl', window.slackHookUrl.value)
  .then(function() {
    t.closePopup();
  })
});

t.render(function() {
  return t.get('board', 'shared', 'slackHookUrl')
  .then(function(slackHookUrl) {
    window.slackHookUrl.value = slackHookUrl;
  });
});

t.render(function(){
  t.sizeTo('#content').done();
});