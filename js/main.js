/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

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

        // Disable link clicks to prevent page scrolling
        $(document).on('click', 'a[href="#fakelink"]', function(e) {
            e.preventDefault();
        });

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

        $('.btn-group').on('click', 'a', function() {
            $(this).siblings().removeClass('active').end().addClass('active');
        });

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

/************
 Classes to set up the drop-down control
 ************/
var CustomControl = CustomControl || {};

(function(ctrl, gmap, win) {

  ctrl.optionDiv = function(options) {
    var control = document.createElement('DIV');
    control.className = "dropDownItemDiv";
    control.title = options.title;
    control.id = options.id;
    control.innerHTML = options.name;
    gmap.event.addDomListener(control, 'click', options.action);
    return control;
  };

  ctrl.checkBox = function(options) {
    //first make the outer container
    var container = document.createElement('DIV');
    container.className = "checkboxContainer";
    container.title = options.title;

    var span = document.createElement('SPAN');
    span.role = "checkbox";
    span.className = "checkboxSpan";

    var bDiv = document.createElement('DIV');
    bDiv.className = "blankDiv";
    bDiv.id = options.id;
    bDiv.style.display = 'block';
    bDiv.val = true;

    var image = document.createElement('IMG');
    image.className = "blankImg";
    image.src = "http://maps.gstatic.com/mapfiles/mv/imgs8.png";

    var label = document.createElement('LABEL');
    label.className = "checkboxLabel";
    label.innerHTML = options.label;

    bDiv.appendChild(image);
    span.appendChild(bDiv);
    container.appendChild(span);
    container.appendChild(label);

    gmap.event.addDomListener(container, 'click', function() {
      if (document.getElementById(bDiv.id).style.display === 'block') {
        document.getElementById(bDiv.id).style.display = 'none';
        options.val = false;
      } else {
        document.getElementById(bDiv.id).style.display = 'block';
        options.val = true;
      }

      options.action();
    });
    return container;
  };

  ctrl.separator = function() {
    var sep = document.createElement('DIV');
    sep.className = "separatorDiv";
    return sep;
  };

  ctrl.dropDownOptionsDiv = function(options) {
    var container = document.createElement('DIV');
    container.className = "dropDownOptionsDiv";
    container.id = options.id;
    for (var i = 0; i < options.items.length; i++) {
      container.appendChild(options.items[i]);
    }
    return container;
  };

  ctrl.dropDownControl = function(options) {
    var container = document.createElement('DIV');
    container.className = 'container';

    var control = document.createElement('DIV');
    control.className = 'dropDownControl';
    control.innerHTML = options.name;
    control.id = options.name;
    var arrow = document.createElement('IMG');
    arrow.src = "http://maps.gstatic.com/mapfiles/arrow-down.png";
    arrow.className = 'dropDownArrow';
    control.appendChild(arrow);
    container.appendChild(control);
    container.appendChild(options.dropDown);

    options.gmap.controls[options.position].push(container);
    gmap.event.addDomListener(container, 'click', function() {
      (document.getElementById('myddOptsDiv').style.display === 'block') ? document.getElementById('myddOptsDiv').style.display = 'none': document.getElementById('myddOptsDiv').style.display = 'block';
      setTimeout(function() {
        document.getElementById('myddOptsDiv').style.display = 'none';
      }, 1500);
    });
  };

  ctrl.buttonControl = function(options) {
    var control = document.createElement('DIV');
    control.innerHTML = options.name;
    control.className = 'button';
    control.index = 1;

    // Add the control to the map
    options.gmap.controls[options.position].push(control);

    // When the button is clicked pan to sydney
    gmap.event.addDomListener(control, 'click', options.action);
    return control;
  };
})(CustomControl, google.maps, window);

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

    $(window).resize(function(argument) {
      google.maps.event.trigger(gmap, 'resize');
    });

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

    //create the check box items
    var checkOptions = {
      gmap: gmap,
      title: 'heatMap 圖層開關',
      id: 'heatMapCtrl',
      label: 'HeatMap',
      action: function() {
        console.log(this.val);
        console.log('clicked check HeatMapCtrl');
      }
    };
    var check1 = new custCtrl.checkBox(checkOptions);

    var checkOptions2 = {
      gmap: gmap,
      title: 'GeoJson 圖層開關',
      id: 'geoJsonCtrl',
      label: 'GeoJson',
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
