fetch ( "http://localhost:3000/api/products")
   .then((res) => res.json())
   .then((resp) => {
      console.log(resp)
      return displayAllProducts(resp)
   })
  

function displayAllProducts(resp) {
   const id = resp[0]._id
   const imageUrl = resp[0].imageUrl
   const altTxt = resp[0].altTxt
   const image = makeImage(imageUrl, altTxt)
   
   const products = makeProducts(id)
   const article = makeArticle()
   article.appendChild(image)
   appendChildren(products, article)
}


function makeProducts(id) {
   const products =document.createElement("a")
products.href = "./product.html?id=" + id
return products
}
function appendChildren(products, article) {
   const items = document.querySelector ("#items")
   if (items != null) {
      items.appendChild(products)
      items.appendChild(article)
}
}
function makeImage(imageUrl, altTxt) {
   const image = document.createElement("img")
   image.src = imageUrl
   image.alt = altTxt
   return image
}
function makeArticle() {
const article = document.createElement("article")
const image =makeImage()
const h3 =makeH3()
const paragraph = makeParagraph()
article.appendChild(image)
article.appendChild(h3)
article.appendChild(paragraph)
console.log(article)
return article
}

function makeH3() {

}

function makeParagraph() {

}

for(i = 0; i<8;i++) {resp[i].name}