// animations
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.animate');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('animate-top-down')) {
                    entry.target.classList.remove('animate-top-down');
                    void entry.target.offsetWidth;
                    entry.target.classList.add('animate-top-down');
                } else if (entry.target.classList.contains('animate-fade-in')) {
                    entry.target.classList.remove('animate-fade-in');
                    void entry.target.offsetWidth;
                    entry.target.classList.add('animate-fade-in');
                }
            }
        });
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});

// menu navigator
function navigateToPage(selectElement) {
    var url = selectElement.value;
    if (url) {
        window.location.href = url;
    }
}

// contact form
var form = document.getElementById("contact-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("contact-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Thanks for your message. We'll be in touch shortly!";
            form.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form."
                }
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form."
    });
}
form.addEventListener("submit", handleSubmit)
