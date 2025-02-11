const conteiner = document.querySelector("#conteiner");
const carriro = document.querySelector("#carriro");
let ProductosAgregados = [];

document.addEventListener("DOMContentLoaded", () => {
  contenedor();
});

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => json(data));

function json(array) {
  array.forEach((productos) => {
    const { category, name, price, image } = productos;
    const html = document.createElement("div");
    html.innerHTML = `
            <div class="w-full p-6 relative flex flex-col items-center ">
            <img src="${image.mobile}" class="rounded-xl"/> 
            <button class="btnAgregar cursor-pointer border-1 border-Rose-300 rounded-3xl w-40 py-2 px-4 gap-2 absolute bottom-30 flex bg-Rose-50 items-center"><img src="./assets/images/icon-add-to-cart.svg"> Add to Cart </button>
            <div class="flex flex-col items-start w-full mt-10">
            <p class="text-Rose-300">${category}</p>
            <h1 class="text-Rose-900">${name}</h1> 
            <p class="text-Red">$${price}</p> 
            </div>
            </div>
        `;
    const btnAgregar = html.querySelector(".btnAgregar");

    conteiner.appendChild(html);

    btnAgregar.addEventListener("click", seleccionarProducto);

    function seleccionarProducto(e) {
      e.preventDefault();
      ProductosAgregados.push({
        category: category,
        name: name,
        price: price,
        image: image,
        id: Math.floor(Math.random() * 1000)
      });
      console.log(ProductosAgregados);
      Productos();
    }
  });
}
function contenedor() {
  const seleccionados = document.createElement("div");
  seleccionados.className = "carrito-vacio";
  seleccionados.innerHTML = `
    <div class="bg-Rose-50 mx-6 pb-8 flex flex-col">
      <h1 class="p-4 text-Red">Your cart</h1>
      <div class="flex flex-col text-center">
        <img src="./assets/images/illustration-empty-cart.svg" class="w-50 mx-14"/>
        <p class="text-Rose-500">Your added items will appear here</p>
      </div>
    </div>
  `;
  carriro.appendChild(seleccionados);
}


function Productos(productos) {
  if (ProductosAgregados.length > 0) {
    const carritoVacio = carriro.querySelector(".carrito-vacio");

    if (carritoVacio) {
      carriro.removeChild(carritoVacio);
      console.log("borro");
    }
  }

  limpiarHTML()

  ProductosAgregados.forEach((elegido) => {
    const { name, price, id} = elegido;
    const html = document.createElement("div");
    html.className = "carrito-eliminado";
    html.innerHTML = `
            <h1 class="p-4 text-Red">Your cart</h1>
            <div class="bg-Rose-50 mx-6 pb-8 flex flex-col">
            <div class="p-4 w-60 col-span-2">
            <h1 class="text-Rose-900">${name}</h1> 
            <p class="text-Red">$${price}</p> 
            <button class="btn-borrar" data-id="${id}"> x </button>
            </div>
      `;
    carriro.appendChild(html);

    const btnEliminar = html.querySelector(".btn-borrar");

    btnEliminar.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.remove(html);
      contenedor()
    });

  });
}

function limpiarHTML(){
  while(carriro.firstChild){
    carriro.removeChild(carriro.firstChild)
  }
}
