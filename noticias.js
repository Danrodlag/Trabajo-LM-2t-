function iniciar(){
    json = JSON.stringify(localStorage.getItem("datos"));
    
    for (let propiedad in json) {
        console.log(propiedad + ": " + json[propiedad]);
      }
}