/*-----------------------------------------------------
                AFFICHAGE PRODUITS
------------------------------------------------------*/

const orderNumber = document.getElementById("orderId");

// récupération de l'url de orderID
const param = new URL(document.location).searchParams;
// récupération de orderid
const orderId = param.get("orderId");

orderNumber.textContent = orderId;

localStorage.clear();




const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

const orderId = document.getElementById('orderId');
orderId.innerHTML = id;

localStorage.clear();

//RECUPERATION DU NUMERO DE COMMANDE DANS L'URL POUR AFFICHAGE
// récupération de l'url de orderID
let params = new URLSearchParams(window.location.search);
const orderId = params.get("id");
document.getElementById("orderId").innerHTML += `${orderId}`;