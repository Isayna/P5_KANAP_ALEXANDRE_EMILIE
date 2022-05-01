//récuperation de la chaine de requête dans l'url

const queryString_url_id = window.location.search;
console.log(queryString_url_id);

const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get("id");
console.log(id);

//mise en place de la requête GET avec fetch pour récupérer chaque ID de chaque canapé

fetch(`http://localhost:3000/api/products/${id}`).then(function (res) {
  console.log(res);
  res.json().then((canap) => {

    //Intégration de l'imagede chaque canapé choisi
    let img = document.getElementsByClassName("item__img")[0];
    console.log(img);
    img.innerHTML +=
      '<img src="' + canap.imageUrl + '" alt="' + canap.altTxt + '"></img>';

    //récupération de chaque élément du DOM pour placer les informations nécessaires pour chaque produit  
    let title = document.getElementById("title");
    let para = document.getElementById("description");
    let option = document.getElementsByTagName("option")[0];
    let price = document.getElementById("price");

    //récupération des données photos, description et options
    setElementId(img, canap);
    setImgData(img, canap.imageUrl, canap.altTxt);

    setElementId(title, canap);
    setElementId(para, canap);
    setElementId(option, canap);
    setElementId(price, canap);


    //intégration HTML de chaque élément décrivant les canapés
    price.innerHTML = canap.price;
    title.innerHTML = canap.name;
    para.innerHTML = canap.description;


//Création de la boucle pour chaque canapé choisi sur la page d'accueil avec l'option de sa couleur
    let select = document.getElementById("colors");
    canap.colors.forEach((colors) => {
      document.getElementById("colors").innerHTML +=
        '<option value="' + colors + '">' + colors + "</option>";
    });
  });
});

//fonction pour attribuer la source et la description de chaque image
function setImgData(img, src, alt) {
  img.setAttribute("src", src);
  img.setAttribute("alt", alt);
}
//fonction permettant d'ajouter un id à un élément HTML
function setElementId(elem, index) {
  elem.id = `${elem.nodeName.toLowerCase()}${index}`;
}
//fonction permettant d'ajouter une class à un élément HTML (element fourni en paramètre)
function setElementClass(elem, value) {
  elem.classList.add(value);
  console.log(value);
}
