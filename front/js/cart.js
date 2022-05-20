//appel des éléments stockés dans le localStorage sur la page panier
let item = JSON.parse(window.localStorage.getItem("cart"));
console.log(item);




fetch("http://localhost:3000/api/products/")

    .then(function (res) {

        res.json().then((canap) => {
            console.log(canap)
           
            //récuperation du bloc dans lequel le panier sera affiché
            const cartItem = document.getElementById('cart__items'); 
               
            let emptyCart = document.querySelector('cartAndFormContainer, h1');
            //affichage si le panier est vide
            if (item === null) {
                emptyCart.innerHTML += " est vide";

                //si le panier est rempli

            } else {
                item.forEach((item) => {
                    const product = canap.find(element => element._id == item.id);
                    console.log(product);
                    product.color = item.color;
                   
                    product.quantity = item.quantity;
                    console.log(product.quantity);
                    let article = createProduct(product);
                    cartItem.appendChild(article);
                    document.querySelector('divQuantity, input').innerHTML = product.quantity;
                    
                    
                });
            }
        });
    });


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
     let paraDelete = document.createElement('p');
     let title = document.createElement('h2');
     let input = document.createElement('input');

    //affichage des produits du localStorage sur la page cart.html
     title.textContent = product.name;
     paraColor.textContent = product.color;
     paraPrice.textContent = product.price += '€';
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
     paraQte.innerHTML =  'Qté: ';
     paraDelete.innerHTML = 'Supprimer';

     
     input.setAttribute('type', 'number');
      
     return article;

     
}
