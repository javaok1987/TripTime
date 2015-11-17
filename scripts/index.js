/*global google:false */
'use strict';

(function($) {

  var gmap,
    $slider = $('#slider'),
    $select = {
      fromtime: $('#select-form-time'),
      conveyance: $('#select-conveyance')
    },
    $btn = {
      search: $('#btn-search')
    },
    $menu = $('#menu-toggle'),
    $wrapper = $('#wrapper');


  jQuery(function($) {

    google.maps.event.addDomListener(window, 'load', function() {
      var styles = [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 21
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#000000"
            }, {
                "lightness": 40
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }];

      // Create a new StyledMapType object, passing it the array of styles,
      // as well as the name to be displayed on the map type control.
      var styledMap = new google.maps.StyledMapType(styles, {
        name: 'Styled Map'
      });

      var mapOptions = {
        zoom: 12,
        mapTypeControlOptions: {
          // mapTypeIds: [google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE]
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
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
      gmap.mapTypes.set('map_style', styledMap);
      gmap.setMapTypeId('map_style');
    });

    $(window).resize(resizeMap);

    $menu.on('click', function(event) {
      event.preventDefault();
      $('#wrapper').toggleClass('toggled').promise().done(function() {
        setTimeout(resizeMap, 500); //TODO:不加setTimeout無法觸發?
      });
      var _this = $(this);
      _this.find('span').toggleClass('fui-list', 'fui-cross');
    });

    
    $btn.search.on('click', function() {
      var _content = '搭乘時間: ' + $slider.find('.ui-slider-value:last').data('slidervalue') +
        '\n交通工具: ' + $select.conveyance.val() +
        '\n開始時間: ' + $select.fromtime.val();

      console.log(_content);
    });

  });

  var resizeMap = function() {
    google.maps.event.trigger(gmap, 'resize');
  };



})(jQuery);
