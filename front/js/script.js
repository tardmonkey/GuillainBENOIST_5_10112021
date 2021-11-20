
//Charger produits au chargement de la page
window.addEventListener("load", () => {

  fetch('http://localhost:3000/api/products')
    .then(res => {
        if(res.ok){
          res.json()
        } else {
          console.log("Erreur fetch API")
        }
    })
    
    
})

