const formulario = document.querySelector("form");

const URL = "http://127.0.0.1:4343/auth/register";

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let registro = {
        username:e.target.username.value,
        email:e.target.email.value,
        password:e.target.password.value
    }

    console.log(registro);
    enviarRegistro(registro);
})


function enviarRegistro(registro){
    fetch(URL, {
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(registro)
    })
    .then(res => res.json())
    .then(data => {
        if(data.message=="Usuario creado!"){
            location.href="/pages/login.html"
        }
    })
}