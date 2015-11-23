'use strict';

var IanToolkit = IanToolkit || {};

(function(toolkit, $, win) {

  var logger = {};
  // ---------- Initial function
  (function() {
    logger.log = function(obj) {
      if (console) {
        console.log(obj);
      }
    };

    $.ajaxSetup({
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "POST",
      statusCode: {
        404: function() {
          //404 process
        }
      },
      timeout: 2000,
      error: function(xhr, status, errorThrown) {},
      success: function(data, status, xhr) {}
    });
  })();

  toolkit.ajax = {
    sendRequest: function(requestUrl, requestData, sussessCallback) {
      //console.log($.ajaxSetup());
      $.ajax({
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          type: "POST",
          url: requestUrl,
          data: JSON.stringify(requestData),
        })
        .done(sussessCallback);
    }
  };

  return toolkit;

})(IanToolkit, jQuery, window);
