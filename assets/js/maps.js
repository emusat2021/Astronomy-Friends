var map;
function initMap() {
    // initialize global variable map with a new Map object
    // center map on lat=0 and lng=0
    // zoom in by a factor of 3
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 0,
            lng: 0
        }
    });
    // add a event listener for clicking on the map
    // action is to call the addMarker function which will add a marker at the clicked position
    google.maps.event.addListener(map, "click", (event) => {
        addMarker(event.latLng, map);
    });


}
// Add marker on the map
// update input boxes with coordinates
function addMarker (location, map) {
    if (!mainPosition) {
        mainPosition = new google.maps.Marker({
            position: location,
            label: "Observer",
            map: map,
        });
    }
    else {
        mainPosition.setPosition(location);
    }
    
    console.log(location.toJSON());
    // add lat and Lng to the input boxes:(id=satellite-lat and id=satellite-lon)
    $("#satellite-lat").val(location.toJSON()["lat"]);
    $("#satellite-lon").val(location.toJSON()["lng"])
}
