function showNoCommand() {
let params = new URL(document.location).searchParams;//récupération du numéro de commande dans l'url de la page
let orderId = params.get("orderId");

//affichage du numéro de commande 
document.getElementById("orderId").textContent = orderId;
localStorage.clear();
}
showNoCommand();







