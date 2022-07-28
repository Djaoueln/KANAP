async function getProductById(id){
const resp = await fetch (`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((json) => {const article = json
    console.log("aa", article)
return article
  })
return resp
}


/**
 *  récupèreration des produits qui sont dans le localstorage
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
 * d'affichage du prix total dans le html de la page cart
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
       const art =  getProductById(resp.products[i].id)
       console.log("art", art);
        items.innerHTML += htmlProductCart (art);
    }
    

 }

function htmlProductCart(article) {
    let htlmCart = '<article class="cart__item" data-id="' +article.id+ '" data-color="' +article.color+ '">';
        htlmCart += '<div class="cart__item__img">';   
        htlmCart +=  '<img src="' +article.imageUrl+'" alt="' +article.altTxt+ '"></div>';
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