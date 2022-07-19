fetch ( "http://localhost:3000/api/products")
   .then((res) => res.json())
   .then((resp) => console.log(resp))



function htmlProductCart(article) {
  let htlmCart = '<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">';
  htlmCart += '<div class="cart__item__img">';   
  htlmCart +=  '<img src="'+article.imageUrl+'" alt="' +article.altTxt+ '"></div>';
htlmCart += '<div class="cart__item__content">';
htlmCart += '<div class="cart__item__content__description">';
htlmCart +=  '<h2>' +article.name+ '</h2>';
htlmCart += '<p>' +article.colors+ '</p>';
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