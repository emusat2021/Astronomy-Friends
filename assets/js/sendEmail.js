function sendMail(contactForm) {
    emailjs.send("service_2wkaa2t", "template_xn8db9g", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "suggestions": contactForm.suggestions.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}