const sectionHtml = document.getElementById("cart__items");
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
   for (let i = 0; i < resp.products.length; i++) {
    let id = resp.products[i].id;
    let color = resp.products[i].color;
    fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(data => { sectionHtml.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
    <div class="cart__item__img">
      <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${data.name}</h2>
        <p>${color}</p>
        <p>${data.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${id}', '${color}', this.value)" min="1" max="100" value="${items[i][2]}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" onclick="deleteItem('${id}','${color}')">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
// total price (if qty (items[i][2]))
price += data.price * items[i][2];
document.getElementById("totalPrice").innerHTML = price;
});

   }
    
 }