
validateOrder();

// fonction pour la récuperation du formaulaire de commande
function validateOrder() {
    let confirmOrder = JSON.parse(localStorage.getItem('order'));
    console.log(confirmOrder);
    const orderNumber = document.querySelector('#orderId');
    orderNumber.innerHTML = "<br>" + confirmOrder.orderId + "<br>" + "Nous vous remercions pour votre commande";
}
//effacement du localstorage une fois la commande vamlidée afin de ne pas conserver les données clients
localStorage.clear();

