//récuperation de l'url
//puis récupération de l'id à partir de l'url

const queryString_url_id = window.location.search;
console.log(queryString_url_id);

const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get("id");
console.log(id);

//mise en place de la requête GET avec fetch pour récupérer le canapé en fonction de son ID 

fetch(`http://localhost:3000/api/products/${id}`).then(function (res) {
  console.log(res);
  res.json().then((canap) => {

    //Intégration de l'image du canapé choisi
    let img = document.getElementsByClassName("item__img")[0];
    
    img.innerHTML +=
      '<img src="' + canap.imageUrl + '" alt="' + canap.altTxt + '"/>';

    //récupération de chaque élément du DOM pour placer les informations nécessaires pour chaque produit  
    let title = document.getElementById("title");
    let para = document.getElementById("description");
    
    let price = document.getElementById("price");
    let select = document.getElementById("colors");

    //ajout des données photos, description et options
    setElementId(img);
    setImgData(img, canap.imageUrl, canap.altTxt);

    setElementId(title, canap.name);
    setElementId(para, "canap-desc");
    setElementId(price, "canap-price");


    //intégration HTML de chaque élément décrivant les canapés
    price.innerHTML = canap.price;
    title.innerHTML = canap.name;
    para.innerHTML = canap.description;


//Création de la boucle pour chaque canapé choisi sur la page d'accueil avec l'option de sa couleur
    
    canap.colors.forEach((color, index) => {
      document.getElementById("colors").innerHTML +=
        `<option id='option-${index}' value="${color}">${color}</option>` 

    });

    const btn = document.getElementById('addToCart');
    

    let colors = document.getElementById('colors');
    colors.addEventListener('change', function() {
      productSelected.color = colors.value;
    });
    let quantity = document.getElementById('quantity');
    console.log(quantity)
    quantity.addEventListener('click', function() {
    productSelected.quantity = quantity.value;
    });

    let productSelected = {
      id: `${id}`,
      quantity: 0,
      color: '',
    };

    let cart = getCart();
    console.log(cart);

    btn.addEventListener('click', function() {
      let colorValue = colors.value;
      let quantityValue = quantity.value;
      console.log(quantityValue);
      console.log(colorValue);

      if(colorValue === '') {
        return;
      }
      if(quantityValue === 0 || quantityValue > 100){
        return;
      }

      let add = true;

      if(cart === 0) {
        productSelected.quantity = quantityValue;
        productSelected.color = colorValue;
        cart.push(productSelected);
      } else {
        cart.forEach((productSelected) => {
          if((productSelected.id === canap.id) && (productSelected.color === canap.color)) {
            productSelected.quantity += productSelected.color;
          add = false;
          }
        });
        if (add){
          cart.push(productSelected);
        }
      }
           
      
      window.localStorage.setItem('cart', JSON.stringify(cart));
      console.log('cart', cart);
      
      
      
    });
  
  });
});

//fonction pour attribuer la source et la description de chaque image
function setImgData(img, src, alt) {
  img.setAttribute("src", src);
  img.setAttribute("alt", alt);
}
//fonction permettant d'ajouter un id à un élément HTML
function setElementId(elem, modifier) {
  elem.id = `${elem.nodeName.toLowerCase()}${modifier}`;
}
//fonction permettant d'ajouter une class à un élément HTML (element fourni en paramètre)
function setElementClass(elem, value) {
  elem.classList.add(value);
  console.log(value);
}
function getCart(){
  let addItem= window.localStorage.getItem('cart');
  if(addItem == null) {
    return [];
  } else {
    return JSON.parse(addItem);
  }
}
console.log(getCart);



