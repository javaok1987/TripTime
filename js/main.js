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

  var gmap,
    $datepicker = $('#datepicker'),
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
        stylers: [{
          hue: "#00ffe6"
        }, {
          saturation: -20
        }]
      }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
          lightness: 100
        }, {
          visibility: "simplified"
        }]
      }, {
        featureType: "road",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      }];

      // Create a new StyledMapType object, passing it the array of styles,
      // as well as the name to be displayed on the map type control.
      var styledMap = new google.maps.StyledMapType(styles, {
        name: "Styled Map"
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

    $datepicker.datepicker({
      language: 'zh-TW',
      todayHighlight: true
    });
    $datepicker.datepicker("setDate", new Date());

    $btn.search.on('click', function() {
      var _content = '搭乘時間: ' + $slider.find('.ui-slider-value:last').data('slidervalue') +
        '\n交通工具: ' + $select.conveyance.val() +
        '\n查詢日期: ' + $datepicker.data('datepicker').getFormattedDate('yyyy-mm-dd') +
        '\n開始時間: ' + $select.fromtime.val();

      console.log(_content);
    });

  });

  var resizeMap = function() {
    google.maps.event.trigger(gmap, 'resize');
  };



})(jQuery);
