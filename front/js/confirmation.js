
//* logic take order id from local storage
function getOrderId()
{
   const orderIdElement = document.getElementById("orderId");
   orderIdElement.innerText = localStorage.getItem("orderId");
   localStorage.clear();
}
//* launch function
getOrderId();

//* logic display orderId
function displayOrderId(orderId) 
{
   const orderIdElement = document.getElementById("orderId");
   orderIdElement.innerText = orderId;
}  


