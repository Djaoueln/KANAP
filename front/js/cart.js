import { localStorageCart } from './localStorageCart.js'

//* global get item in local storage
let products = [];
    products = JSON.parse(localStorage.getItem('cart'));

//* send data(product) to server */  
async function getProductById(id)
   {
    const resp = await fetch (`http://localhost:3000/api/products/${id}`)
    const json = await resp.json();
    return json
    }

/** This method allows you to retrieve the products that are in the localstorage **/

function getProductsCart()

{
    // If there are items in products
    if(products) {
        displayAllProductsCart(products).then(
           function () {
            // Deletion management
            handlerDelete(products)
            // Quantity management
            handlerQuantity(products)
          }
        );
    }
}

       /* Creation of articles from data (products) */

 async function displayAllProductsCart(resp) 
 {
    let totalArticleProducts = 0;
    let totalPriceProducts = 0;
     // Retrieving the div that will contain the articles
    let items = document.getElementById("cart__items");
    items.innerHTML = '';
    // For each item
    for( let i = 0; i < resp.products.length; i++) 
    {
        // Article data retrieval
        let art =  await getProductById(resp.products[i].id);
        art.color = resp.products[i].color;
        art.quantity = resp.products[i].quantity;
        items.innerHTML += htmlProductCart (art);
        // Total price calculation
        let price = Number(art.quantity) * Number(art.price); 
        // Adding the total price
        totalPriceProducts += price;
        // Adding the total quantity
        let TotalArticles = Number(art.quantity);
        totalArticleProducts += TotalArticles
    }
    // Total price display
    document.getElementById("totalPrice").innerText = totalPriceProducts;
    // Total number of articles display
    document.getElementById("totalQuantity").innerText = totalArticleProducts;
 }

         /* Display of products in the shopping cart */
         
function htmlProductCart(article) {
    // Creating the div that will contain the article
    return `<article class="cart__item" data-id="${article._id}" data-color="${article.color}">
           <div class="cart__item__img">
              <img src="${article.imageUrl}" alt="${article.altTxt}">
           </div>
           <div class="cart__item__content">
           <div class="cart__item__content__description">
              <h2>${article.name}</h2>
              <p>${article.color}</p>
              <p>${article.price} €</p>
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

// launch function
getProductsCart();

/** This method allows you to change the amount **/

// quantity change
function changeQuantity(event)
{
const el = event.target;
const item = el.closest(".cart__item")
const id = item.dataset.id;
const color = item.dataset.color;
const quantity = el.closest(".itemQuantity")
const valueQuantity = quantity.value;
// Updating localstorage
let myCart = new localStorageCart();
// Change in quantity
myCart.updateQuantity(color, id, valueQuantity);
// Refresh of the Cart page
 location.reload();
}

// it allows you to change the quantity of each item per click
 function handlerQuantity() {
   const items = document.querySelectorAll(".itemQuantity");
    items.forEach((item) => {
       item.addEventListener("change", (e) => changeQuantity(e)) 
    }
    )
}

         /** removing an item from the basket **/  

function deleteItem(event)
{
const el = event.target;
const item = el.closest(".cart__item")
let myCart = new localStorageCart();
// Deletion of article
myCart.delete(item.dataset.id, item.dataset.color);
// Refresh of the Cart page
location.reload(); 
}


// allows you to manage the deletion of an article
function handlerDelete ()
{
    const deleteBtn = document.querySelectorAll(".deleteItem");
    deleteBtn.forEach((btn) => {
        btn.addEventListener("click", e => deleteItem(e))
        }
    )
}

/** This method allows you to validate the form and place the order **/

//* Logic submit form order
const submitButton = document.getElementById('order');
submitButton.addEventListener('click', (e) => submitForm(e));

function submitForm(e) 
{ 
    e.preventDefault();
    // If the basket is not empty
    if (localStorage.length === 0) {
        alert("Votre panier est vide");
        return;
    }
    // Form validation
    if (validationForm()) return;
    if (confirmationEmail()) return;

    fetch('http://localhost:3000/api/products/order', 
    {
        // Sending data in POST
        method: 'POST',
        body: JSON.stringify({
            // Retrieving form data
            contact: {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value
                },
                // Retrieval of products from the basket
            products : getProductIdFromLocalStorage()
        }),
        // Send data in JSON
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    // Retrieving the response from the server
    .then((res) => res.json())
    .then((resp) => 
    {
        // Sending server response to localstorage
         const orderId = resp.orderId; 
         localStorage.setItem("orderId", orderId);
         window.location.href = "confirmation.html" + "?orderId=" + orderId;
    })
    // Error management
    .catch((err) => console.log(err))       
}

// form validation
function validationForm()
{
    const form = document.querySelector(".cart__order__form");
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => 
    { // If a field is empty
        if (input.value === "") 
        {
            alert("Veuillez remplir tous les champs");
            return true;
        }
        return false;
    });
} 

// validate the email
function confirmationEmail() 
  {
    // Retrieve email
    const email = document.querySelector("#email").value;
    // Regular expression
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   // If the email does not match the regular expression
    if (regex.test(email) === false) {
        alert("Veuillez entrer un email valide");
        return true;
    }
    return false;
 }

// Retrieve the id of the products in the basket
function getProductIdFromLocalStorage()
{
    // Retrieve localstorage keys
    const numberOfProducts = localStorage.length;
    const ids = [];
    // For each key
    for (let i = 0; i < numberOfProducts; i++) 
    {
    // Retrieve the key
     ids.push(products.products[i].id);
    }
    // Return keys
    return ids;
}