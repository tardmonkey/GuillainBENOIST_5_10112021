/** 
   * Cette fonction sert a creer le html des differents canapes
   * @param {array} arrayOfKanap
   * @return {html}

*/


export function createKanapItems(arrayOfKanap){

      let html = "";

      arrayOfKanap.forEach((kanap)=>{

            html += `
            
                <a href="./product.html?id=${kanap?._id}">
                    <article>
                        <img src="${kanap?.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                        <h3 class="productName">${kanap?.name}</h3>
                        <p class="productDescription">${kanap?.description}</p>
                    </article>
                </a>
            
            `;

      });

      return html;

}