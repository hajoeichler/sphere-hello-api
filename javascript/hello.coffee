(($, window) ->
  document = window.document

  class Hello
    constructor: (options) ->
      @_options = options

    connect: (callback) ->
      params =
        grant_type: "client_credentials"
        scope: "manage_project:#{@_options.project_key}"

      payload = $.param(params)
      $.ajax
        url: "https://#{@_options.client_id}:#{@_options.client_secret}@auth.sphere.io/oauth/token"
        contentType: "application/x-www-form-urlencoded"
        type: "POST"
        data: payload
        success: (data, textStatus, jqXHR) =>
          json_body = JSON.parse(data)
          callback(undefined, json_body)
        error: (xhr, textStatus) => callback(xhr, undefined)

    getProducts: (callback) ->
      $.ajax
        url: "https://auth.sphere.io/#{@_options.project_key}/product-projections"
        type: "GET"
        headers:
          "Authorization": "Bearer #{@_options.access_token}"
        success: (data, textStatus, jqXHR) =>
          json_body = JSON.parse(data)
          callback(undefined, json_body)
        error: (xhr, textStatus) => callback(xhr, undefined)

  window.Hello = Hello

)(jQuery, window)