 export class Cart {
     constructor(){
         let cart =localStorage.getItem("cart");
             if(cart == null)
                {
                 this.cart =[];
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
            const isItemInCart = (item, id, colors) =>  (item.id = id) && (item.colors = colors);
            const index = this.cart.findIndex(isItemInCart);
         if (item != undefined)
              {
            item.quantity++;
              }
         else {
           item.quantity = 1;
           this.cart.push(item);
         }
         this.save();
           }
      
    remove(item)
            {
     this.cart = this.cart.filter(p => p.id == item.id);
     this.save();
            }
    
     changeQuantity(item, quantity)
            {
              const isItemInCart = (item, id, colors) =>  (item.id = id) && (item.colors = colors);
              const index = this.cart.findIndex(isItemInCart);
              if (index != undefined){
                  item.quantity += quantity;
                  if(index.quantity <= 0){
                    this.remove(index);
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

  
  
  

