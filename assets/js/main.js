$(document).ready(function(){

    // call function from autocomplete.js for input with id #satellite-id.
    // this will display suggestion when user starts typing in the inputbox
    autocomplete(document.getElementById("satellite-id"));
        /*
        using Satellite Passes API
        this promise function retrieves data from an API endpoint
        the documentation for this API is found here:
        https://github.com/redraw/satellite-passes-api/blob/master/app/static/openapi.json
        the API takes the following input parameters:
        - Satellite ID: This is the NoradId for the object you will want to track;
          The satellite ID is retrieved from input box #satellite-id.
        - Latitude: The coordinates of the observer;
          The Latitude is retrieved from input box #satellite-lat.
        - Longitude: The coordinates of the observer;
          The Longitude is retrieved from input box #satellite-lon.
        - Limit: The number of passes abouve the specified coordinates for the respective objects.
          The limit is hardcoded to 1

        The API response is a list of objects. Each object contains information about: rise, culmination, set and visibility.
        */

        $.when(
            $.getJSON(`https://satellites.fly.dev/passes/${noradId}?lat=${lat}&lon=${lon}&limit=1`),
        ).then(
            function(firstResponse) {
                // display status of the API call
                $("#satellite-api-status").html("Request successful.");
                // display the information from the first pass (rise, culmination, set, visibility)
                $("#satellite-api-answer").html("");
                console.log(firstResponse);

                for (var i = 0; i < firstResponse.length; i++) {
                    // todo move the following lines to a separate function
                    console.log(firstResponse[i].culmination.utc_datetime);
                    $("#satellite-api-answer").append("Rise: " + firstResponse[i].rise.utc_datetime); 
                    $("#satellite-api-answer").append("<br>");
                    $("#satellite-api-answer").append("Culmination: " + firstResponse[i].culmination.utc_datetime); 
                    $("#satellite-api-answer").append("<br>");
                    $("#satellite-api-answer").append("Set: " + firstResponse[i].set.utc_datetime); 
                    $("#satellite-api-answer").append("<br>");
                }
                // reset the countdown timer if the countdown timer is counting
                if (mainTimer !== null) {
                    clearInterval(mainTimer)
                }
                // convert the rise time to a Date object
                startPassMsec = Date.parse(firstResponse[0].rise.utc_datetime);
                // convert the set time to a Date object
                endPassMsec = Date.parse(firstResponse[0].set.utc_datetime);
                console.log(startPassMsec);
                console.log(endPassMsec);
                // activate the countdown timer
                mainTimer = go($("#satellite-id").val(), startPassMsec, endPassMsec);

            },
            function(errorResponse) {
                $("#satellite-api-status").html("");
                //Response.status === 400 (that's a not found error)
                if (errorResponse.status === 400) {
                    $("#satellite-api-status").html(
                        `<h2>Invalid request. Check your input data.</h2>`); 
                } else { 
                    // Catch other errors
                    console.log(errorResponse);
                    $("#satellite-api-status").html(
                        `<h2>Error: ${errorResponse.statusText} ${errorResponse.status}. Check your input data.</h2>`); 
                }
            });
    });

});
