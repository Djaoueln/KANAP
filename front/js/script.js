        /* retrieve data from the api */
        
fetch ( "http://localhost:3000/api/products")
   .then((res) => res.json())
   .then((resp) => displayAllProducts(resp))

         /* Create articles */

function displayAllProducts(resp) 
    {
      // Retrieve the div that will contain the articles
      let items = document.getElementById("items");
      items.innerHTML = '';  
      // For each item
      for( let i = 0; i<resp.length;i++) 
      {
      // Retrieve item data
      items.innerHTML += htmlProduct (resp[i]);
      }
   }

         /* create the html of the index page */

function htmlProduct(article) 
 {
   return `<a href="./product.html?id=${article._id}">
   <article>
     <img src="${article.imageUrl}" alt="${article.altTxt}">
     <h3 class="productName">${article.name}</h3>
     <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
   </article>
 </a>`
 }
