/** 
             * Creer html 
             * @param {array} productsArray
             * @return {html}
          */
 export function createHtmlForProducts(productsArray){
    let html = ""

    productsArray.forEach((item)=>{
      html += 
        `
        <img src="${item?.imageUrl}" alt="Photographie d'un canapé">
      `
    })
    return html
  }