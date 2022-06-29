fetch ( "http://localhost:3000/api/products")
   .then((res) => res.json())
   .then((resp) =>  displayAllProducts(resp))
  

function displayAllProducts(resp) {
   for(i = 0; i<8;i++) {
   const {_id, imageUrl, altTxt, name, description} = resp[i]
   
   const products = makeProducts(_id)
   const article = document.createElement("article")
   const image = makeImage(imageUrl, altTxt)
   const h3 = makeH3(name)
   const p = makeParagraph(description)
   
   ElementsToArticle(article, image, h3, p)
   ArticleProducts(products, article)
   }
}
function ElementsToArticle(article, image, h3, p){
   article.appendChild(image)
   article.appendChild(h3)
   article.appendChild(p)
}

function makeProducts(id) {
const products =document.createElement("a")
products.href = "./product.html?id=" + id
return products
}
function ArticleProducts(products, article) {
   const items = document.querySelector ("#items")
   if (items != null) {
      items.appendChild(products)
      products.appendChild(article)
}}
function makeImage(imageUrl, altTxt) {
   const image = document.createElement("img")
   image.src = imageUrl
   image.alt = altTxt
   return image
}

function makeH3(name) {
const h3 = document.createElement("h3")
h3.textContent = name
h3.classList.add("productName")
return h3
}

function makeParagraph(description) {
const p = document.createElement("p")
p.textContent = description
p.classList.add("productDescription")
return p
}

