let mainPosition = false;

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

/*
returns the latitude and longitude of the user's position
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
This function is called when the user clicks on "Get my location" button.
It does the following:
- retrieves user position
- centers the map at the user's position
- zooms the map by a factor of 13
- marks the user position on the map with a marker
- updates input boxes with user location
*/
function getLocation() {
    function success(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        // center the map arround user location
        map.setCenter({lat: lat, lng: lng})
        map.setZoom(13)

        if (!mainPosition) {
            // put a marker on the current location
            mainPosition = new google.maps.Marker({
                position: {
                    lat: lat,
                    lng: lng
                },
            label: "Observer",
            map: map,
        });
        }
        else {
            mainPosition.setPosition({
                lat: lat,
                lng: lng
            });
        }
        // update input boxes with user location
        $("#satellite-lat").val(lat);
        $("#satellite-lon").val(lng);
    
        console.log("Got coordinates " + lat + ", " + lng);
    }
    function error() {
        $("#satellite-api-status").html(`<h2>Location access must be allowed!</h2>`);
        console.log("Error on location");
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {}    
}
