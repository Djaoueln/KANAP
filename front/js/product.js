let str = window.location.href;
let url = new URL(str);
let search_params = new URLSearchParams(url.search); 
if(search_params.has('id')) {
  let id = search_params.get('id');
  fetch (`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((resp) => addProducts(resp))
}

  



function addProducts(kanap){
  const {imageUrl, altTxt, colors} = kanap;
   setImage(imageUrl, altTxt);
   setInfo (kanap);
   setColors (colors);

}

function setImage(imageUrl, altTxt){
 const img = document.createElement("img");
 img.src = imageUrl
 img.alt = altTxt
 document.getElementsByClassName("item__img")[0].appendChild(img);
}

function setColors (colors)
{
  colors.forEach((color) => {
    const option = document.createElement("option")
    const select = document.getElementById("colors");

    option.value = color
    option.textContent = color
    
    select.appendChild(option)
   });
}
function setInfo (product)
{
   document.getElementById("title").innerText = product.name;
   document.getElementById("price").innerText = product.price + " ";
   document.getElementById("description").innerText = product.description;
}










// function colorProduct(colors){
//    colors.forEach((color) => {
//     const option = document.createElement("option")
//     const select = document.getElementById("colors");
//     console.log(option)
//     option.value = color
//     option.textContent = color
//     select.appendChild(option)
//    });
// } 

