
//fonction pour ajouter les articles dans le panier
//selection du bouton ajouter au panier 
const addToCart = document.getElementById('addToCart');

//*il faut une fonction pour envoyer les informations du canapé au clic sur le bouton

//utilisation de la méthode addEventListener pour ajouter le clik du bouton
addToCart.addEventListener('click', (event) => {
//Si la quantité est bonne, il initialisera la fonction et ajoutera le produit au panier
event.preventDefault();
}
//*il faut une fonction qui va mettre des contraintes :on ne doit pas mettre un nombre qui est egalà 0 et > à 100 

// si la quantité est supérieur à 0 et que la quantité est inférieur ou égale à 100 
//et qu'il y a une couleur selectionnée, alors on excute le code si dessous.
if (document.getElementById("quantity").value > 0 && document.getElementById("quantity").value <=100 && document.getElementById("colors").value != 0){

//ensuite je recupère l'identifiant du produit que je voudrais mettre dans le panier,
//*je récupère la quantité, la couleur (une fois que j'ai ces trois éléments(id,qt,couleur))
   
//Recupération du choix de la quantité 
// avec variable qui obtient la valeur de quantité

let choixQuantite = document.getElementById("quantité");

//Recupération du choix de la couleur
//avec variable qui obtient la valeur de couleur du canape
let choixCouleur = document.getElementById("colors");
                

//Récupération des options de l'article à ajouter au panier
let optionsProduit = {
    idProduit: idProduct,
    couleurProduit: choixCouleur,
    quantiteProduit: Number(choixQuantite),
    nomProduit: article.name,
    prixProduit: article.price,
    descriptionProduit: article.description,
    imgProduit: article.imageUrl,
    altImgProduit: article.altTxt
};
//------------------------------------------------------LOCAL STORAGE-----------------------------------------------

// je déclare une variable productInLocalStorage 
// dans laquelle je mets les clés  et valeurs dans le local storage
// JSON.parse permet de convertir les données au format JSON qui sont dans le localstorage en objet JavaScript
let productInLocalStorage =  JSON.parse(localStorage.getItem('product'));

//Ajout des elements du panier dans un tableau
let eltPanier = [{ image, imageAlt, name, price, choixOpt, qty, productID }];

// j'ajoute les produits sélectionnés dans le localStorage
const addProductLocalStorage = () => {
// je récupère la sélection de l'utilisateur dans le tableau de l'objet :
// on peut voir dans la console qu'il y a les données,
// mais pas encore stockées dans le storage à ce stade

productInLocalStorage.push(selection);
// je stocke les données récupérées dans le localStorage :
// JSON.stringify permet de convertir les données au format JavaScript en JSON 
// vérifier que la key et value dans l'inspecteur contiennent bien des données
  localStorage.setItem('product', JSON.stringify(productInLocalStorage));
}

//Si le localstorage est vide, on créer un tableau, on push le panier dedans et on stock dans localStorage
if (!panierToStock) {
    panierToStock = [];
    panierToStock.push(eltPanier);//on push le panier dedans 
    localStorage.setItem("product", JSON.stringify(panierToStock)); // On met "product" dans le locale storage et on transforme "prodArray" en string dans notre local storage 
};
}
//et pour veridier si le produit existe il faut verifier l'identifiant du produit 
//et la couleur car un produit est identique si il a le meme id et la meme couleur 
// Permet de contrôler qu'une quantité et une couleur sont bien sélectionnées
if(productQuantity.value !== 0 && colorChoice.value !== ""){
//si le produit se retrouve dans le panier avec la même couleur et le même idProduct, on ajoute la quantité
    if (products) {
        const isProductInTheCart = products.find(
          (productInCart) =>
            productInCart.idProduct === product.idProduct &&
            productInCart.colors === product.colors
);
}
});



document.getElementById("totalQuantity").innerHTML = totalQuantity();