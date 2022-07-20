//Récupération de l'id depuis l'url
let str = window.location.href;
let url = new URL(str);
let search_params = new URLSearchParams(url.search); 
if(search_params.has('id')) {
  let id = search_params.get('id');
  fetch (`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((resp) => addProducts(resp))
}


  


// Affichage du produit
function addProducts(kanap)
{  
  const {imageUrl, altTxt, colors} = kanap;
   setImage(imageUrl, altTxt);
   setInfo (kanap);
   setColors (colors);
}


function setImage(imageUrl, altTxt)
{
 const img = document.createElement("img");
 img.src = imageUrl
 img.alt = altTxt
 document.getElementsByClassName("item__img")[0].appendChild(img);
}

function setColors (colors)
{
  colors.forEach((color) => 
  {
    const option = document.createElement("option")
    const select = document.getElementById("colors");

    option.value = color
    option.textContent = color
    
    select.appendChild(option) 
  })
}

function setInfo (product)
{
   document.getElementById("title").innerText = product.name;
   document.getElementById("price").innerText = product.price + " ";
   document.getElementById("description").innerText = product.description;
}


































// //...........................localStorage
// // récupération du localStorage

// addToCart.onclick = () =>
// {const cart = 
//   {
//     color: colors.value,
//     quantity: Number(quantity.value),
//     id: search_params.get('id'),
   
          
//   }
//   localStorage.setItem("cart", JSON.stringify(cart));
// }
// function getCart(){
//   const local = JSON.parse(localStorage.getItem("cart"));
// return local
// }
// function addCart(item){
//   const cart = getcart();
//   const IsItemInCart = (item, id, colors) =>  (item.id = id) && (item.colors = colors);
//   const index = cart.findIndex(IsItemInCart)
//   if (index != undefined){
//       index.quantity++;
//   }else {
//     item.quantity = 1
//     cart.push(item);

//   }
//   setCart(cart);
// }
// function revomeCart(item)
// {
//   const cart = getCart();
//   cart = cart.filter(p => p.id == item.id);
//   setCart(cart);
// }
// function Changequantity(item, quantity)
// {
//   const cart = getcart();
//   const IsItemInCart = (item, id, colors) =>  (item.id = id) && (item.colors = colors);
//   const index = cart.findIndex(IsItemInCart);
//   if (index != undefined){
//       item.quantity += quantity;
//       if(index.quantity <= 0){
//         revomeCart(index);
//       }
  
//   else {
//       setCart(cart);
//   }
//  }
// }

// function getNumberProduct()
// {
//   const cart = getCart();
//   const number = 0;
//   for(let item of cart){
//       number += item.quantity;
//   }
// }

// Ajout d'un article au panier

  // const local = JSON.parse(localStorage.getItem("cart"));
  // if (localStorage.getItem ("color-select", "itemQuantity", "id", "title", "price") != null);

 
    
  //     localStorage.setItem("cart", JSON.stringify(user))
  //     window.location.href ="cart.html"
  //  }
