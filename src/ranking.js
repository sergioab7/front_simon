let token = localStorage.getItem("token");
if(!token){
  location.href="../pages/index.html";
}

mostrarRanking();

const nombreJugador = document.querySelectorAll(".usernamePerfil");
const maximaPuntuacion = document.querySelector(".maximaPuntuacion");
const correoUsuario = document.querySelector(".correoUsuario");

const agregarRanking = document.querySelector(".agregarRanking");

const imagenUsuario = document.querySelector(".imagenUsuario");
const seccionPerfil = document.querySelector(".section");

imagenUsuario.addEventListener("click", () => {
  seccionPerfil.classList.toggle("esconder");
})



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
  }else{
    localStorage.setItem("token", "");
    location.href="../pages/index.html";
  }
})

function salir(){
  localStorage.setItem("token", "");
  location.href="../pages/index.html";
}

function juego(){
  location.href="../pages/juego.html";
}

function accederData(data){
  nombreJugador.forEach(nombre => {
    nombre.innerHTML=data.username;
  });
  correoUsuario.innerHTML=data.email;
  maximaPuntuacion.innerHTML=data.puntuacion;
}

function mostrarRanking(){
  const URL_RANKING = "http://127.0.0.1:4343/api/ranking/200";
  fetch(URL_RANKING, {
    headers:{
      "Content-type":"application/json",
      Authorization:`Bearer: ${token}`
    }
  }).then(res => res.json())
  .then(data => {
    ponerRanking(data.ranking);
  })
}


function ponerRanking(ranking){
  let numero = 1;
    ranking.forEach(rank => {
        const crear_tr = document.createElement("tr");
        crear_tr.classList.add("bg-white", "border-b", "dark:bg-gray-800", "dark:border-gray-700", "hover:bg-gray-50", "dark:hover:bg-gray-600");
        crear_tr.innerHTML=`
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${numero}
        </th>
        <td class="">
            ${rank.username}
        </td>
        <td class="px-6 py-4">
            ${rank.puntuacion}
        </td>
        `;
        agregarRanking.appendChild(crear_tr);
        numero += 1;
    })
}