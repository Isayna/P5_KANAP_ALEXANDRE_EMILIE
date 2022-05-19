//appel des éléments stockés dans le localStorage sur la page panier
let addItem = JSON.parse(window.localStorage.getItem("cart"));
console.log(addItem);




fetch("http://localhost:3000/api/products/")

    .then(function (res) {

        res.json().then((canap) => {
            console.log(canap)
           
            

            //récuperation du bloc dans lequel le panier sera affiché
            const cartItem = document.getElementById('cart__items');
            

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


            //mise en place du conteneur 'article' 
            cartItem.appendChild(article).innerHTML;
            article.appendChild(divImg).innerHTML;
            divImg.appendChild(img).innerHTML;
            article.appendChild(divContent).innerHTML;
            divContent.appendChild(divDescription).innerHTML;
            divDescription.appendChild(title).innerHTML;
            divDescription.appendChild(paraColor).innerHTML;
            divDescription.appendChild(paraPrice).innerHTML;
            article.appendChild(divSettingsContent).innerHTML;
            divSettingsContent.appendChild(divQuantity).innerHTML;
            divQuantity.appendChild(paraQte).innerHTML;
            divQuantity.appendChild(input).innerHTML;
            article.appendChild(divDelete).innerHTML;
            divDelete.appendChild(paraDelete).innerHTML;
            paraQte.innerHTML = 'Qté: ';
            
            input.setAttribute('type', 'number');

           



            
            
            let emptyCart = document.querySelector('cartAndFormContainer, h1');

            //affichage si le panier est vide

            if (addItem === null) {
                emptyCart.innerHTML += " est vide";

                //si le panier est rempli

            } else {
                addItem.forEach((addItem) => {
                    console.log(addItem)
                    let colorValue = addItem.color;
                    console.log(colorValue);
                    let qtyValue = addItem.quantity;
                    console.log(qtyValue);
                    paraColor.innerHTML = colorValue;
                    input.innerHTML = qtyValue;
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

