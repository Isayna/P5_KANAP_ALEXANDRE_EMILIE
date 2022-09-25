//appel des éléments stockés dans le localStorage sur la page panier
let item = getCart();

//mise en place du panier sur la page html
async function initCart() {

    const res = await fetch("http://localhost:3000/api/products/");
    res.json().then((canap) => {
        console.log(canap);
        let emptyCart = document.querySelector('cartAndFormContainer, h1');
        //affichage si le panier est vide
        if (item === null || item == 0) {
            emptyCart.innerHTML += " est vide";
        } else {
            createCart(item, canap);
            calculateTotal();
            calculateArticle();
        }
    });
    return res;
}
initCart();

//fonction permettant d'ajouter un id à un élément HTML
function setElementId(elem, index) {
    elem.id = `${elem.nodeName.toLowerCase()}${index}`
}

//fonction pour attribuer la source et la description de chaque image
function setImgData(img, src, alt) {
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
}

//fonction permettant d'ajouter une class à un élément HTML (element fourni en paramètre)
function setElementClass(elem, value) {
    elem.classList.add(value);
}

//fonction pour la création des élements HTML
function createProduct(product) {
    let article = document.createElement('article');
    let divImg = document.createElement('div');
    let divContent = document.createElement('div');
    let divDescription = document.createElement('div');
    let divSettingsContent = document.createElement('div');
    let divQuantity = document.createElement('div');
    let divDelete = document.createElement('div');
    let img = document.createElement('img');
    let paraPrice = document.createElement('p');
    let paraColor = document.createElement('p');
    let paraQte = document.createElement('p');
    let paraDelete = document.createElement('button');
    let title = document.createElement('h2');
    let input = document.createElement('input');

    //affichage des produits du localStorage sur la page cart.html
    title.textContent = product.name;
    paraColor.textContent = product.color;
    paraPrice.textContent = product.price;
    img.innerHTML = product.imageUrl;
    input.value = product.quantity;

    //attribution des classes aux balises HTML
    setElementClass(article, 'cart__item');
    setElementClass(divImg, 'cart__item__img');
    setElementClass(divContent, 'cart__item__content');
    setElementClass(divDescription, 'cart__item__content__description');
    setElementClass(divSettingsContent, 'cart__item__content__settings');
    setElementClass(divQuantity, 'cart__item__content__settings__quantity');
    setElementClass(input, 'itemQuantity');
    setElementClass(divDelete, 'cart__item__content__settings__delete');
    setElementClass(paraDelete, 'deleteItem');
    setElementClass(paraPrice, 'cart__item__price');

    //récuperation des images 
    setImgData(img, product.imageUrl, product.altTxt);

    //mise en place du conteneur 'article' 
    article.appendChild(divImg);
    divImg.appendChild(img);
    article.appendChild(divContent);
    divContent.appendChild(divDescription);
    divDescription.appendChild(title);
    divDescription.appendChild(paraColor);
    divDescription.appendChild(paraPrice);
    article.appendChild(divSettingsContent);
    divSettingsContent.appendChild(divQuantity);
    divQuantity.appendChild(paraQte);
    divQuantity.appendChild(input);
    article.appendChild(divDelete);
    divDelete.appendChild(paraDelete);
    paraQte.innerHTML = 'Qté: ';
    paraDelete.innerHTML = 'Supprimer';

    input.setAttribute('type', 'number');
    input.setAttribute('min', '1');
    input.setAttribute('max', '100');
    input.setAttribute('data-id', product._id);
    input.setAttribute('data-color', product.color);
    paraDelete.setAttribute('data-id', product._id);
    paraDelete.setAttribute('data-color', product.color);

    return article;
}

//fonction pour calculer le total du panier et incrémenter sur la page cart.html
function calculateTotal() {
    let products = document.querySelectorAll('.cart__item');
    console.log(products)
    let calculTotalPrice = 0;
    products.forEach(product => {
        let prix = product.querySelector('.cart__item__price').textContent;
        let quantite = product.querySelector('.itemQuantity').value;
        let total = prix * quantite;
        console.log(total)
        calculTotalPrice = calculTotalPrice + total;
    });
    let totalArticle = document.querySelector('#totalPrice');
    totalArticle.innerHTML = `${calculTotalPrice}`;
}

//fonction pour calculer le total des articles du panier
function calculateArticle() {
    let products = document.querySelectorAll('.cart__item');
    let calculateTotalArticle = 0;
    products.forEach(product => {
        let quantite = product.querySelector('.itemQuantity').value;
        calculateTotalArticle = calculateTotalArticle += quantite++;
        console.log(calculateTotalArticle);
    });
    let quantities = document.querySelector('#totalQuantity');
    quantities.innerHTML = `${calculateTotalArticle}`;
    console.log(quantities)
}

// fonction pour la suppression des articles
function removeFromCart(event) {
    let canapId = event.target.getAttribute('data-id');
    let canapColor = event.target.getAttribute('data-color');
    item.forEach((value, key) => {
        if (value.id == canapId && value.color == canapColor) {
            item.splice(key, 1);
            updateLocalStorage(item);
            removeConfirm();
        } else {
        }
        calculateArticle();
        calculateTotal();
    });
    initCart(item);
}

//fonction pour la mise à jour du localStorage apres changement de quantité ou suppression d'un article
function updateLocalStorage(item) {
    let update = window.localStorage.setItem("cart", JSON.stringify(item));
}

// fonction pour le changement des quantités
function changeQty(event) {
    let quantity = event.target.value;
    let canapId = event.target.getAttribute('data-id');
    let canapColor = event.target.getAttribute('data-color');
    item.forEach((value) => {
        if ((value.id === canapId) && (value.color === canapColor)) {
            changeConfirm();
            value.quantity = quantity;
        } 
        updateLocalStorage(item);
    });
    initCart(item);
}
//function de recupération des produits dans le localStorage
function getCart() {
    let item = localStorage.getItem("cart");
    if (item == null) {
        return [];
    } else {
        return JSON.parse(item);
    }
}
//récuperation du bloc dans lequel le panier sera affiché
function createCart(item, canap) {
    const cartItem = document.getElementById('cart__items');
    item.forEach((item) => {
        //fusion des deux tableaux pour récuperer toutes les données à afficher dans le panier
        const product = canap.find(element => element._id == item.id);
        product.color = item.color;
        product.quantity = item.quantity;
        let article = createProduct(product);
        cartItem.appendChild(article);

    });
    const inputQty = document.querySelectorAll('.itemQuantity');
    const deleteBtn = document.querySelectorAll('.deleteItem');
    inputQty.forEach((element) => {
        element.addEventListener('change', changeQty) 
        
    });
    deleteBtn.forEach((element) => {
        element.addEventListener('click', removeFromCart);
    });
}
//fonction de confirmtion d'ajout au panier
let changeConfirm = () => {
    window.confirm("Pour ajouter un produit au panier cliquer OK, sinon annuler");
    window.location.href = "cart.html";
}

// fonction pour supprimer un produit du panier
const removeConfirm = () => {
    window.confirm("Êtes-vous sûr de vouloir supprimer ce produit du panier?");
    window.location.href = "cart.html";
}
const form = document.getElementsByClassName('cart__order__form')[0];
console.log(form);
const questionOrder = document.querySelectorAll('.cart__order__form__question');
const errorId = document.querySelectorAll('.cart__order__form__question p');
console.log(errorId);
const orderInput = document.querySelectorAll('.cart__order__form__question input');
console.log(orderInput);
const orderSubmit = document.querySelector('#order');
console.log(orderSubmit);

//fonction regexp pour vérification de la validité de l'adresse mail
function isEmailValid() {
    const emailError = document.querySelector('#email').value;
    const formValidEmail = new RegExp(
        /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
    );
    let emailResult = formValidEmail.test(emailError);
    if (emailResult == false) {
        errorId[4].textContent = "Veuillez saisir une adresse E-mail valide";
        errorId[4].style.color = "blue";
        orderInput[4].style.border = "5px solid blue";
        return false;
    } else {
        errorId[4].textContent = "";
        orderInput[4].style.border = "none"
        return true;
    }
}

//fonction regexp pour la vérification de la validité des prénoms
function isNameValid() {
    const firstNameError = document.querySelector('#firstName').value;
    const formValidName = new RegExp(/^[a-zA-Z]/);
    let firstNameResult = formValidName.test(firstNameError);
    if (firstNameResult == false) {
        errorId[0].textContent = "Veuillez saisir un prénom valide";
        errorId[0].style.color = "blue";
        orderInput[0].style.border = "5px solid blue";
        return false;
    } else {
        errorId[0].textContent = "";
        orderInput[0].style.border = "none";
        return true;
    }
}

//fonction regexp pour la vérification de la validité des noms
function isLastNameValid() {
    const lastNameError = document.querySelector('#lastName').value;
    const formValidName = new RegExp(/^[a-zA-Z]/);
    let lastNameResult = formValidName.test(lastNameError);
    if (lastNameResult == false) {
        errorId[1].textContent = "Veuillez saisir votre nom";
        errorId[1].style.color = "blue";
        orderInput[1].style.border = "5px solid blue";
        return false;
    } else {
        errorId[1].textContent = "";
        orderInput[1].style.border = "none";
        return true;
    }
}
//fonction validation adresse
function isAdresseValid() {
    const adressError = document.querySelector('#address').value;
    const formValidAdresse = new RegExp(/^[a-zA-Z0-9]/);
    let adresseResult = formValidAdresse.test(adressError);
    if (adresseResult == false) {
        errorId[2].textContent = "Veuillez saisir votre adresse";
        errorId[2].style.color = "blue";
        orderInput[2].style.border = "5px solid blue";
        return false;
    } else {
        errorId[2].textContent = "";
        orderInput[2].style.border = "none";
        return true;
    }
}
//fonction validation ville
function isCityValid() {
    const cityError = document.querySelector('#city').value;
    const formValidCity = new RegExp(/^[a-zA-Z]/);
    let cityResult = formValidCity.test(cityError);
    if(cityResult == false) {
        errorId[3].textContent = "Veuillez saisir votre ville";
        errorId[3].style.color = "blue";
        orderInput[3].style.border = "5px solid blue";
        return false;
    } else {
        errorId[3].textContent = "";
        orderInput[3].style.border = "none";
        return true;
    }
}

//mise en place envoie du formulaire

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let myForm = document.forms[0];
    console.log(myForm)

    //recupération données formulaire
    let formContact = {
        firstName: document.querySelector('#firstName').value,
        lastName: myForm[1].value,
        address: myForm[2].value,
        city: myForm[3].value,
        email: myForm[4].value,
    };

    //recuperation des ID produits
    let recupId = [];
    item.forEach(function (element) {
        recupId.push(element.id);
    });
    let formOrder = {
        contact: formContact,
        products: recupId,
    };
    localStorage.setItem('finalOrder', JSON.stringify(formOrder));

    //requête post
    const url = 'http://localhost:3000/api/products/order';
    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(formOrder),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    fetch(request)
        .then(function (response) {
            response.json().then(formOrder => {
                localStorage.setItem('order', JSON.stringify(formOrder));
                window.location.href = "confirmation.html";
            });
        });
});

//fonction validation des inputs
function addControl() {
    orderInput[0].addEventListener('input', function (event) {
        isNameValid();
    });

    orderInput[1].addEventListener('input', function (event) {
        isLastNameValid();
    });

    orderInput[2].addEventListener('input', function (event) {
        isAdresseValid();
    });

    orderInput[3].addEventListener('input', function (event) {
        isCityValid();
    });

    orderInput[4].addEventListener('input', function (event) {
        isEmailValid();
    });
}
addControl();
