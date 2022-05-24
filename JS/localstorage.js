let guardado = [];
let toDisplayFavorite = [];
let cantidadQ = 1;
let array = [];

let response = "https://apipetshop.herokuapp.com/api/articulos";
let dataFarmacia = [];

async function getData() {
  await fetch(response)
    .then((respuesta) => respuesta.json())
    .then((json) => {
      data = json.response;
      data.map((api) => {
        array.push({
          id: api._id,
          nombre: api.nombre,
          descripcion: api.descripcion,
          precio: api.precio,
          stock: api.stock,
          imagen: api.imagen,
          tipo: api.tipo,
        });
      });
    });

  init();
  function cardCarrito(toDisplayFavorite) {
    let htmlCarrito = "";

    toDisplayFavorite.forEach((toDisplay) => {
      htmlCarrito += `
      
        <div class="card">
        <div class="cover">
            <img src="${toDisplay.imagen}" alt="">
        </div>
        <div class="description">
            <h2>${toDisplay.nombre}</h2>
            <p>${toDisplay.descripcion}</p>
            <p>$${toDisplay.precio}</p>
            <p>Cantidad ${toDisplay.stock}</p>
        </div>
    </div>
        `;
      console.log(htmlCarrito);
    });
    document.getElementById("mainCardsFavorite").innerHTML = htmlCarrito;
  }
  cardCarrito(toDisplayFavorite);
}
getData();
function init() {
  var dataLocal = JSON.parse(localStorage.getItem(`favoritos`));
  if (dataLocal != null) {
    guardado = dataLocal;
  } else {
    guardado = [];
  }
  console.log(dataLocal);
  let badge = "";
  console.log(guardado);
  badge = `
    <button type="button" class="btn btn-white position-relative">
        <a class="me-2 mf-2" href="./localstorage.html" tabind"ex="2"><img src="./Imagenes/shopping-cart.png" alt=""/>
        <span class="spanMemory position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${guardado.length}<span class="visually-hidden">unread messages</span>
        </span>
    </button>
    <a>
    <img class="me-1 remover" id="clear" onClick="clearId()" src="./Imagenes/rubbish-bin.png" alt=""/>
    </a>
    `;
  document.getElementById("favoritos").innerHTML = badge;
  guardado.map((idGuardado) => {
    toDisplayFavorite.push(...array.filter((api) => api.id == idGuardado));
  });
  console.table(localStorage);
  console.log(guardado);
  console.log(toDisplayFavorite);
}
init();

//Borrar el localStorage
function clearId() {
  localStorage.clear();
  init();
}
//Remover el item cargado
console.log(guardado);

function removeItem(event) {
  guardado = guardado.filter((idguardado) => idguardado != event);
  localStorage.setItem("favoritos", JSON.stringify(guardado));
  init();
}
console.log(toDisplayFavorite);
//Imprimir las cards en el carrito
let alerta = document
  .getElementById("finalizacompra")
  .addEventListener("click", function () {
    alert("Gracias por comprar. Su pedido llegará pronto.");
  });
