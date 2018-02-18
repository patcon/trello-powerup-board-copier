var username = document.getElementById('username');
var password = document.getElementById('password');
var authBtn = document.getElementById('authorize');
authBtn.addEventListener('click', function() {
  fetch("/auth",
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({username: username.value, password: password.value})
    }
  )
  .then(function(response){
    return response.json();
  })
  .then(function(response) {
    const token = response.token;
    if (window.opener && typeof window.opener.authorize === 'function') {
      window.opener.authorize(token);
    } else {
      localStorage.setItem('token', token);
    }
    setTimeout(function(){ window.close(); }, (1 * 1000));
  })
});