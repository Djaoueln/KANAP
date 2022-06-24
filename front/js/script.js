fetch ( "http://localhost:3000/api/products")
   .then ((res) => res.json ())
   .then ((resp) => addProducts(resp))

function addProducts(resp) {

for(i = 0; i<8;i++) {resp[i].name}
const products =document.createElement("a")
products.href = "http://localhost:3000/images/kanap01.jpeg"
products.text = "Kanap Sinopé"
const items = document.querySelector ("#items")
if (items != null) {
   items.appendChild (products)
}