import {apiUrl} from "./apiUrl.mjs";
import {fetchData} from "./fetchData.mjs";
import {createProductsItems} from "./createProductsItems.mjs";

//Charger products au chargement de la page, creer le HTML et l'afficher dans #items
document.addEventListener("DOMContentLoaded", ()=> {
  fetchData(`${apiUrl}/products`).then((response)=>{
    document.querySelector("#items").innerHTML = createProductsItems(response)
  })
    
})
 


