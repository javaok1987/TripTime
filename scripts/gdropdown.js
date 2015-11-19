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
