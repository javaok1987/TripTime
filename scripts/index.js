/*global google:false */
'use strict';

(function($) {
  var gmap;
 

  jQuery(function($) {

    google.maps.event.addDomListener(window, 'load', function() {
      var mapOptions = {
        zoom: 12,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
        },
        panControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        maxZoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL,
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        center: new google.maps.LatLng(25.0372264, 121.506378) //全台23.714059, 120.832002
      };
      gmap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    });

    $(window).resize(resizeMap);

    $('#menu-toggle').on('click', function() {
      $('#wrapper').toggleClass('toggled').promise().done(function() {
        setTimeout(resizeMap, 500); //TODO:不加setTimeout無法觸發?
      });
    });


  });

  var resizeMap = function() {
    console.log("resize");
    google.maps.event.trigger(gmap, 'resize');
  };

})(jQuery);
