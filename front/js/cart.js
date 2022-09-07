
import { localStorageCart } from './localStorageCart.js'
//* GLOBAL get item in local storage

let products = [];
    products = JSON.parse(localStorage.getItem('cart'));
// envoi des données au serveur
async function getProductById(id)
   {
    const resp = await fetch (`http://localhost:3000/api/products/${id}`)
    const json = await resp.json();
    return json
    }

/**
 Cette methode permet de récupèrer les produits qui sont dans le localstorage
 */
function getProductsCart()

{
    // Si il y a bien dans products des items
    if(products) {
        displayAllProductsCart(products).then(
           function () {
            // Gestion de la quantité
            handlerDelete(products)
            // Gestion de la suppression
            handlerQuantity(products)
          }
        );
    }
}

 //Création des article
 async function displayAllProductsCart(resp) 
 {
 
    let totalPriceProducts = 0;
     // Récupération de la div qui contiendra les articles
    let items = document.getElementById("cart__items");
    items.innerHTML = '';
    // Pour chaque article
    for( let i = 0; i < resp.products.length; i++) 
    {
        let art =  await getProductById(resp.products[i].id);
        art.color = resp.products[i].color;
        art.quantity = resp.products[i].quantity;
        items.innerHTML += htmlProductCart (art);
        // Calcul du prix total
        let price = Number(art.quantity) * Number(art.price); 
        totalPriceProducts += price;
    }
    // Affichage du prix total
    document.getElementById("totalPrice").innerText = totalPriceProducts;
 }
// affichage des produits dans le panier
function htmlProductCart(article) {
    return `<article class="cart__item" data-id="${article._id}" data-color="${article.color}">
           <div class="cart__item__img">
              <img src="${article.imageUrl}" alt="${article.altTxt}">
           </div>
           <div class="cart__item__content">
           <div class="cart__item__content__description">
              <h2>${article.name}</h2>
              <p>${article.color}</p>
              <p>${article.price}</p>
           </div>
           <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`      
}


// lance la fonction
getProductsCart();
//
function changeQuantity(event)
{
const el = event.target;
const item = el.closest(".cart__item")
const id = item.dataset.id;
console.log("id", id)
const color = item.dataset.color;
const quantity = el.closest(".itemQuantity")
const valueQuantity = quantity.value;
let myCart = new localStorageCart();
myCart.updateQuantity(color, id, valueQuantity);
// Refresh de la page Panier
 location.reload();
}
//
 async function handlerQuantity() {
   const items = document.querySelectorAll(".itemQuantity");
    items.forEach((item) => {
       item.addEventListener("change", (e) => changeQuantity(e)) 
    }
    )
}

//
function deleteItem(event)
{
const el = event.target;
const item = el.closest(".cart__item")
console.log("item", item)
console.log("el", el)
let myCart = new localStorageCart();
myCart.delete(item.dataset.id, item.dataset.color);
// Refresh de la page Panier
location.reload(); 
}



function handlerDelete ()
{
    const deleteBtn = document.querySelectorAll(".deleteItem");
    deleteBtn.forEach((btn) => {
        btn.addEventListener("click", e => deleteItem(e))
        }
    )
}


//* LOGIC SUBMIT FORM ORDER
const submitButton = document.getElementById('order');

submitButton.addEventListener('click', (e) => submitForm(e));

function submitForm(e) 
{
    e.preventDefault();
    
    if (localStorage.length === 0) {

        alert("Votre panier est vide");
        
        return;
    }

    if (validationForm()) return;

    if (confirmationEmail()) return;

    // const body = makeRequestBody();

    fetch('http://localhost:3000/api/products/order', 
    {
        method: 'POST',
        body: JSON.stringify({
            contact: {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value
                },
            products : getProductIdFromLocalStorage()
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then((res) => res.json())
    .then((resp) => 
    {
         const orderId = resp.orderId;
        
        localStorage.setItem("orderId", orderId);
        window.location.href = "confirmation.html" + "?orderId=" + orderId;
    })
    .catch((err) => console.log(err))    
        
}

// validation
function validationForm()
{
    const form = document.querySelector(".cart__order__form");

    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => 
    { 
        if (input.value === "") 
        {
            alert("Veuillez remplir tous les champs");

            return true;
        }

        return false;

    });
}  

function confirmationEmail() {

    const email = document.querySelector("#email").value;

    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/

    if (regex.test(email) === false) {

        alert("Veuillez entrer un email valide");

        return true;

    }

    return false;

} 

// Ne sert plus à rien vu que j'envoi directement les informations dans la requête api/order
function makeRequestBody() {

    // const form = document.querySelector(".cart__order__form");
    // const firtName = form.elements.firstName.value;
    // const lastName = form.elements.lastName.value;
    // const address  = form.elements.address.value;
    // const city = form.elements.city.value;
    // const email = form.elements.email.value;

    let firtName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('email');

    const body = 
    { 
        contact: 
        {
            firtName: firtName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        },
        products: getProductIdFromLocalStorage()
          
    }

    return body;

}


function getProductIdFromLocalStorage()
{
    const numberOfProducts = localStorage.length;

    const ids = [];

    for (let i = 0; i < numberOfProducts; i++) {

        // const key = localStorage.key(i);
        // const id = key.split('_')[0];
        // ids.push(id);

        ids.push(products.products[i].id);

    }
    console.log ("product id", ids)

    return ids;
}