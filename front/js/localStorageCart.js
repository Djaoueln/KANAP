
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

    // save the product in the local storage //
    save()
        {
            localStorage.setItem("cart", JSON.stringify(this.cart)); 
        }

    // add product to cart //
    add(item) 
        {
            const isItemInCart = this.cart.products.findIndex(p => (p.color == item.color) && (p.id == item.id));
            if(isItemInCart >= 0) 
               {
                 // if the product is already in the basket, we increase its quantity
                const exsitingProduct = this.cart.products[isItemInCart];
                exsitingProduct.quantity += Number(quantity.value);
                console.log("Le produit existe déjà !");
               } 
            // otherwise we add the product to the basket
            else 
               { 
                 if (quantity.value > 0)
                    {
                        this.cart.products.push(item);
                        console.log("Le produit a été ajouté !");
                    }
                console.log("Le produit n'existe pas !");
               }
               // we save the basket
            this.save()
        }

      // remove a product from the basket based on its id (itemId) and its color (itemColor)
    delete(itemId, itemColor)
        {
            const isItemInCart = this.cart.products.findIndex(p => (p.color == itemColor) && (p.id == itemId));
            if(isItemInCart >= 0) 
                {
                  this.cart.products.splice(isItemInCart, 1);
                }
            this.save();
            console.log("Le produit a été supprimé !");
        }

        /* modify the quantity of a product in the basket from its id (itemId), its color (itemColor) and the quantity (quantity) wanted*/
    updateQuantity(itemColor, itemId, quantity)
        {
            const isItemInCart = this.cart.products.findIndex(p => (p.color == itemColor) && (p.id == itemId));
                if (isItemInCart != undefined)
                    { 
                    // if the quantity is greater than 0, the quantity is modified
                    const item = this.cart.products[isItemInCart];
                    item.quantity = Number(quantity);
                    if(item.quantity <= 0)
                        {
                            // if the quantity is less than or equal to 0, the product is removed from the basket
                            this.delete(isItemInCart);
                        }
                   else 
                        {
                            this.save();
                         }
            }
        }

    // allows you to retrieve the number of products
    getNumberProduct()
        {
            const number = 0;
            for(let item of this.cart){
                number += item.quantity;
            }
            return number;
        }
 }






















