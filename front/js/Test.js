import { Cart } from './localStorageCart.js'


const productInLocalStorage = new Cart()
// Gestion du panier vide et plein 

if(productInLocalStorage == null || productInLocalStorage.length == 0)
 {
    document.getElementById("cart__items").innerHTML += `votre panier est vide`;
 }

 else 
  {
    document.getElementById("cart__items").innerHTML += `votre panier`;
  
 
  //CREATION DES VARIABLES TABLEAUX QUI VONT CONTENIR LES QUANTITES ET PRIX DES PRODUITS

  let totalPrice = [];
  let totalQuantity = [];

 //EXTRACTION DU LOCAL STORAGE POUR CREATION DE LA FICHE PRODUIT DANS LE PANIER

for ( let i = 0; i < productInLocalStorage.length ; i += 1)
    {
        document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage[i].colors}">
                                                             <div class="cart__item__img">
                                                                 <img src="${productInLocalStorage[i].image}" alt="${productInLocalStorage[i].altTxt}">
                                                             </div>
                                                             <div class="cart__item__content">
                                                                <div class="cart__item__content__description">
                                                                    <h2>${productInLocalStorage[i].name}</h2>
                                                                    <p>${productInLocalStorage[i].colors}</p>
                                                                    <p>${productInLocalStorage[i].price * $productInLocalStorage[i].quantity}€</p>
                                                                </div>
                                                                <div class="cart__item__content__settings">
                                                                    <div class="cart__item__content__settings__quantity">
                                                                         <p>Qté : </p>
                                                                         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${productInLocalStorage[i].quantity}>
                                                                    </div>
                                                                    <div class="cart__item__content__settings__delete">
                                                                         <p class="deleteItem">Supprimer</p>
                                                                    </div>
                                                               </div>
                                                            </div>
                                                           </article> ` 
// TOTAL PANIER
    
        //VARIABLES POUR CHANGER LE TYPE EN NOMBRE
 let quantityNumber = parseInt(productInLocalStorage[i].quantity);
 let priceNumber = parseInt(productInLocalStorage[i].price * productInLocalStorage[i].quantity);

// PUSH des nombres dans les variables tableaux
 totalQuantity.push(quantityNumber);
 totalPrice.push(priceNumber);

} 
// ADDITION DES QUANTITES DES PRODUITS
 const reducer =(accumulator, currenValue) => accumulator + currenValue;
 const totalQuantityResult = totalQuantity.reduce(reducer, 0);

 // ADDITION DES PRIX DES PRODUITS
  
const totalPriceResult = totalPrice.reduce(reducer, 0);
 
document.getElementById("totalQuantity").innerHTML += `${totalQuantityResult}`;
document.getElementById("totalPrice").innerHTML += `${totalPriceResult}`;

}

// Gestion des interactions avec le formulaire

// validation de lettres 

 let firstName = document.getElementById("firstName");
 firstName.setAttribute("pattern", "[a-zA-A_éèà]*");

 let lastName = document.getElementById("lastName");
 lastName.setAttribute("pattern","[a-zA-A_éèà]*");

 let city= document.getElementById("city");
 city.setAttribute("pattern","[a-zA-A_éèà]*");

 // recupération des ID pour l'envoyer à l'API

 const getId = [productInLocalStorage].map(product=> product.id);

 // validation des champs des utilisateur et envoi des données a l'API

 const cartOrder = document.getElementById("cart__order__form__submit") 
 cartOrder && cartOrder.addEventListener("click", function(e)
 {
    e.preventDefault();
    let valid = true;
    for (let input of document.querySelectorAll(".cart__order__form__question input"))
    {
        valid &= input.reportValidity();
        if (!valid)
             {
                break;
             }
    }
    if (valid)
        {
            const result = fetch ( "http://localhost:3000/api/products",
                {
                    method : "POST",
                    headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json',
                             },
                    body: JSON.stringify
                            ({
                               contact:
                                  {
                                    firstName: document.getElementById("firstName").value,
                                    lastName: document.getElementById("lastName").value,
                                    address: document.getElementById("address").value,
                                    city: document.getElementById("city").value,
                                    email: document.getElementById("email").value
                                  },
                                  product : getId
                             })
                            
                });
                result.then(async (answer) => 
                {
                  try {
                         const data = await answer.json();
                         Window.location.href = `confirmation.html?id=${data.orderId}`;
                         localStorage.clear();
                      } catch(e) {}
                })
            
        }
 })
