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
      const select = document.querySelector("#colors");

      const selectChoice = select.options[select.selectedIndex].text;

      const quantity = document.querySelector("#quantity").value;

      if (selectChoice !== "--SVP, choisissez une couleur --" && quantity > 0) {
        if (localStorage.productInfo !== undefined) {
          const nouvelObjet = {

            name: product[0].name,

            price: product[0].price,

            description: product[0].description,

            color: selectChoice,

            quantity: quantity,

            imageUrl: product[0].imageUrl,
            
          };

          const products = JSON.parse(localStorage.productInfo);

          products.push(nouvelObjet);

          localStorage.setItem("productInfo", JSON.stringify(products));
          
          return (document.location.href = "cart.html");
          
        // }else if(0 = 0){
        //   let ls = JSON.parse(localStorage.getItem("productInfo"));
        //   let nom = ls[0].name;
        //   let quantity = parseInt(ls[0].quantity)
        //   console.log(nom)
        //   if (ls[0].name !== ""){ //si le nom du Kanap existe dans la liste
        //     ls[0].quantity = quantity + 1; //augmenter la quantité
           
        //   }
        }
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

          return (document.location.href = "cart.html");
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
