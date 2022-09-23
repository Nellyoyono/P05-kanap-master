function showNoCommand() {
/* récupération du numéro de commande dans l'url de la page */
let params = new URL(document.location).searchParams;
let orderId = params.get("orderId");

/* affichage du numéro de commande */
document.getElementById("orderId").textContent = orderId;
localStorage.clear();
}
showNoCommand();







