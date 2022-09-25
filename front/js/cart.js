let totalPrice = 0;
let totalQuantity = 0;
let totalPriceElement = document.getElementById('totalPrice');
let totalQuantityElement = document.getElementById('totalQuantity');
let cartItems = document.getElementById('cart__items');
let exemple = document.getElementsByClassName('cart__order__form__question');



let data = [].map.call(exemple, item => item);

console.log(data);

getCart().forEach(product => {
        fetch("http://localhost:3000/api/products/" + product.id)
  .then((res) => {
    return res.json();
  })
  .then(function (value) {
    cartItems.innerHTML += printProduct(value, product.quantity, product.color);
    totalQuantity += parseInt(product.quantity);
    totalPrice += parseInt(product.quantity) * parseInt(value.price);
    totalQuantityElement.innerHTML = totalQuantity;
    totalPriceElement.innerHTML = totalPrice;
    const itemQuantities = document.querySelectorAll('.itemQuantity');
    itemQuantities.forEach(item => {
        item.addEventListener('input', updateCartWhenQuantityChange, false);
    });
    const deleteItems = document.querySelectorAll('.deleteItem');
    deleteItems.forEach(item => {
        item.addEventListener('click', remove, false);
    });
  });
});




//fonctions

//calcul du prix total du panier 
function calculate() {
    totalQuantity = 0;
    totalPrice = 0;
    totalPriceElement.innerHTML = 0;
    totalQuantityElement.innerHTML = 0;
    getCart().forEach(product => {
        fetch("http://localhost:3000/api/products/" + product.id)
  .then((res) => {
    return res.json();
  })
  .then(function (value) {
    totalQuantity += parseInt(product.quantity);
    totalPrice += parseInt(product.quantity) * parseInt(value.price);
    totalPriceElement.innerHTML = totalPrice;
    totalQuantityElement.innerHTML = totalQuantity;
  });  
});  
}
//
function updateCartWhenQuantityChange(e) {
    let element = this.closest("article");
    let idValue = element.getAttribute('data-id');
    let colorValue = element.getAttribute('data-color');
    let cart = getCart();
    for(let i = 0; i<cart.length; i++) {
        if(parseInt(cart[i].id) === parseInt(idValue) && cart[i].color === colorValue) {
            cart[i].quantity = parseInt(e.target.value);
        }
    }
    setCart(cart);
    calculate();
}

function deleteItemCart(id, color) {
    let cart = getCart();
    for(let i = 0; i<cart.length; i++) {
        if(cart[i].id === id && cart[i].color === color) {
            cart.splice(i, 1);
        }
    }
    setCart(cart);
    calculate();
}

function remove() {
    let element = this.closest("article");
    let idValue = element.getAttribute('data-id');
    let colorValue = element.getAttribute('data-color');
    element.parentNode.removeChild(element);
    deleteItemCart(idValue, colorValue);
    alert('Article supprimé!');
};


function printProduct(product, quantity, color) {
    let html = '<article class="cart__item" data-id="' + product._id + '" data-color="' + color + '">';
    html += '<div class="cart__item__img">';
    html += '<img src="' + product.imageUrl + '" alt="' + product.altTxt + '">';
    html += '</div>';
    html += '<div class="cart__item__content">';
    html += '<div class="cart__item__content__description">';
    html += '<h2>' + product.name + '</h2>';
    html += '<p>' + color + '</p>';
    html += '<p>' + product.price + '€</p>';
    html += '</div>';
    html += '<div class="cart__item__content__settings">';
    html += '<div class="cart__item__content__settings__quantity">';
    html += '<p>Qté : </p>';
    html += '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="' + quantity + '">';
    html += '</div>';
    html += '<div class="cart__item__content__settings__delete">';
    html += '<p class="deleteItem">Supprimer</p>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</article>';
    return html;
}

function getCart() {
    let cart = localStorage.getItem('cart');
    if(!cart) {
      return [];
    }
    return JSON.parse(cart);
}

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function post(e) {
    e.preventDefault();
    console.log('post');
    let firstNameValue = document.getElementById('firstName').value;
    let lastNameValue = document.getElementById('lastName').value;
    let addressValue = document.getElementById('address').value;
    let cityValue = document.getElementById('city').value;
    let emailValue = document.getElementById('email').value;
    console.log(firstNameValue,lastNameValue, addressValue, cityValue, emailValue);
}

function productRecupId() {
    let idProducts = [];//Construction d'un array depuis le local storage
    //pour chaque produit on push dans le tableau idproducts
    let cart = getCart();
    for (let i = 0; i < cart.length; i++) {
        idProducts.push(cart[i].id);
    }
    return idProducts;
}
//-----------------------------------------------Gestion du formulaire-----------------------------------------------------//
//fonction validerformulaire 

function formValidate() {
//on recupere d'abord des coordonnées (id) du formulaire client 
let firstNameValue = document.getElementById('firstName').value;
let lastNameValue = document.getElementById('lastName').value;
let addressValue = document.getElementById('address').value;
let cityValue = document.getElementById('city').value;
let emailValue = document.getElementById('email').value;

//declaration Regex :*Création condition pour véririfer que toutes les entrées du formulaire sont remplies*
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'); //création de la regexp pour valider email
let addressRegExp = new RegExp('^[a-zA-Z0-9-éè ]{3,80}$'); //création de la regexp pour valider l'adresse
let cityRegExp = new RegExp('^[a-zA-Z]{2,30}$');//création de la regexp pour valider la ville



//gestion Validation des conditions d'entrées du formulaire 

if (emailRegExp.test(emailValue) === false)//si le mail n'est valide
  {
    document.getElementById("emailErrorMsg").textContent =
    "veuillez saisir une adresse mail correcte";
    return false ; 
  }
if (firstNameValue ==='')//si le mail n'est valide
{
    document.getElementById("firstNameErrorMsg").textContent =
    "veuillez saisir un nom correct";  
    return false; 
}
if (lastNameValue ==='')//si le mail n'est valide
{
    document.getElementById("lastNameErrorMsg").textContent =
    "veuillez saisir un prénom correct";
    return false;
}
if (addressRegExp.test(addressValue) === false)//si le mail n'est valide
{
    document.getElementById("addressErrorMsg").textContent =
    "veuillez saisir une adresse correcte";
    return false;
}
if (cityRegExp.test(cityValue)=== false)//si le mail n'est valide
{
    document.getElementById("cityErrorMsg").textContent =
    "veuillez saisir un nom de ville correcte";
    return false;
}
  return true;
}

//-----Gestion du bouton commander----//

//Envoie du formulaire (informations client au localstorage)  au clic du bouton commander

//Séléction du bouton 
let order = document.getElementById('order');

    order.addEventListener('click', (event) => {   //AddEventListener pour commander
    event.preventDefault();
    if (formValidate() === false){
      return;
      
    }

//Si tous les éléments du formulaire sont  OK 
//on Recup ID des produits du panier 
//avec la fonction
       
//déclaration d'une variable contenant les ID
        let productIDs = productRecupId();

//je mets les valeurs du formulaire et les produits sélectionnés dans un objet.

//création de l'objet commande (contenant les infos du client et  id des produits commandés)
        let order = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: productIDs,
        };

// Ensuite j'envoie le formulaire que j'envoie au serveur

// Création de l'entête de la requête  POST des informations du formulaire pour envoyer la commande
        let options = {
            method: "POST",//Envoie par requête POST
            body: JSON.stringify(order),
            headers: { "Content-Type": "application/json" },
        };
        console.log(options);
        fetch("http://localhost:3000/api/products/order", options)
     //récupération de la réponse
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                localStorage.clear();
                let orderId = data.orderId;
                //localStorage.setItem("order", JSON.stringify(orderId));//stockage de la réponse et redirectioon vers la page de confirmation de la commande
                // document.location.href = `confirmation.html`;
                window.location.assign(`confirmation.html?orderId=${orderId}`);
            });
    }
);
