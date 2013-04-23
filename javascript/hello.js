(function($, window){
  var OAuth = (function(){
    function OAuth(options){
      this._options = $.extend({
        client_id: 'client_id', // Your application client id
        client_secret: 'client_secret', // Your application client secret
        project_key: 'project_key' // Your project key
      }, options)
    }

    OAuth.prototype.start = function(){
      console.log("Requesting an Access Token...")
      var params = {
        'grant_type': 'client_credentials',
        'scope': 'manage_project:' + this._options.project_key
      }

      var payload = $.param(params)
      // Currently not possible because of Cross Domain restriction
      $.ajax({
        url: 'https://' + this._options.client_id + ':' + this._options.client_secret + '@' + 'auth.sphere.io/oauth/token',
        type: 'POST',
        data: payload,
        xhrFields: {
          withCredentials: true
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 20000
      }).done(function(data, textStatus, jqXHR){
        //var json_body = JSON.parse(body)
        console.log(data)
        console.log(textStatus)
        console.log(jqXHR)
      })
    }

    return OAuth
  })()
  return window.OAuth = OAuth
})(jQuery, window)