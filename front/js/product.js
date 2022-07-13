

let str = window.location.href;
let url = new URL(str);
let search_params = new URLSearchParams(url.search); 
if(search_params.has('id')) {
  let id = search_params.get('id');
  fetch (`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((resp) => addProducts(resp))
}


  



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


const local = JSON.parse(localStorage.getItem("user"));
if (localStorage.getItem ("color-select", "itemQuantity", "id", "title", "price") != null);

addToCart.onclick = () =>
 {
  const user = 
    {
      color: colors.value,
      quantity: Number(quantity.value),
    }
    localStorage.setItem("choice", JSON.stringify(user))
    // window.location.href ="cart.html"
 }





// const button = document.getElementById("addToCart")
// button.addEventListener("click", (e) =>{
//  const colors = document.getElementById("colors").value
//  const quantity = document.getElementById("quantity").value
//  const data = {
//   id: id,
//   color: colors,
//   quantity : Number(quantity),
//  }
//  localStorage.setItem(id, JSON.stringify (data))
//  window.location.href ="cart.html"
// })