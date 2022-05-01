
//CREATION DE LA REQUETE EN FETCH POUR APPELER LES DONNEES DE L'API

fetch ("http://localhost:3000/api/products")

   .then(function(res) {
       const itemContainer = document.getElementById("items");
        res.json().then((data) => {
            console.log(data)
            data.forEach((canap, index) => {
                console.log(canap, index)

                //CRÉATION DES ÉLÉMENTS HTML 

                let link = document.createElement("a");
                let article = document.createElement("article");
                let img = document.createElement("img");
                let title = document.createElement("h3");
                let para = document.createElement("p");

                //MISE NE PLACE DES ÉLÉMENTS

                setElementId(link, index);
                setElementId(article, index);
                setElementId(img, index);
                setElementId(title, index);
                setElementId(para, index);

                //récuperation des images 
                setImgData(img, canap.imageUrl, canap.altTxt);


                //recupération du nom et de la description des produits
                setElementClass(title, 'productName');
                setElementClass(para, 'productDescription');

                //ajout du lien vers la page produit 
                link.setAttribute('href', `./product.html?id=${canap._id}`);
                console.log('href', `./product.html?id=${canap._id}`)

                //ajout du nom et de la description des canapés de manière dynamique               
                title.innerHTML = canap.name;
                para.innerHTML = canap.description;


                //mise en place du conteneur "items"
                itemContainer.appendChild(link);
                link.appendChild(article);
                article.appendChild(img);
                article.appendChild(title);
                article.appendChild(para);
            });


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
       console.log(value)
   }
   


  
   
       
   

   
   


   