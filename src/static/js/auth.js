var OKTA_SETTINGS = {
  baseUrl: "https://dev-111464.oktapreview.com",
  clientId: "0oaejf8gmll1TiDRz0h7",
  issuer: "https://dev-111464.oktapreview.com/oauth2/default"
};

var okta = new OktaSignIn({
  baseUrl: OKTA_SETTINGS.baseUrl,
  clientId: OKTA_SETTINGS.clientId,
  authParams: {
    issuer: OKTA_SETTINGS.issuer,
    responseType: ["token", "id_token"],
    display: "page"
  }
});

// Render the login form.
function showLogin() {
  okta.renderEl({ el: "#okta-login-container" }, function(res) {}, function(err) {
    alert("Couldn't render the login form, something horrible must have happened. Please refresh the page.");
  });

  document.getElementById("login").style.display = "none";
}

// Determine whether or not we have a querystring.
function hasQuerystring() {
  return location.href.indexOf("?") !== -1;
}

// Handle the user's login and what happens next.
function handleLogin() {
  // If the user is logging in for the first time...
  if (okta.token.hasTokensInUrl()) {
    okta.token.parseTokensFromUrl(
      function success(res) {
        // Save the tokens for later use, e.g. if the page gets refreshed:
        okta.tokenManager.add("accessToken", res[0]);
        okta.tokenManager.add("idToken", res[1]);

        // Redirect to this user's dedicated room URL.
        window.location = getRoomURL();
      }, function error(err) {
        alert("We weren't able to log you in, something horrible must have happened. Please refresh the page.");
      }
    );
  } else {
    okta.session.get(function(res) {

      // If the user is logged in, display the app.
      if (res.status === "ACTIVE") {

        // If the user is logged in on the home page, redirect to their room page.
        if (location.href.indexOf("?") === -1) {
          window.location = getRoomURL();
        }

        return enableVideo();
      }

      // If we get here, the user is not logged in.

      // If there's a querystring in the URL, it means this person is in a
      // "room" so we should display our passive login notice. Otherwise,
      // we'll prompt them for login immediately.
      if (hasQuerystring()) {
        document.getElementById("login").style.display = "block";
        enableVideo();
      } else {
        showLogin();
      }
    });
  }
}
