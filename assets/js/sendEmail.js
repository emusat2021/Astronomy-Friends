function sendMail(contactForm) {
    $("#email-feedback").html(
        // display an animated gif file to let the user know that the data is being accessed. // 
        `<i class="fas fa-circle-notch fa-spin"></i>`);

    emailjs.send("service_2wkaa2t", "template_xn8db9g", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "suggestions": contactForm.suggestions.value
    })
    .then(
        function(response) {
            if (MAIN_DEBUG)
                console.log("SUCCESS", response);
            $("#email-feedback").html("");
            $("#contactModalSuccess").modal("show");
        },
        function(error) {
            if (MAIN_DEBUG)
                console.log("FAILED", error);
            $("#contactModalError").modal("show");
        }
    );
    return false;  // To block from loading a new page
}