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

  //On ajoute la function suppression sur chaque <p>Supprimer</p>
  document.querySelectorAll(".deleteItem").forEach((element) => {

    //On invoke une arrow function qui return une function pour éviter qu'elle se self-invoke
    element.addEventListener("click", () => deleteProduct(product, element));

  });

  /**
   * Supprimer produit du panier
   * @param {Array of objects} cart
   * @param {Object} element
   * @return 
   */
  function deleteProduct(cart, element) {
      let e = element.parentNode.parentNode.parentNode
      console.log(cart)
      console.log(e)
      //Supprime l'element selectionné dans cart
      // cart.splice(element, 1)

      
      //Met à jour le localStorage avec le nouveau tableau cart
      // localStorage.setItem('productInfo', JSON.stringify(cart))
    

    

    //Supprime <article> selectionné
    // element.closest('.cart__item').remove()

    return afficherTotal();
    
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

  document.querySelector("#order").addEventListener("click", function (e){
    //Supprime le comportement par défaut du submit
    e.preventDefault();

    //Regex
    const alphabet =
      "a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ";
    const alphabetEtChiffres =
      "0-9-a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ";
    const regexAlphabet = new RegExp(
      `[${alphabet}][${alphabet}' ,"-]*[${alphabet}'",]+`
    );
    const regexAlphabetetChiffres = new RegExp(
      `[${alphabetEtChiffres}][${alphabetEtChiffres}' ,"-]*[${alphabetEtChiffres}'",]+`
    );
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Query tout les champs dans des variables
    let champPrenom = document.querySelector("#firstName");
    let champNom = document.querySelector("#lastName");
    let champVille = document.querySelector("#city");
    let champAdresse = document.querySelector("#address");
    let champEmail = document.querySelector("#email");

    // Test pendant l'input si le résultat attendu est le bon.
    // False = affiche la div avec une erreur
    // True = Supprime le contenu de la div
    !regexAlphabet.test(champPrenom.value)
      ? (champPrenom.nextElementSibling.innerHTML =
          "Veuillez entrer votre Prénom")
      : (champPrenom.nextElementSibling.innerHTML = "");

    !regexAlphabet.test(champNom.value)
      ? (champNom.nextElementSibling.innerHTML = "Veuillez entrer votre Nom")
      : (champNom.nextElementSibling.innerHTML = "");

    !regexAlphabet.test(champVille.value)
      ? (champVille.nextElementSibling.innerHTML =
          "Veuillez entrer votre Adresse")
      : (champVille.nextElementSibling.innerHTML = "");

    !regexAlphabetetChiffres.test(champAdresse.value)
      ? (champAdresse.nextElementSibling.innerHTML =
          "Veuillez entrer votre Adresse")
      : (champAdresse.nextElementSibling.innerHTML = "");

    !emailRegex.test(champEmail.value)
      ? (champEmail.nextElementSibling.innerHTML =
          "Veuillez entrer votre adresse mail")
      : (champEmail.nextElementSibling.innerHTML = "");

    // Verifie que tout les champs du formulaires sont remplis
    // Et que les inputs correspondent aux regex attendus
    if (
      champPrenom.value !== "" &&
      regexAlphabet.test(champPrenom.value) === true &&
      champNom.value !== "" &&
      regexAlphabet.test(champNom.value) === true &&
      champVille.value !== "" &&
      regexAlphabet.test(champVille.value) === true &&
      champAdresse.value !== "" &&
      regexAlphabetetChiffres.test(champAdresse.value) === true &&
      champEmail.value !== "" &&
      emailRegex.test(champEmail.value) === true
    ) {
      console.log("C'est bon");
      return (document.location.href = "confirmation.html");
    } else {
    }
  })
    
    
   
 

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
      
      //Si notre array productsTotalPrice est vide, on peut afficher 0 articles 0€
      if(productsTotalPrice.length === 0){

        return (document.querySelector("#totalPrice").innerHTML = 0),
               (document.querySelector("#totalQuantity").innerHTML = 0)
  
      }else{
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const grandTotal = productsTotalPrice.reduce(reducer);
        return grandTotal;
      }
        
    
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

})