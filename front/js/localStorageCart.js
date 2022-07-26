
 export class Cart {

        constructor(){
            let cart = localStorage.getItem("cart");

        if(!cart)
            {
                this.cart = [];
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
        // Je check dans le tableau cart, si le produit existe déjà, son id et sa couleur
        const isItemInCart = this.cart.findIndex(p => (p.color == item.color) && (p.id == item.id));

        // Si le produit existe déjà dans le tableau car
        if(isItemInCart >= 0) { 

            const exsitingProduct = this.cart[isItemInCart];
            exsitingProduct.quantity += 1;
            console.log("Le produit existe déjà !");

        // SINON je push le produit dans le tableau car
        } else {

            item.quantity = 1;
            this.cart.push(item);
            console.log("Le produit n'existe pas !");
            
        }

        // Je push le produit dans le localstorage
        this.save()


    
    }
      
    remove(item)
    {
        this.cart.findIndex(p => (p.color == item.color) && (p.id == item.id));
        this.save();
    }
    
    changeQuantity(item, quantity)
    {
        const isItemInCart = this.cart.findIndex(p => (p.color == item.color) && (p.id == item.id));
      
            if (isItemInCart >= 0){
                isItemInCart.quantity += quantity;
                if(isItemInCart.quantity <= 0){
                this.remove(item)
                }
            
            else {
                this.save();
            }
        }
    }
    getNumberProduct()
    {

        let number = 0;
        for(let item of this.cart){
            number += item.quantity;
        }
        return number;
    }
    getTotalPrice() 
       {
         let total = 0.
          for ( let item of this.cart)
            {
                total += item.quantity * item.price
            }
         return number;
       }
}


//      const isItemInCart = (item, id, colors) =>  (item.id = id) && (item.colors = colors);

    //      const index = this.cart.findIndex(isItemInCart);

    //     if (item != undefined) /
    //           {
    //         item.quantity++; 
    //           }
    //     else {
    //       item.quantity = 1;
    //       this.cart.push(item);
    //     }

    //   this.save();


