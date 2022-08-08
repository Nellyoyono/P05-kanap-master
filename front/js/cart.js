
// la page panier contient 
//1)un resumé des produits dans le panier, le prix total et la pssibilité de modifier la quantité d'un produit selectionné ou bien de supprimer celui-ci
//2)un formulaire permettant de passer une commande.les données formaulaires doivent etre correctes et bien formatées 
//avant d'etre renvoyer au back end:par exemple pas de chiffre dans un champs crayon

//sur cette page,l'utilisateur peut modifier la quantité d'un produit de son panier ; à ce moment le total du panier devra bien se mettre à jour 
//l'utilisateur pourra supprimer un produit de son panier,le produit devra donc disparaitre de la page
//les inputs des utilisateurs doivent etre analysés et validés pour verifier le format type de données avant l'envoi à l'API
//si un produit est ajouté dans le panier à plusieurs reprises avec la meme couleur, celui-ci ne doit apparaitre que une fois 
//si un produit est ajouté dans le panier à plusieurs reprises mais avec des couleurs differentes, 
//il doit apparaitre en deux lignes distinctes avec la couleur et la qte correcpondante à chaque fois  

//---------------affichage des produits du panier----------------------------//


//Affichage des éléménts du panier avec deux conditions, si le panier est vide ou si il y'a des elements dans le panier 
//fonctions pour insérer les élements de la page produits à partir de la liste de canapé*
//Ensuite une fois les produits récupérés, les informations des produits s'affichent---

function showCart() {
//récupération des données stokées dans le localStorage avec avec la méthode getItem
//JSON.parse pour convertir les données au format JSON qui sont dans le localstorage en objet JavaScript
    let itemCards = JSON.parse(localStorage.getItem('cart'));
//si le pnier est vide 
    if (itemCards === null && itemCards.length === 0){
        document.getElementById('cart__items').innerHTML += `Votre panier est vide`;
    }
//si elements dans le panier 
else{
//Pour cette boucle for  , créez une variable d'indice i  qui sert de compteur pour le nombre d'exécutions de la boucle.
// C'est pour cette raison qu'elle démarrera à zéro, car on n'a pas encore parcouru la boucle
// si il y a un panier avec une taille differante de 0 (donc supérieure à 0)
    for (let i=0; i < itemCards.length; i++) {
        fetch(`http://localhost:3000/api/products/${itemCards[i].id}`)
        .then(res => res.json())
        .then(data => { 
        let produits = data;
// le code suivant sera injecté à chaque tour de boucle selon la longueur des produits dans le local storage
document.getElementById('cart__items').innerHTML += `
<article class="cart__item" data-id="${produits.id}" data-color="${itemCards[i].color}">
<div class="cart__item__img">
  <img src="${produits.imageUrl}" alt="${produits.alt}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__titlePrice">
    <h2>${produits.name}</h2>
    <p>${itemCards[i].color}</p>
    <p>${produits.price} €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemCards[i].quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>
`;
          
      })
// j'ajoute un message au cas où le serveur ne répond pas
.catch(_error => {
alert("le serveur ne repond pas, veuiller nous contacter par mail kanapsupport@gmail.com");
});
    }
}
}
showCart();

//objectif: //il faut afficher le bon total et quant je modifie la quantite cela doit changer 
//et quant je clique sur supprimer cela doit supprimer ce produit et le total doit se recalculer automatiquement 


//fonction modifier les quantités du panier
//a) modification de la quantité avec les boutons +/-
//ajout avec le boutons "+"
const allButtonPlus = document.getElementsByClassName("plus");
for (let buttonPlus of allButtonPlus) {
  buttonPlus.addEventListener("click", addArticlePlus);
}
//retrait avec le bouton "-"
const allButtonMinus = document.getElementsByClassName("minus");
for (let buttonMinus of allButtonMinus) {
  buttonMinus.addEventListener("click", substractArticleMinus);
}


function supprimerArticle(e) {
//fonction pour supprimer un produit directement dans le panier 

    let index = e.getAttribute("index");
    panier.splice(index, 1);
    localStorage.setItem("produit", JSON.stringify(panier));
    location.reload();
}


//fonction Calcul du prix total du panier en fonction de la quantité et des prix des produits
// Calcul du total prix
function totalPrice() {
    let totalprix = 0;
    for (let i = 0; i < panier.length; i++) {
        let quantity = parseInt(panier[i][0].qty);
        let prix = parseInt(panier[i][0].price);
        totalprix += prix * quantity;
    }
    return totalprix;
}
// affichage du total quantités


