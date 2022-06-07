//appel des éléments stockés dans le localStorage sur la page panier
let item = getCart();
console.log(item);




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

function createProduct(product) {
    //création des élements HTML
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


    /*
    if (product.id === product.id) {
        const priceTotal = product.quantity * product.price ;
        console.log(priceTotal);
       calculTotalPrice.push(priceTotal);
        const reduced = (accumulator, curr) => accumulator + curr;
             const totalPrice = calculTotalPrice.reduce(reduced);
             console.log(totalPrice);
             let totalArticle = document.querySelector('#totalPrice');
             console.log(totalArticle);
             totalArticle.innerHTML = `${totalPrice}`;

    }*/




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
        console.log(calculateTotalArticle)
    });
    let quantities = document.querySelector('#totalQuantity');
    quantities.innerHTML = `${calculateTotalArticle}`;
    console.log(quantities)
}

//suppessiion des articles

function removeFromCart(event) {
    let canapId = event.target.getAttribute('data-id');
    let canapColor = event.target.getAttribute('data-color');
    item.forEach((value, key) => {

        if (value.id == canapId && value.color == canapColor) {
            item.splice(key, 1);
            console.log('tout supprimer')

            updateLocalStorage(item);
            removeConfirm();

        } else {
            console.log('supprimer')
        }
        calculateArticle();
        calculateTotal();

    });
    initCart(item);

}

//mise à jour du localStorage apres changement de quantité ou suppression d'un article
function updateLocalStorage(item) {

    let update = window.localStorage.setItem("cart", JSON.stringify(item));
    console.log(update)
}
//changement des quantités
function changeQty(event) {
    console.log(event);
    let quantity = event.target.value;
    let canapId = event.target.getAttribute('data-id');
    let canapColor = event.target.getAttribute('data-color');
    item.forEach((value) => {
        console.log('canapId & color input', canapId, canapColor);
        console.log('valueId & valueColor', value.id, value.color);
        if (value.id == canapId && value.color == canapColor) {
            value.quantity = quantity;
            updateLocalStorage(item);
            addConfirm(); 
            event.stopPropagation(); 
        } if(value.quantity = quantity --) { 
            updateLocalStorage(item);
            lessConfirm();
            console.log('change')
        }
        calculateArticle();
        calculateTotal();
    });
    initCart(item);
}
function getCart() {
    let item = localStorage.getItem("cart");
    console.log(item);
    if (item == null) {
        return [];
    } else {
        return JSON.parse(item);
    }

}
function createCart(item, canap) {
    //récuperation du bloc dans lequel le panier sera affiché
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
        element.addEventListener('change', changeQty);
        
    });

    deleteBtn.forEach((element) => {
        element.addEventListener('click', removeFromCart);

    });
}
const addConfirm = () => {
    window.confirm("Souhaitez-vous ajouter ce produit au panier?");
    window.location.href = "cart.html";
}

const lessConfirm = () => {
    window.confirm("Souhaiter retirer une quantité du panier?");
    window.location.href = "cart.html";
}
const removeConfirm = () => {
    window.confirm("Êtes-vous sûr de vouloir supprimer ce produit du panier?");
    window.location.href = "cart.html";
}


