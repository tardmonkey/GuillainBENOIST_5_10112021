
/** 
   * Cette fonction sert a recuperer des donnees du back-end
   * @param {string} url
   * @return {promise}

*/

export function fetchData(url){
        
      return new Promise((resolve, reject)=>{

            fetch(url)

            .then(function(response) {

                return response.json();

            }).then(function(response) {

                  return resolve(response);
           
            });


      }); 
   

}