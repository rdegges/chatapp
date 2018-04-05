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
