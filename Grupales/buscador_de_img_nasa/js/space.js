let info = document.getElementById("inputBuscar");
let search = document.getElementById("btnBuscar");
let contenido = document.getElementById("contenedor")

search.addEventListener("click", function(){
    let URL = `https://images-api.nasa.gov/search?q=${info.value}`
    fetch(URL)
    .then(response => response.json())
    .then(datos =>{
        console.log(datos)
        let content = "";
        if(datos.collection.items.length !== 0 ){        
        for (let data of datos.collection.items){
            content += `
            <div class="card">
                <img class="card-img-top"  src="${data.links[0].href}">
                <div id="div-text">
                    <h4 class="card-title">${data.data[0].title}</h4>
                    <p class="card-text">${data.data[0].description}</p>
                    <p class="card-text-data">${data.data[0].date_created}</p>
                </div>
            </div>
            `
            contenido.innerHTML = content;
        }} else {
            contenido.innerHTML = `
            <div class="alert-heading"> 
                <h2> No se ha encontrado resultados para la busqueda ${info.value}</h2>
            </div>
            `
        }
    })
})