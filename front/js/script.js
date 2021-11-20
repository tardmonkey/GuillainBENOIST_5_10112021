
//Charger produits au chargement de la page
window.addEventListener("load", () => {
async function loadApi(url) {
  fetch(url)
    .then(res => {
        if(res.ok){
          const products = res.json();
          console.log(products);
        } else {
          console.log("Erreur fetch API");
        }
    })
    
  }

  loadApi("http://localhost:3000/api/products")
})

