import {fetchData} from "./fetchData.mjs"
import {apiUrl} from "./apiUrl.mjs"
// import {createHtmlForProducts} from "./createHtmlForProducts.mjs"
document.addEventListener("DOMContentLoaded", ()=> {

    fetchData(`${apiUrl}/products`).then((response)=>{
        // document.querySelector(".item__img").innerHTML = createHtmlForProducts(response)
        let res = response;
        let urlCurrent = document.URL;
        let urlId = urlCurrent.substring(urlCurrent.lastIndexOf('=') + 1);
        
      
        
        function createPage(){
          for(let i = 0; i < response.length; i++){
            const urlId = urlCurrent.substring(urlCurrent.lastIndexOf('=') + 1);
            
            if (response[i]._id === urlId) {
              let found;
              found = response[i];
              let imgUrl = found.imageUrl.slice(29);
              let prix = found.price;
              let colors = found.colors;
              let description = found.description;
              let name = found.name;
              let alt = found.altTxt;

              console.log(found);
              document.querySelector(".item__img").innerHTML = `<img src="../../back/images/${imgUrl}" alt="${alt}">`;
              document.querySelector("#title").innerHTML = name;
              document.querySelector("#price").innerHTML = prix;
              document.querySelector("#description").innerHTML = description;
              
              colors.forEach(element => {
                document.querySelector("#colors").innerHTML = `<option value="${element}">${element}</option>`;
                console.log(element);
              });
              
            }
          }
        }
        createPage()


      })
})