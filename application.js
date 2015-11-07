console.log('LOADED APPLICATION');

// Store user's location
var userPosition = {
	latitude: 0,
	longitude: 0
};

var map = null; // will be initialze later

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

// move the map
function moveMap(map) {
	map.setCenter({lat: getLat(), lng: getLon()});
	map.setZoom(10); // zooming is inverted, bigger number = more zoom
}

function initHereMap() {
	// Initialized communication with back-end services
	var platform = new H.service.Platform({
		app_id: "habu7uC2upRacruDrUfu",
		app_code: "85_CDKXMNkoraKX54-ZS-g",
		useCIT: true,
		useHTTPS: true
	});

	// Obtain the default map type from the platform object
	var defaultLayers = platform.createDefaultLayers();

	// Initialized a map - if location not given then it will give a world view
	var map = new H.Map(document.getElementById("map-container"), defaultLayers.normal.map /*, {
		remove the quotes to add a default init location
		center: setCenter({lat: getLat(), lng: getLon()});
		zoom: setZoom(11);
	} */ );

	//Step 3: make the map interactive
	// MapEvents enables the event system
	// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
	var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

	// Create the default UI components
	var ui = H.ui.UI.createDefault(map, defaultLayers);

	moveMap(map)
}

















