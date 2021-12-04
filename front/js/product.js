import {fetchData} from "./fetchData.mjs"
import {apiUrl} from "./apiUrl.mjs"



document.addEventListener("DOMContentLoaded", ()=> {

    fetchData(`${apiUrl}/products`).then((response)=>{
        // document.querySelector(".item__img").innerHTML = createHtmlForProducts(response)
        let res = response;
        let urlParams = new URLSearchParams(document.location.search.substring(1));
        let urlId = urlParams.get("id");
      
        
        function createPage(){
          for(let i = 0; i < response.length; i++){
            
            if (response[i]._id === urlId) {
              const found = response[i];
              let imgUrl = found.imageUrl;
              let prix = found.price;
              let colors = found.colors;
              let description = found.description;
              let name = found.name;
              let alt = found.altTxt;
              let productId = found._id;
              document.querySelector("#addToCart").addEventListener("click", addToCart(productId)); //pourquoi elle self invoke ??
              document.querySelector(".item__img").innerHTML = `<img src="${imgUrl}" alt="${alt}">`;
              document.querySelector("#title").innerHTML = name;
              document.querySelector("#price").innerHTML = prix;
              document.querySelector("#description").innerHTML = description;
              colors.forEach(element => {
                document.querySelector("#colors").innerHTML += `<option value="${element}">${element}</option>`;
              });
              
               
              
            }
            
          }
        }
        createPage()

        
        

      })

      function addToCart(productId){
        localStorage.setItem("itemId",productId);
        console.log(localStorage.getItem("itemId"));
       }
})