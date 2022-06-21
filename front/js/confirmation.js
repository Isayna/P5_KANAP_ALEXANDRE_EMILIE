//récuperation du formaulaire de commande

let confirmOrder = JSON.parse(localStorage.getItem('order'));
console.log(confirmOrder)
const orderNumber = document.querySelector('#orderId');
orderNumber.innerHTML = confirmOrder.orderId;
//localStorage.clear();

