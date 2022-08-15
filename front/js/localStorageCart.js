
 export class Cart {

        constructor(){
            let cart = localStorage.getItem("cart");

        if(!cart)
            {
                this.cart = { products: [], totalPrice: 0 };

            }
        else
            {
            
            this.cart = JSON.parse(cart)

            }
        }
      
    save()
        {
            localStorage.setItem("cart", JSON.stringify(this.cart)); 
        }
             
    add(item) 
        {
            const isItemInCart = this.cart.products.findIndex(p => (p.color == item.color) && (p.id == item.id));

            if(isItemInCart >= 0) { 

                const exsitingProduct = this.cart.products[isItemInCart];
                exsitingProduct.quantity += 1;
                console.log("Le produit existe déjà !");

            } else {
                item.quantity = 1;
                this.cart.products.push(item);
                console.log("Le produit n'existe pas !");
            }

            //j'additionne simplement le prix des canapés et je stock le résultat dans "totalPrice"
            this.cart.totalPrice += Number(item.price);

            this.save()
        }
      
    delete(item)
        {
            this.cart = this.cart.filter(p => p.id == item.id && p.color == item.color);
            this.save();
            console.log("Le produit a été supprimé !");
        }
    deleteProduct(){

    }
        
    updateQuantity(item, quantity)
        {
           
            const isItemInCart = (item, id, colors) =>  (item.id = id) && (item.colors = colors);
            const index = this.cart.findIndex(isItemInCart);
            
                if (index != undefined){
                    item.quantity += quantity;
                    if(index.quantity <= 0){
                    this.delete(index);
                    }
                
                else {
                    this.save();
                }
            }
        }
    getNumberProduct()
        {

            const number = 0;
            for(let item of this.cart){
                number += item.quantity;
            }
            return number;
        }
 }




















 
  /**
   * Exemple de ce qui y a dans l'object "cart" qui se trouve dans le localstorage
   * 
   * Pour pouvoir y accéder => this.cart.products puis faire un loop pour accéder à color, quantity, price, name, etc ...
   * Pour accéder au prix total => this.cart.totalPrice
   */
//   {
//     products: [
//         {
//             color: "pink",
//             quantity: 1,
//             id: "034707184e8e4eefb46400b5a3774b5f",
//             price: 1999,
//             name: "Kanap Thyoné",
//             imageUrl: "http://localhost:3000/images/kanap07.jpeg",
//             altTxt: "Photo d'un canapé rouge, deux places"

//         },
//         {
//             color: "red",
//             quantity: 10,
//             id: "5558f5fg2gf5d4fg5f1d22226a3774b5f",
//             price: 155,
//             name: "Kanap en cuir",
//             imageUrl: "http://localhost:3000/images/kanap06.jpeg",
//             altTxt: "Photo d'un canapé rouge, deux places"
//         },
//         {
//             etc...
//         },
//         {
//             etc...
//         }
//     ],

//     totalPrice: 9985 
//   }
  
  

