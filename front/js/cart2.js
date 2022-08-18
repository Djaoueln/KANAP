import { Cart } from './localStorageCart.js'

/**
 *  Cette methode permet de récupèrer les produits qui sont dans le localstorage
 */
function getProductsCart()
{
    let products = [];

    products = JSON.parse(localStorage.getItem('cart'));

    // Si il y a bien dans products des items
    if(products) {

        displayAllProductsCart(products);

        // products.totalPrice est le prix total des canapés 
        setTotalPrice(products.totalPrice)

    }
}

/**
 * Cette methode permet d'afficher le prix total dans le html de la page cart
 */
function setTotalPrice(totalPrice)
{
    document.getElementById("totalPrice").innerText = totalPrice;
}

 //Création des article
 function displayAllProductsCart(resp) 
 {
    let items = document.getElementById("cart__items");

    items.innerHTML = '';

    for( let i = 0; i < resp.products.length; i++) 
    {
        items.innerHTML += htmlProductCart (resp.products[i]);
    }
    

 }

function htmlProductCart(article) {
    let htlmCart = '<article class="cart__item" data-id="' +article.id+ '" data-color="' +article.imageUrl+ '">';
        htlmCart += '<div class="cart__item__img">';   
        htlmCart +=  '<img src="' +article.imageUrl+ '" alt="' +article.altTxt+ '"></div>';
        htlmCart += '<div class="cart__item__content">';
        htlmCart += '<div class="cart__item__content__description">';
        htlmCart +=  '<h2>' +article.name+ '</h2>';
        htlmCart += '<p>' +article.color+ '</p>';
        htlmCart += '<p>'+article.price+'€</p>';
        htlmCart +=  '</div>';
        htlmCart += '<div class="cart__item__content__settings">';
        htlmCart += '<div class="cart__item__content__settings__quantity">';
        htlmCart +=  '<p>Qté : </p>';
        htlmCart +=  '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="' +article.quantity+ '">';
        htlmCart +=  '</div>';
        htlmCart +=  '<div class="cart__item__content__settings__delete">';
        htlmCart += '<p class="deleteItem">Supprimer</p>';
        htlmCart +=  '</div>';
        htlmCart +=  '</div>';
        htlmCart += '</div>';
        htlmCart += '</article>';
        
    return htlmCart
}


// lance la fonction
getProductsCart();

// suprimé un article du panier

const btnDelete= document.querySelectorAll('.deleteItem');
console.log(btnDelete);
btnDelete.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let id = e.target.parentNode.parentNode.parentNode.dataset.id;
        let color = e.target.parentNode.parentNode.parentNode.dataset.color;
        let quantity = e.target.parentNode.parentNode.querySelector('.itemQuantity').value;
        let cart = new Cart();
        cart.deleteItems(id, color, quantity);
        console.log(id, color, quantity);
        getProductsCart();
    } )
} )

