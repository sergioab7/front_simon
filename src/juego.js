let token = localStorage.getItem("token");
if(!token){
  location.href="../index.html";
}
let idUser;

const nombreJugador = document.querySelectorAll(".usernamePerfil");
//const maximaPuntuacion = document.querySelector(".maximaPuntuacion");
const correoUsuario = document.querySelector(".correoUsuario");

const imagenUsuario = document.querySelector(".imagenUsuario");
const seccionPerfil = document.querySelector(".section");

imagenUsuario.addEventListener("click", () => {
  seccionPerfil.classList.toggle("esconder");
})


/*
Fetch
*/

const URL = 'http://127.0.0.1:4343/api/dashboard'

fetch(URL, {
  method:"GET",
  headers:{
    "Content-type":"application/json",
    "Authorization": `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => {
  if(data.status=="Success"){
    accederData(data.informacion);
    idUser=data.informacion.id;
  }else{
    localStorage.setItem("token", "");
    location.href="../index.html";
  }
})

function salir(){
  localStorage.setItem("token", "");
  location.href="../index.html";
}

function volver(){
  location.href="../pages/dashboard.html";
}

function accederData(data){
  console.log(data);
  nombreJugador.forEach(nombre => {
    nombre.innerHTML=data.username;
  })
  correoUsuario.innerHTML=data.email;
  //maximaPuntuacion.innerHTML=data.puntuacion;
}


/*Acaba fetch*/

const btnPlay = document.querySelector(".btnPlay");
const mostrarNivel = document.querySelector(".mostrarNivel");

const contenedorBotones = document.querySelector(".contenedorBotones");
const juegoFin = document.querySelector(".grupoJuego");
juegoFin.style.display="none";
const nuevoLogro = document.querySelector(".nuevoLogro");
nuevoLogro.style.display="none";

/*
sonido
*/

const sonido = document.querySelector("#sonido");

const turnoAdquirido = document.querySelector(".turnoAdquirido");

const btnRed = document.querySelector("#red");
const btnOrange = document.querySelector("#orange");
const btnGreen = document.querySelector("#green");
const btnBlue = document.querySelector("#blue");

btnRed.addEventListener("click", buttonPressed);
btnOrange.addEventListener("click", buttonPressed);
btnGreen.addEventListener("click", buttonPressed);
btnBlue.addEventListener("click", buttonPressed);

btnPlay.addEventListener("click", empiezaJuego);
let estado = "";
let turno = 0;
let turnoMaquina = [];
let eleccionJugador = 0;

let botones = [btnRed, btnOrange, btnGreen, btnBlue];

function empiezaJuego(){
    console.log("Empieza!");
    mostrarNivel.classList.toggle("desaparece");
    btnPlay.classList.add("desaparece");

    maquinaEligeColor();
}

function maquinaEligeColor(){
    estado="turno-maquina";

    setTimeout(() => {
        turno += 1;
        mostrarNivel.innerHTML = "Nivel: " + turno;
        let numeroRandom = Math.floor(Math.random() * 4);
        let boton = botones[numeroRandom];
    
        turnoMaquina = [...turnoMaquina, boton];
    
        iluminarBoton(boton);
        sonido.play();
        
        eleccionJugador = 0;
        estado="turno-jugador";
    },500)
}


function iluminarBoton(boton) { 
    boton.classList.toggle("agregado")
    setTimeout(() => {
        boton.classList.toggle("agregado");
    },100);
}


function buttonPressed(e){
    if(estado=="turno-jugador"){
        let button = e.target;

        if(button === turnoMaquina[eleccionJugador]){
            eleccionJugador++;
            iluminarBoton(button);
            if(eleccionJugador == turnoMaquina.length){
                maquinaEligeColor();
            }
        }else{
            estado='game-over';
            juegoFinalizado();
        }
    }   
}


function juegoFinalizado(){
    console.log("fionalizado");
    contenedorBotones.classList.add("desaparece");
    mostrarNivel.style.display="none";
    juegoFin.style.display="block";
    turnoAdquirido.innerHTML=turno;
    comprobarTurnos(); //actualizar, poner, etc... en bbdd

}


function comprobarTurnos(){
    //idUser
    let infoUser = {
        puntos:turno,
        id:idUser
    }
    const URL = `http://127.0.0.1:4343/api/nueva-puntuacion`;
    fetch(URL, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer: ${token}`
        },
        body:JSON.stringify(infoUser)
    })
    .then(res => res.json())
    .then(data => {
        actualizacionPuntos(data.status);
    })
}

function actualizacionPuntos(data){
    if(data=="Error"){

    }else{
        nuevoLogro.style.display="block";
    }
}