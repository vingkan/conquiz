console.log('LOADED APPLICATION');

// Store user's location
var userPosition = {
	latitude: 0,
	longitude: 0
};

var platform = null; // platform will be initialized with a new H map
var map = null; // will be initialze later
var defaultLayers = null; // default map type, will be used to store the map obtain from platform

// Function that updates user location
function updatePosition(position) {
	userPosition.latitude = position.coords.latitude;
	userPosition.longitude = position.coords.longitude;
}

// Using the navigator class to get a location and update it with update method to userPosition variable
function getGeolocation(callback) {
	navigator.geolocation.getCurrentPosition(function(position) {
		updatePosition(position);
		console.log("Called Geolocator");
		if (callback) {
			callback();
		}
	});
}

// Accessor methods
function getLat() {
	return userPosition.latitude;
}
function getLon() {
	return userPosition.longitude;
}
function getMap() {
	return map;
}

// move the map
function moveMap(map) {
	map.setCenter({lat: getLat(), lng: getLon()});
	map.setZoom(15); // zooming is inverted, bigger number = more zoom
}

function initHereMap() {
	// Initialized communication with back-end services
	platform = new H.service.Platform({
		app_id: "habu7uC2upRacruDrUfu",
		app_code: "85_CDKXMNkoraKX54-ZS-g",
		useCIT: true,
		useHTTPS: true
	});

	// Obtain the default map type from the platform object
	defaultLayers = platform.createDefaultLayers();

	// Initialized a map - if location not given then it will give a world view
	map = new H.Map(document.getElementById("map-container"), defaultLayers.normal.map /*, {
		remove the quotes to add a default init location
		center: setCenter({lat: getLat(), lng: getLon()});
		zoom: setZoom(11);
	} */ );

	// Make the map interactive
	// MapEvents enables the event system
	// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
	var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

	// Create the default UI components
	var ui = H.ui.UI.createDefault(map, defaultLayers);
	// move map to initial location
	moveMap(map);
}

function logMap() {
	console.log(map);
}

/**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
function addGroupMapMarker(group, coordinate, html) {
	var marker = new H.map.Marker(coordinate);
	marker.setData(html);
	group.addObject(marker);
}

function addInfoBubble(map) {
  var group = new H.map.Group();
  if (map == null) {
  	console.log("map is null");
  } else if (group == null) {
  	console.log("group is null")
  }

  map.addObject(group);

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt) {
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    var bubble =  new H.ui.InfoBubble(evt.target.getPosition(), {
      // read custom data
      content: evt.target.getData()
    });
    // show info bubble
    ui.addBubble(bubble);
  }, false);
  addMarkerToGroup(group, {lat:41.835591, lng:-87.625787},
    '<div><a href=\'http://http://web.iit.edu\' >IIT</a>' +
    '</div><div>McCormick Tribune Campus Center<br>Illinois Institude of Technology</div>');
}
















