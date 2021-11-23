/** 
             * Creer html 
             * @param {array} productsArray
             * @return {html}
          */
 export function createProductsItems(productsArray){
    let html = ""

    productsArray.forEach((item)=>{
      html += 
        `
        <a href="./product.html?id=${item?._id}">
          <article>
            <img src="${item?.imageUrl}" alt="Lorem ipsum dolor sit amet,${item?.name}">
            <h3 class="productName">${item?.name}</h3>
            <p class="productDescription">${item?.description}</p>
          </article>
         </a>
      `
    })
    return html
  }