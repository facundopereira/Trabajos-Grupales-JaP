let buttonBuscar = document.getElementById('btnBuscar');
let url= `https://japceibal.github.io/japflix_api/movies-data.json`;
let peliculas = [];
let listaPeliculas = "";


fetch(url)
.then(response => response.json())
.then(datos => { 
    peliculas = datos;
    console.log(peliculas[5]);
});

function mostrarPelicula(index){
  
    listaPeliculas += `
    <div class="pelicula" >
        <h5 class= "titulo" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${index}" aria-controls="offcanvasTop${index}">${peliculas[index].title}</h5>
        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${index}" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title desplegable" id="offcanvasTopLabel">${peliculas[index].title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
        <div class="offcanvas-body">
            <p class="desplegable-descripcion">${peliculas[index].overview}</p><hr>
            <div class= "generos">`;

            for (let i=0; i < peliculas[index].genres.length; i++){
                
                listaPeliculas += `
                
                    <p class="desplegable">${peliculas[index].genres[i].name}`;
                    if ( i == peliculas[index].genres.length-1){
                        listaPeliculas +=`
                        </p>`;
                    } else { 
                        listaPeliculas +=
                        ` - </p>`;
                    }
                    
                };  

        listaPeliculas +=  
                      
        ` 
                <div class="dropdown more">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      More
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item" href="#">Year: ${peliculas[index].release_date.substring(0, 4)}</a></li>
                      <li><a class="dropdown-item" href="#">Runtime: ${peliculas[index].runtime} mins</a></li>
                      <li><a class="dropdown-item" href="#">Budget: $${peliculas[index].budget}</a></li>
                      <li><a class="dropdown-item" href="#">Revenue: $${peliculas[index].revenue}</a></li>
                    </ul>
                </div>
            </div>
        </div>       
    </div>
        <div class="score">`;
            for (let e=1; e <= 10; e++){
                listaPeliculas += `<span class="fa fa-star`;
                    if (peliculas[index].vote_average >= e){
                        listaPeliculas += ` checked`;
                    }
                listaPeliculas += `"></span>`;
            };
        listaPeliculas +=
        `</div>`;
           
    listaPeliculas +=
        `<p class="tagline">${peliculas[index].tagline}</p>
    </div>`;   

    
}


buttonBuscar.addEventListener('click', function() {
    let buscador = document.getElementById("inputBuscar").value.toLowerCase();
    let lista = document.getElementById("lista");
    listaPeliculas = " ";

    for (let i=0; i < peliculas.length; i++){

        if (peliculas[i].title.toLowerCase().includes(buscador) || peliculas[i].tagline.toLowerCase().includes(buscador)|| peliculas[i].overview.toLowerCase().includes(buscador)){
           
           mostrarPelicula(i);

        } else {

            for (let e=0; e < peliculas[i].genres.length; e++){
                
                if (peliculas[i].genres[e].name.toLowerCase().includes(buscador)){
                    
                    mostrarPelicula(i);
                    break;
                }
            }
        }
    }

   lista.innerHTML = listaPeliculas;

});
