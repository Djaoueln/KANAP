import { localStorageCart } from './localStorageCart.js'

//Retrieve the id from the url
let str = window.location.href;
let url = new URL(str);
let search_params = new URLSearchParams(url.search); 
if(search_params.has('id')) {
 // Retrieve the id
  let id = search_params.get('id');
  // Retrieve data (products) from the API
  fetch (`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((resp) => addProducts(resp))
}

         /* Display the product page from the data of the api(kanap) */

function addProducts(kanap)
{  
   const {imageUrl, altTxt, colors,} = kanap;
   setImage(imageUrl, altTxt);
   setInfo (kanap);
   setColors (colors);
}

          /* Display image from url of image and image text description */

function setImage(imageUrl, altTxt)
{
 // Retrieve the div that will contain the image
 const img = document.createElement("img");
 img.src = imageUrl
 img.alt = altTxt
 // Add the image
 document.getElementsByClassName("item__img")[0].appendChild(img);
}

          /* select colors from an array of colors */

function setColors (colors)
{
  // Retrieve the div that will contain the colors for each color
  colors.forEach((color) => 
  {
    // create the div that will contain the colors
    const option = document.createElement("option")
    const select = document.getElementById("colors");
    // Add the color(value) in the div
    option.value = color
    option.textContent = color
    select.appendChild(option) 
  })
}

         /* View information for a given product */

function setInfo (product)
{  
  // Retrieve the div that will contain the information
   document.getElementById("title").innerText = product.name;
   document.getElementById("price").innerText = product.price + " ";
   document.getElementById("description").innerText = product.description;
}

// Retrieve the button //
addToCart.onclick = () => 
{
   let myCart = new localStorageCart()
   // Retrieve values //
   const item = 
    {
      color: colors.value,
      quantity: Number(quantity.value),
      id: search_params.get('id'),  
    }
   // Add the item to the cart //
   myCart.add(item)
}
