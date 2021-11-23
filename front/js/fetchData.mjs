 /** 
     * Récupérer données d'une url
     * @param {string} url
     * @return {promise}
  */
export function fetchData(url){
    return new Promise((resolve,reject)=>{
        fetch(url)
          .then(function(response){
              return response.json()
          })
          .then(function(response){
              return resolve(response)
          })
    })
  }