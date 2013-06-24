(function() {
  (function($, window) {
    var Hello, document;
    document = window.document;
    Hello = (function() {
      function Hello(options) {
        this._options = options;
      }

      Hello.prototype.connect = function(callback) {
        var params, payload,
          _this = this;
        params = {
          grant_type: "client_credentials",
          scope: "manage_project:" + this._options.project_key
        };
        payload = $.param(params);
        return $.ajax({
          url: "https://" + this._options.client_id + ":" + this._options.client_secret + "@auth.sphere.io/oauth/token",
          contentType: "application/x-www-form-urlencoded",
          type: "POST",
          data: payload,
          success: function(data, textStatus, jqXHR) {
            var json_body;
            json_body = JSON.parse(data);
            return callback(void 0, json_body);
          },
          error: function(xhr, textStatus) {
            return callback(xhr, void 0);
          }
        });
      };

      Hello.prototype.getProducts = function(callback) {
        var _this = this;
        return $.ajax({
          url: "https://auth.sphere.io/" + this._options.project_key + "/product-projections",
          type: "GET",
          headers: {
            "Authorization": "Bearer " + this._options.access_token
          },
          success: function(data, textStatus, jqXHR) {
            var json_body;
            json_body = JSON.parse(data);
            return callback(void 0, json_body);
          },
          error: function(xhr, textStatus) {
            return callback(xhr, void 0);
          }
        });
      };

      return Hello;

    })();
    return window.Hello = Hello;
  })(jQuery, window);

}).call(this);
