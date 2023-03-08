document.addEventListener("DOMContentLoaded", function() {
    "use strict";

    // validate contact form
    const contactForm = document.querySelector("#contactForm");
    const nameInput = contactForm.querySelector("#name");
    const subjectInput = contactForm.querySelector("#subject");
    const phoneInput = contactForm.querySelector("#phone");
    const emailInput = contactForm.querySelector("#email");
    const messageInput = contactForm.querySelector("#message");

    const nameError = contactForm.querySelector("#nameError");
    const subjectError = contactForm.querySelector("#subjectError");
    const phoneError = contactForm.querySelector("#phoneError");
    const emailError = contactForm.querySelector("#emailError");
    const messageError = contactForm.querySelector("#messageError");

    let isValid = false;

    $(contactForm).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            subject: {
                required: true,
                minlength: 5
            },
            phone: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 20
            }
        },
        messages: {
            name: {
                required: "Name is required!",
                minlength: "A name should contain at least 2 characters"
            },
            subject: {
                required: "Subject is required!",
                minlength: "A subject must contain at least 5 characters"
            },
            phone: {
                required: "Phone is required!",
                minlength: "A phone must contain at least 5 characters"
            },
            email: {
                required: "Email is required!"
            },
            message: {
                required: "Message is required!",
                // minlength: "thats all? really?"
            }
        },
        errorPlacement: function(error, element) {
            // Add red error message under the input field
            error.css({color: 'red', marginLeft: '10px'});
            error.insertAfter(element);
        },
        submitHandler: function(form) {
            // send contact form data using EmailJS
            const serviceId = "$EMAILJS_SERVICEID";
            const templateId = "$EMAILJS_TEMPLATEID";
            emailjs.send(serviceId, templateId, {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                subject: subjectInput.value,
                message: messageInput.value
            }).then((res) => {
                // display success message
                const successModal = document.getElementById("successModal");
                successModal.style.display = "block";
                contactForm.reset();
            }, function(err) {
                // display error message
                const errorModal = document.getElementById("errorModal");
                errorModal.style.display = "block";
            });
        }
    });
    
    // Get the modal element 
    const modal = document.getElementById("successModal");

    // Get the close button
    const closeBtn = document.getElementById("close");

    // When the user clicks the close button or anywhere outside the modal, close it
    window.onclick = function(event) {
        if (event.target == modal || event.target == closeBtn) {
            modal.style.display = 'none';
        }
    };
});