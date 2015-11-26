/* global  IanToolkit,CustomControl */

'use strict';

(function($, iToolkit, custCtrl, classie) {

  var gmap,
    $slider = $('#slider'),
    $walkSlider = $('#walk-slider'),
    $select = {
      fromtime: $('#select-form-time'),
    },
    $conveyance = $('#article-conveyance'),
    $btn = {
      search: $('#btn-search')
    },
    $menuToggleClose = $('#menu-toggle-close'),
    $menuToggleOpen = $('#menu-toggle-open'),
    $wrapper = $('#wrapper'),
    $footer = $('#footer');


  jQuery(function($) {

    FastClick.attach(document.body);

    $menuToggleClose.on('click', function(e) {
      e.preventDefault();
      $footer.slideUp('slow');
    });

    $menuToggleOpen.on('click', function(e) {
      e.preventDefault();
      $footer.slideDown('slow');
    });

    $btn.search.on('click', function() {
      var _content = '搭乘時間: ' + $slider.find('.ui-slider-value:last').data('slidervalue') +
        '\n開始時間: ' + $select.fromtime.val();

      console.log(_content);
    });

    $('.iui-overlay').find('.btn-close').on('click', function() {
      classie.addClass(document.getElementById('overlay'), 'hidden');
      initMap();
    });

    $('#weekly').find('button').on('click', function() {
      console.log($(this).text());
    });

    $conveyance.find('[data-toggle="checkbox"]').on('change.radiocheck', function(ele) {
      var $this = $(this);
      console.log($this.prop('checked'));
      console.log($this.prop('id'));
    });

  });

  function initMap() {

    var mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng(25.0372264, 121.506378),
      disableDefaultUI: true,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      // center: new google.maps.LatLng() //全台23.714059, 120.832002
      styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]}]
    };

    gmap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var image = 'img/map-marker.png';
    var myLatLng = new google.maps.LatLng(25.0372264, 121.506378);
    var centerMarker = new google.maps.Marker({
      position: myLatLng,
      map: gmap,
      icon: image
    });

    google.maps.event.addListener(gmap, 'idle', function() {
      centerMarker.setPosition(gmap.getCenter());
      console.log(gmap.getCenter().toString());
    });

    $(window).resize(function(argument) {
      google.maps.event.trigger(gmap, 'resize');
    });
    
    //create the check box items
    var checkOptions = {
      gmap: gmap,
      title: '圖層開關',
      id: 'mapCtrl-1',
      label: '行駛範圍圖',
      action: function() {
        console.log(this.val);
        console.log('clicked check HeatMapCtrl');
      }
    };
    var check1 = new custCtrl.checkBox(checkOptions);

    var checkOptions2 = {
      gmap: gmap,
      title: '圖層開關',
      id: 'mapCtrl-2',
      label: '可及密度圖',
      action: function() {
        console.log(this.val);
        console.log('clicked check GeoJsonCtrl');
      }
    };
    var check2 = new custCtrl.checkBox(checkOptions2);

    //possibly add a separator between controls        
    var sep = new custCtrl.separator();

    //put them all together to create the drop down       
    var ddDivOptions = {
      items: [check1, check2],
      id: 'myddOptsDiv'
    };
    //alert(ddDivOptions.items[1]);
    var dropDownDiv = new custCtrl.dropDownOptionsDiv(ddDivOptions);

    var dropDownOptions = {
      gmap: gmap,
      name: '圖層',
      id: 'mapControl',
      title: 'A custom drop down select with mixed elements',
      position: google.maps.ControlPosition.TOP_RIGHT,
      dropDown: dropDownDiv
    };

    var dropDown1 = new custCtrl.dropDownControl(dropDownOptions);
  }


})(jQuery, IanToolkit, CustomControl, classie);
