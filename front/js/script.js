fetch ( "http://localhost:3000/api/products")
   .then ((res) => res.json ())
   .then ((resp) => console.log (resp))


const products =document.createElement("a")
products.href = "http://localhost:3000/images/kanap01.jpeg"
products.text = "Kanap Sinopé"