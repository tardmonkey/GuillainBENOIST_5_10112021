document.addEventListener("DOMContentLoaded", () => {
  /**
   * Afficher produits dans le panier
   * @param {string} product
   * @return HTML
   */
  function showProduct(product) {
    document.querySelector("#cart__items").innerHTML += `
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>Couleur : ${product.color}</p>
                    <p>Prix : ${product.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Quantité :</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
              `;
  }

  let product = localStorage.getItem("productInfo");

  product = JSON.parse(product);

  product.forEach((element) => {
    showProduct(element);
  });

  afficherTotal();

  document.querySelectorAll(".deleteItem").forEach((element) => {
    element.addEventListener("click", deleteProduct);
  });

  /**
   * Supprimer produit du panier
   * @param none
   * @return HTML
   */
  function deleteProduct(clicked) {
    //  console.log(clicked.path)
    //  clicked.path[4].innerHTML = "";

    const products = JSON.parse(localStorage.productInfo);
    let clickedHtml = clicked.path[4].innerHTML;

    let regex = "<h2>(.*?)</h2>";
    let regexHtmlTags = /(<([^>]+)>)/gi;
    let searchHtml = clickedHtml.match(regex);
    let found = searchHtml[0];
    let foundWithoutTags = found.replace(regexHtmlTags, "");
    let searchName = products[0].name;

    for (let i = 0; products.length > i; i++) {
      if (searchName === foundWithoutTags) {
        console.log(products);
        products.splice(clicked.path[4]);
        clicked.path[4].innerHTML = "";
        console.log(products);
      }
    }

    //  localStorage.removeItem("productInfo", JSON.stringify(products));
  }

  document.querySelectorAll(".itemQuantity").forEach((element) => {
    element.addEventListener("change", changeQuantity);
  });

  /**
   * Ajouter/Supprimer quantité d'un objet
   * Puis changer la valeur dans le localStorage
   * @param {object} e
   * @return afficherTotal()
   */
  function changeQuantity(e) {
    let targetParent = e.target.parentNode.parentNode.parentNode;
    let quantity = e.target.value;
    let productName = targetParent.querySelector("h2").innerHTML;
    let products = JSON.parse(localStorage.getItem("productInfo"));

    products.forEach((element) => {
      if (element.name == productName) {
        console.log(element.quantity);

        element.quantity = quantity;

        console.log(element.quantity);

        const productsString = JSON.stringify(products);

        localStorage.setItem("productInfo", productsString);

        return afficherTotal();
      }
    });
  }

  document.querySelector("#order").addEventListener("click", confirmerFormulaire);

  /**
   * Verifier le formulaire puis redirect
   * @param
   * @return confirmation.html
   */
  function confirmerFormulaire() {
        const alphabet = 'a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ';
        const alphabetEtChiffres = '0-9-a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ';
     
        const regexAlphabet = new RegExp(`[${alphabet}][${alphabet}' ,"-]*[${alphabet}'",]+`);
        const regexAlphabetetChiffres = new RegExp(`[${alphabetEtChiffres}][${alphabetEtChiffres}' ,"-]*[${alphabetEtChiffres}'",]+`);
        const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let champPrenom = document.querySelector("#firstName");
        let champNom = document.querySelector("#lastName");
        let champVille = document.querySelector("#city");
        let champAdresse = document.querySelector("#address");
        let champEmail = document.querySelector("#email");
        console.log(emailRegEx.test(champEmail.value))

        //Verifie que tout les champs du formulaires sont remplis et correspondent aux regex attendus
        if(
        champPrenom.value !== "" && regexAlphabet.test(champPrenom.value) === true && 
        champNom.value !== "" && regexAlphabet.test(champNom.value) === true &&
        champVille.value !== "" && regexAlphabet.test(champVille.value) === true && 
        champAdresse.value !== "" && regexAlphabetetChiffres.test(champAdresse.value) === true &&
        champEmail.value !== "" && emailRegEx.test(champEmail.value) === true){
          
          console.log("C'est bon")
          return document.location.href = "confirmation.html";
          
        }else{
          alert("Veuillez remplir tout les champs du formulaire")
        }

        
        
  }
});

/**
 * Calculer le prix total des produits
 * dans localStorage("productInfos")
 *
 * @return {number} grandTotal
 */
function sommeTotal() {
  const products = JSON.parse(localStorage.productInfo);
  const productsTotalPrice = [];

  for (let i = 0; products.length > i; i++) {
    let p = products[i].price;
    let q = products[i].quantity;
    q = parseInt(q, 10);
    let totalOfOne = p * q;
    productsTotalPrice.push(totalOfOne);
  }

  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const grandTotal = productsTotalPrice.reduce(reducer);
  return grandTotal;
}

/**
 * Calculer le nombre total de produits
 * dans localStorage("productInfos")
 *
 * @return {number} productsTotalQuantity
 */
function quantityTotal() {
  const products = JSON.parse(localStorage.productInfo);
  let productsTotalQuantity = 0;

  for (let i = 0; products.length > i; i++) {
    let productQuantityInt = parseInt(products[i].quantity);
    productsTotalQuantity += productQuantityInt;
  }

  return productsTotalQuantity;
}

/**
 * Calcule le prix total
 * Calcule la quantité d'items totale
 *
 * @return {HTML}
 */
function afficherTotal() {
  sommeTotal();
  quantityTotal();
  return (
    (document.querySelector("#totalPrice").innerHTML = sommeTotal()),
    (document.querySelector("#totalQuantity").innerHTML = quantityTotal())
  );
}
