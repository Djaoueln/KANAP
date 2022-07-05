var str = window.location.href;
var url = new URL(str);
var search_params = new URLSearchParams(url.search); 
if(search_params.has('id')) {
  var id = search_params.get('id');
}

for (let p of search_params) 
  {
  }
  
fetch (`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((resp) => addProducts(resp))


function addProducts(kanap){
  const {imageUrl, altTxt, colors} = kanap
   image(imageUrl, altTxt)
   document.getElementById("title").innerText = kanap.name;
   document.getElementById("price").innerText = kanap.price + " ";
   document.getElementById("description").innerText = kanap.description;

   colors.forEach((color) => {
    const option = document.createElement("option")
    const select = document.getElementById("colors");

    option.value = color
    option.textContent = color
    
    select.appendChild(option)
   });
}

function image(imageUrl, altTxt ){
 const img = document.createElement("img");
 img.src = imageUrl
 img.alt = altTxt
 document.getElementsByClassName("item__img")[0].appendChild(img);
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

