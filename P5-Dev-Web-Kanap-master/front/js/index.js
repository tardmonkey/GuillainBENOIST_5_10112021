import {fetchData} from "./fetchData.mjs";
import {baseUrl} from "./config.mjs";
import {createKanapItems} from "./createKanapItems.mjs";

document.addEventListener("DOMContentLoaded", ()=>{

     fetchData(`${baseUrl}/products`).then((response)=>{

         document.querySelector("#items").innerHTML = createKanapItems(response);

     });

});
