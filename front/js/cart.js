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
     let regexHtmlTags = /(<([^>]+)>)/ig;
     let searchHtml = clickedHtml.match(regex)
     let found = searchHtml[0] 
     let foundWithoutTags = found.replace(regexHtmlTags, "");
     let searchName = products[0].name;
    
     for(let i = 0; products.length > i; i++){
        if(searchName === foundWithoutTags){
          console.log(products)
          products.splice(clicked.path[4])
          clicked.path[4].innerHTML = "";
          console.log(products)
        }
     }
      
    //  localStorage.removeItem("productInfo", JSON.stringify(products));

    

    
  }

  document.querySelectorAll(".itemQuantity").forEach((element) => {
    element.addEventListener("change", (recalcSumTotal) => {
      let newQuantity = document.querySelectorAll(".itemQuantity").value;
      newQuantity = parseInt(newQuantity, 10);
      let produits = localStorage.getItem("productInfo");
      produits = JSON.parse(produits);
      let productPrice = produits.price;
      document.querySelector("#totalQuantity").innerHTML = newQuantity;
      document.querySelector("#totalPrice").innerHTML =
        productPrice * newQuantity;
    });
  });

  

  document
    .querySelector("#order")
    .addEventListener("click", confirmerFormulaire);

  /**
   * Verifier le formulaire puis redirect
   * @param
   * @return page.html
   */
  function confirmerFormulaire() {
    /*
        champ prénom  {string}            id="firstname"
        champ nom     {string}            id="lastName"
        champ adresse {string + int}      id="address"
        champ ville   {string}            id="city"
        champ email   {string type mail}  id="email"
        button        {submit}            id="order"
      
      */
    return (document.location.href = "confirmation.html");
  }
});
