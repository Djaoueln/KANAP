addToCart.onclick = () =>
{const cart = 
  {
    color: colors.value,
    quantity: Number(quantity.value),
    id: search_params.get('id'),      
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
 class Kanap {
     constructor(){
         const local =localStorage.getItem("cart");
             if(local == null)
                {
                 this.local =[];
                }
             else
                 {
                   this.local = JSON.parse(local)
                 }
               }

     add(item)
           {
         const IsItemInCart = (item, id, colors) =>  (item.id = id) && (item.colors = colors);
         const index = this.cart.findIndex(IsItemInCart)
         if (index != undefined){
             index.quantity++;
             
         }else {
           item.quantity = 1;
           this.cart.push(item);
         }
         this.set();
           }
      
    revome(item)
            {
     this.cart = this.cart.filter(p => p.id == item.id);
     this.set();
            }
    
     Changequantity(item, quantity)
            {
              const IsItemInCart = (item, id, colors) =>  (item.id = id) && (item.colors = colors);
              const index = this.cart.findIndex(IsItemInCart);
              if (index != undefined){
                  item.quantity += quantity;
                  if(index.quantity <= 0){
                    this.revome(index);
                  }
             
              else {
                  this.set();
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

  
  
  

