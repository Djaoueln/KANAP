// récupération des données de l'api
fetch ( "http://localhost:3000/api/products")
   .then((res) => res.json())
   .then((resp) => displayAllProducts(resp))

 
function displayAllProducts(resp) 
   {
      let items = document.getElementById("items");
      items.innerHTML = '';  
      for( let i = 0; i<resp.length;i++) 
      {
      items.innerHTML += htmlProduct (resp[i]);
      }
   }

// création du htlm de la page index
function htmlProduct(article) 
 {
    let htlmA = '<a href="./product.html?id=' +article._id+ '">';
    htlmA += '<article>';
    htlmA +='<img src=" '+article.imageUrl+' " alt="' +article.altTxt+ '">';
    htlmA += '<h3 class="productName">' +article.name+ '</h3>';
    htlmA += '<p class="productDescription">' +article.description+ '</p>'; 
    htlmA += '</article>'; 
    htlmA += '</a>';
    return htlmA;
 }
