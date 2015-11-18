'use strict';

// Extend JS String with repeat method
String.prototype.repeat = function(num) {
    return new Array(Math.round(num) + 1).join(this);
};

(function($) {

    // Add segments to a slider
    $.fn.addSliderSegments = function() {
        return this.each(function() {
            var $this = $(this),
                option = $this.slider('option'),
                amount = (option.max - option.min) / option.step,
                orientation = option.orientation;
            if ('vertical' === orientation) {
                var output = '',
                    i;
                console.log(amount);
                for (i = 1; i <= amount - 1; i + 1) {
                    output += '<div class="ui-slider-segment" style="top:' + 100 / amount * i + '%;"></div>';
                }
                $this.prepend(output);
            } else {
                var segmentGap = 100 / (amount) + '%';
                var segment = '<div class="ui-slider-segment" style="margin-left: ' + segmentGap + ';"></div>';
                $this.prepend(segment.repeat(amount - 1));
            }
        });
    };

    jQuery(function($) {

        var $slider = $('#slider'),
            $walkSlider = $('#walk-slider'),
            sliderValueMultiplier = 15;

        // Custom Selects
        if ($('[data-toggle="select"]').length) {
            $('[data-toggle="select"]').select2(); 
        }

        // jQuery UI Sliders
        if ($slider.length > 0) {
            $slider.slider({
                min: 1,
                max: 4,
                value: 2,
                orientation: 'horizontal',
                range: 'min',
                slide: function(event, ui) {
                    var _value = ui.value * sliderValueMultiplier;
                    $slider.find('.ui-slider-value:last').text(_value + ' 分鐘').data('slidervalue', _value);
                }
            }).addSliderSegments($slider.slider('option').max);
        }

        if ($walkSlider.length > 0) {
            $walkSlider.slider({
                min: 1,
                max: 4,
                value: 2,
                orientation: 'horizontal',
                range: 'min',
                slide: function(event, ui) {
                    var _value = ui.value * sliderValueMultiplier;
                    $walkSlider.find('.ui-slider-value:last').text(_value + ' 分鐘').data('slidervalue', _value);
                }
            }).addSliderSegments($walkSlider.slider('option').max);
        }

        // Checkboxes and Radio buttons
        $('[data-toggle="checkbox"]').radiocheck();
        $('[data-toggle="radio"]').radiocheck();

        // Switches
        if ($('[data-toggle="switch"]').length) {
            $('[data-toggle="switch"]').bootstrapSwitch();
        }

    });

})(jQuery);

/*global google:false */
'use strict';

var IanUtil = IanUtil || {};
IanUtil.overlay = (function() {
  var method = {
    hide: function(elementId) {
      document.getElementById('' + elementId).className += ' hidden';
    },
    show: function(elementId) {
      var el = document.getElementById('' + elementId);
      if (el.classList) {
        el.classList.remove('hidden');
      } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + 'hidden' + '(\\b|$)', 'gi'), ' ');
      }
    }
  };
  return method;
})();

(function($, iutil) {

  var gmap,
    $slider = $('#slider'),
    $walkSlider = $('#walk-slider'),
    $select = {
      fromtime: $('#select-form-time'),
    },
    $conveyance = $('input[name=conveyance]:checked'),
    $btn = {
      search: $('#btn-search')
    },
    $menuToggleClose = $('#menu-toggle-close'),
    $menuToggleOpen = $('#menu-toggle-open'),
    $wrapper = $('#wrapper'),
    $footer = $('#footer');


  jQuery(function($) {

    $(window).resize(resizeMap);

    // $('#wrapper').toggleClass('toggled').promise().done(function() {
    //   setTimeout(resizeMap, 500); //TODO:不加setTimeout無法觸發?
    // });
    
    $menuToggleClose.on('click', function() {
      $footer.slideUp('slow');
    });

    $menuToggleOpen.on('click', function() {
      $footer.slideDown('slow');
    });

    $btn.search.on('click', function() {
      var _content = '搭乘時間: ' + $slider.find('.ui-slider-value:last').data('slidervalue') +
        '\n交通工具: ' + $conveyance.val() +
        '\n開始時間: ' + $select.fromtime.val();

      console.log(_content);
    });

    $('.iui-overlay').find('.btn-close').on('click', function() {
      iutil.overlay.hide('overlay');
      iutil.overlay.show('overlay-weekly');
      loadMap();
    });

    $('#overlay-weekly').find('button').on('click', function() {
      iutil.overlay.hide('overlay-weekly');
      console.log($(this).text());
    });

  });

  var loadMap = function() {
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
  };

  var resizeMap = function() {
    google.maps.event.trigger(gmap, 'resize');
  };




})(jQuery, IanUtil);
