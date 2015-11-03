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

    $menu.on('click', function() {
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
