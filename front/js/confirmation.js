// const orderId = getOrderId();
// displayOrderId(orderId);

//* LOGIC TAKE ORDER ID FROM LOCAL STORAGE
function getOrderId()
{
   // let str = window.location.href;
   // let url = new URL(str);
   // let search_params = new URLSearchParams(url.search);
   
   // if(search_params.has('orderId')) 
   //    {
   //       let orderId = search_params.get('orderId');
   //       fetch (`http://localhost:3000/api/products/${orderId}`)
   //       .then((response) => response.json())
   //       .then((resp) => displayOrderId(resp))
   //    }


   const orderIdElement = document.getElementById("orderId");
   orderIdElement.innerText = localStorage.getItem("orderId");
   localStorage.clear();
}

getOrderId();

//* LOGIC DISPLAY ORDER ID
function displayOrderId(orderId) 
{
   const orderIdElement = document.getElementById("orderId");
   orderIdElement.innerText = orderId;
}  


