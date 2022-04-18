
//CREATION DE LA REQUETE EN FETCH POUR APPELER LES DONNEES DE L'API

fetch ("http://localhost:3000/api/products")

   .then(function(res){
       const itemContainer = document.getElementById("items");
        res.json().then((data) => {
            data.forEach((canap, index) => {

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


                setImgData(img, canap.imageUrl, canap.altTxt);

                setElementClass(title, 'productName');
                setElementClass(para, 'productDescription');

                setAttribute(link, './product.html?id=42');

                               
                title.innerHTML = canap.name;
                para.innerHTML = canap.description;

                itemContainer.appendChild(link);
                link.appendChild(article);
                article.appendChild(img);
                article.appendChild(title);
                article.appendChild(para);
            });


        });
   });

   function setElementId(elem, index) {
       elem.id = `${elem.nodeName.toLowerCase()}${index}`
   }
   
   function setImgData(img, src, alt) {
       img.setAttribute('src', src);
       img.setAttribute('alt', alt);
   }

   function setElementClass(elem, value) {
       elem.classList.add(value);
   }
   

 function setAttribute(attribute, value) {
     attribute.setAttribute('href', value);
 }

  
   
       
   

   
   


   