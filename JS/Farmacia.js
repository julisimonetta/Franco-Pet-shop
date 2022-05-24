let articulosFarmacia = "https://apipetshop.herokuapp.com/api/articulos";
let data = [];
let tipoData = [];
let farmacos = "";
let datoFarmaco = [];

async function getData() {
  await fetch(articulosFarmacia)
    .then((respuesta) => respuesta.json())
    .then((json) => {
      data = json.response;

      console.log(json);
      data.forEach((dato) => {
        if (dato.tipo == "Medicamento") {
          datoFarmaco.push(dato);
        }
      });
      console.log(datoFarmaco);

      displayCard(datoFarmaco);
    });
  function displayCard(datoFarmaco) {
    let html = "";
    datoFarmaco.forEach((toDisplay) => {
      let stock =
        toDisplay.stock <= 5
          ? `<p class="text-danger fw-bold">"Ultimas Unidades!"</p>`
          : "";

      html += `
        <div class="card">
            <div class="cover">
                <img src="${toDisplay.imagen}" alt="">
            </div>
            <div class="description">
                <h2 class="heightP">${toDisplay.nombre}</h2>
                <p class="descHeight">${toDisplay.descripcion}</p>
                <p>$${toDisplay.precio}</p>
                <p>Cantidad ${toDisplay.stock}</p>
                <p>${stock}</p>





                <button class="cssbuttons-io-button" onClick="getID('${toDisplay._id}')" id="${toDisplay._id}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
                <span>Comprar</span>
              </button>


             
                
              <button class="cssbuttons-io-button2" onClick="removeItem('${toDisplay._id}')"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
              <span>Borrar</span></button>
                
            </div>
        </div>
            `;
      /* console.table(toDisplay) */
    });
    document.getElementById("mainCards").innerHTML = html;
  }
  displayCard(datoFarmaco);
  init();
}
getData();

//AGREGAR DATOS A LOCAL STORAGE

var favorites = JSON.parse(localStorage.getItem("favoritos")) || [];

var addfavorite;
function getID(event) {
  favorites.push(event);
  const unicoFav = new Set(favorites);
  var addfavorite = [...unicoFav];

  localStorage.setItem("favoritos", JSON.stringify(addfavorite));
  localStorage.setItem("cargaControl", "Secargo");
  init();
}
