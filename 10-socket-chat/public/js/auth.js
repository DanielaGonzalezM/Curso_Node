const formLogin = document.querySelector("#formLogin");

const url = "http://localhost:3000/api/auth/";

formLogin.addEventListener("submit", ev => {
    ev.preventDefault();
    const formData = {};
    for (let el of formLogin) {
        if (el.name.length > 0)
            formData[el.name] = el.value;
    }
    fetch(url + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(resp => resp.json())
        .then(({ msg, token, usuario }) => {
            if (msg) {
                return console.error(msg);
            }
            localStorage.setItem("token", token)
            localStorage.setItem("email", usuario.correo)
            window.location = "chat.html"

        })
        .catch(err => {
            console.log(err)
        })
});



function handleCredentialResponse(response) {
    const body = {
        id_token: response.credential
    };
    fetch(url + "google", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then((resp) => resp.json()).then((resp) => {
        console.log(resp);
        localStorage.setItem("email", resp.usuario.correo);
        localStorage.setItem("token", resp.token);
        window.location = "chat.html"
    }).catch(console.warn);
}


const button = document.getElementById("google_signout");
button.onclick = () => {
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem("email"), done => {
        localStorage.clear();
        location.reload();
    });
};

document.addEventListener("DOMContentLoaded", (event) => {
    const token = localStorage.getItem("token");
    if(token && token.length>10){
        window.location = "chat.html"
    }
});
