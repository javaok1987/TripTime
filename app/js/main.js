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

    var $slider = $('#slider');
    var sliderValueMultiplier = 15;

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


  });

})(jQuery);

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
