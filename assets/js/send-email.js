var form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    form.querySelector('.loading').classList.add('d-block');
    form.querySelector('.error-message').classList.remove('d-block');
    form.querySelector('.sent-message').classList.remove('d-block');
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        form.querySelector(".loading").classList.remove("d-block");
        if (response.ok) {
            form.querySelector('.sent-message').classList.add('d-block');
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    form.querySelector('.loading').classList.remove('d-block');
                    form.querySelector(".error-message").innerHTML = "Oops! Hay un problema con el envío de tu mensaje. <br>" + data["errors"].map(error => error["message"]).join(", ")
                    form.querySelector('.error-message').classList.add('d-block');
                } else {
                    form.querySelector('.loading').classList.remove('d-block');
                    form.querySelector(".error-message").innerHTML = "Oops! Hay un problema con el envío de tu mensaje."
                    form.querySelector('.error-message').classList.add('d-block');
                }
            })
        }
    }).catch(error => {
        form.querySelector('.loading').classList.remove('d-block');
        form.querySelector(".error-message").innerHTML = "Oops! There was a problem submitting your form"
        form.querySelector('.error-message').classList.add('d-block');
    });
}
form.addEventListener("submit", handleSubmit)