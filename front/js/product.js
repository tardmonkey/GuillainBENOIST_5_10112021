import { fetchData } from "./fetchData.mjs";
import { apiUrl } from "./apiUrl.mjs";

/**
 * Afficher un produit(canape)
 * @return {undefined}
 */

document.addEventListener("DOMContentLoaded", () => {
  fetchData(`${apiUrl}/products`).then((response) => {
    // document.querySelector(".item__img").innerHTML = createHtmlForProducts(response)
    let urlParams = new URLSearchParams(document.location.search.substring(1));
    let urlId = urlParams.get("id");

    const product = response.filter((element) => {
      if (element._id === urlId) {
        return element;
      }
    });

    document.querySelector(
      ".item__img"
    ).innerHTML = `<img src="${product[0].imageUrl}" alt="${product[0].altTxt}">`;

    document.querySelector("#title").innerHTML = product[0].name;
    document.querySelector("title").innerHTML = product[0].name;

    document.querySelector("#price").innerHTML = product[0].price;

    document.querySelector("#description").innerHTML = product[0].description;

    product[0].colors.forEach((color) => {
      document.querySelector(
        "#colors"
      ).innerHTML += `<option value="${color}">${color}</option>`;
    });

    document.querySelector("#addToCart").addEventListener("click", addToCart);

    /**
     * Ajouter au panier puis redirect
     * @param
     * @return cart.html
     */
    function addToCart() {

      let products = localStorage.getItem("productInfo");
      products = JSON.parse(products)

      const select = document.querySelector("#colors");

      //Value couleur choisie
      const selectChoice = select.options[select.selectedIndex].text;

      //Value quantité choisie
      const quantity = document.querySelector("#quantity").value;

      //Nom du canapé sur cette page
      const name = document.querySelector("#title").innerHTML;

      //Si on a choisi une couleur et une quantité 
      if (selectChoice !== "--SVP, choisissez une couleur --" && quantity > 0) {

        //Si productInfo existe déjà dans le localStorage
        if (localStorage.productInfo !== undefined) {

        const quantityOfSameProduct = []
          
        for (let i = 0; i < products.length; i++){

          //Si la couleur et le nom existe déjà dans le localstorage
          if(products[i].color == selectChoice && products[i].name == name){

            //Transforme la quantité du produit en integer
            let productsInt = parseInt(products[i].quantity)


            //Transforme la quantité séléctionné en integer
            let quantityInt = parseInt(quantity);

            quantityOfSameProduct.push(productsInt)
            quantityOfSameProduct.push(quantityInt)


            const reducer = (accumulator, curr) => accumulator + curr;

            //Additionne chaque entrée du array 
            let newQuantity = quantityOfSameProduct.reduce(reducer);
             
            console.log(products[i].quantity)
            products[i].quantity = newQuantity;
            console.log(products[i].quantity)
            return  localStorage.setItem("productInfo", JSON.stringify(products));
            
          }
            
        }
          
          const nouvelObjet = {

            name: product[0].name,

            price: product[0].price,

            description: product[0].description,

            color: selectChoice,

            quantity: quantity,

            imageUrl: product[0].imageUrl,
            
          };

        

         //On ajoute le nouvel objet dans le tableau
        products.push(nouvelObjet)

        //Supprime les doublons
        const productsSet = [...new Set(products.map(a => JSON.stringify(a)))].map(a => JSON.parse(a))
          
        //On écrase localstorage avec le nouveau tableau productsSet
        localStorage.setItem("productInfo", JSON.stringify(productsSet));

        
      }
        
        //Si productInfo n'existe pas dans le localStorage
        else {
          const productInfos = [
            {
              name: product[0].name,

              price: product[0].price,

              description: product[0].description,

              color: selectChoice,

              quantity: quantity,

              imageUrl: product[0].imageUrl,
            }
          ];

          localStorage.setItem("productInfo", JSON.stringify(productInfos));

          // return (document.location.href = "cart.html");
        }

      } else if (
        selectChoice !== "--SVP, choisissez une couleur --" &&
        quantity <= 0
      ) {
        alert("Veuillez indiquer une quantité.");
      } else if (
        selectChoice == "--SVP, choisissez une couleur --" &&
        quantity > 0
      ) {
        alert("Veuillez choisir une couleur");
      } else {
        alert("Veuillez choisir une couleur et une quantité.");
      }
    }
  });

    




});


