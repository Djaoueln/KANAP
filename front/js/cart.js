
async function getProductById(id){
    const resp = await fetch (`http://localhost:3000/api/products/${id}`)
    const json = await resp.json();
    return json
    }
/**
 Cette methode permet de récupèrer les produits qui sont dans le localstorage
 */
function getProductsCart()

{
    let products = [];
    products = JSON.parse(localStorage.getItem('cart'));
    // Si il y a bien dans products des items
    if(products) {
        displayAllProductsCart(products);
        // products.totalPrice est le prix total des canapés 
        setTotalPrice(products.totalPrice);
       
        
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
 async function displayAllProductsCart(resp) 
 {
    let items = document.getElementById("cart__items");
    items.innerHTML = '';
    for( let i = 0; i < resp.products.length; i++) 
    {
        let art =  await getProductById(resp.products[i].id);
        art.color = resp.products[i].color;
        art.quantity = resp.products[i].quantity;
        items.innerHTML += htmlProductCart (art);
        setTotalPrice(art.price)
    }
 }

function htmlProductCart(article) {
    let htlmCart = '<article class="cart__item" data-id="' +article.id+ '" data-color="' +article.color+ '">';
        htlmCart += '<div class="cart__item__img">';   
        htlmCart +=  '<img src="'+article.imageUrl+'" alt="' +article.altTxt+ '"></div>';
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

const submitButton = document.getElementById('order');
submitButton.addEventListener('click', (e) => submitForm(e));

function submitForm(e) {
        e.preventDefault();
      
        if (localStorage.length === 0) {
            alert("Votre panier est vide");
            return
        }
        if (inValidateForm()) return;
        if (emailValidation()) return;


        const body = makeRequestBody();
        fetch('http://localhost:3000/api/products/order', 
             {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'

                }})
                
                .then((res) => res.json())
                .then((resp) => 
                { 
                    const orderId = resp.orderId;
                    window.location.href = "confirmation.html" + "?orderId=" + orderId;
                    return console.log(resp)
                })
                .catch((err) => console.log(err))


                    
                

                
    }
     // validation
function inValidateForm()
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
                }
            )
        }  
function emailValidation() {
    const email = document.querySelector("#email").value;
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
  if (regex.test(email) === false) {
    alert("Veuillez entrer un email valide");
    return true;
  }
  return false;
} 

function makeRequestBody() {
    const form = document.querySelector(".cart__order__form");
    const firtName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const address  = form.elements.address.value;
    const city = form.elements.city.value;
    const email = form.elements.email.value;
    const body = 
      { 
       contact: 
         {
            firtName: firtName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
         },
    products: getIdsFromCache()
          
      }
    console.log("sdg", body);  
    return body;
}

function getIdsFromCache()
       {
         const numberOfProducts = localStorage.length;
         const ids = [];
            for (let i = 0; i < numberOfProducts; i++) {
                const key = localStorage.key(i);
                const id = key.split('_')[0];
                ids.push(id);
            }
            return ids;
       }
// lance la fonction
getProductsCart();