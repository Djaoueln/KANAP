
 export class localStorageCart {

        constructor(){
            let cart = localStorage.getItem("cart");
        if(!cart)
            {
                this.cart = { products:[]};
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
                exsitingProduct.quantity += Number(quantity.value);
                console.log("Le produit existe déjà !");
                console.log("quantity", exsitingProduct)
                
            } else {
                item.quantity = Number(quantity.value);
                this.cart.products.push(item);
                console.log("Le produit n'existe pas !");
            }
            this.save()
        }
      
    delete(itemId, itemColor)
        {
            const isItemInCart = this.cart.products.findIndex(p => (p.color == itemColor) && (p.id == itemId));
            console.log("index", isItemInCart)
            if(isItemInCart >= 0) {
                this.cart.products.splice(isItemInCart, 1);
                // this.cart.totalPrice -= Number(item.price);
            }

            this.save();
            console.log("Le produit a été supprimé !");
        }

    updateQuantity(itemColor, itemId, quantity)
        {
            const isItemInCart = this.cart.products.findIndex(p => (p.color == itemColor) && (p.id == itemId));
                if (isItemInCart != undefined){
                    const item = this.cart.products[isItemInCart];
                    item.quantity = Number(quantity);
                    if(item.quantity <= 0){
                    this.delete(isItemInCart);
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






















