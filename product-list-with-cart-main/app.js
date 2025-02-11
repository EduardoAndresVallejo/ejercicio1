const conteiner = document.querySelector("#conteiner");
const carriro = document.querySelector("#carriro");
const carriroDeleted = document.querySelector("#carriro-deleted");
const carirroContent = document.querySelector("#carriro-content");
let ProductosAgregados = [];

document.addEventListener("DOMContentLoaded", () => {});

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => json(madeIdForProducts(data)));

// Funcion que le asigna ID's unicos a los productos
const madeIdForProducts = (arrData) => {
  return arrData.map((value) => {
    const valueWithId = { ...value, id: Math.floor(Math.random() * 1000) };
    return valueWithId;
  });
};

function json(array) {
  array.forEach((productos) => {
    const { category, name, price, image, id } = productos;
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

    function seleccionarProducto() {
      // Verificar si ya existe el producto en el carrito, si ya existe incrementa la cantidad si no pues agrega uno nuevo.
      // Pregutna si hay algo priemro.

      const productoExistente = ProductosAgregados.find((e) => e.id === id);

      if (productoExistente) {
        ProductosAgregados = ProductosAgregados.map((value) =>
          value.id === id ? { ...value, cantidad: value.cantidad + 1 } : value
        );
      } else {
        ProductosAgregados = [
          ...ProductosAgregados,
          { category, name, price, image, id, cantidad: 1 },
        ];
      }

      isCaritoVacio();
      Productos(ProductosAgregados);
      // Productos();
    }
  });
}

// Funcion que valida si el carrito esta vacio o no, si esta vacio muestra mensaje si tiene algo elimina el mensaje
const isCaritoVacio = () => {
  if (ProductosAgregados.length > 0) {
    carriroDeleted.classList.add("hidden");
    return;
  }

  carriroDeleted.classList.remove("hidden");
};

function Productos() {
  limpiarHTML();

  ProductosAgregados.forEach((elegido) => {
    const { name, price, cantidad, id } = elegido;
    const divProduct = document.createElement("div");
    const totalPrice = price * cantidad;
    divProduct.innerHTML = `
            <div
            class="flex items-center justify-between border-b border-b-Red-400 pb-4"
          >
            <div class="flex flex-col">
              <h4 class="font-bold">${name}</h4>
              <div class="flex text-sm mt-2">
                <span class="font-bold text-Red mr-4">${cantidad}x</span>
                <span class="mr-1 text-xs">@</span>
                <p class="mr-2">$${price}</p>
                <p>$${totalPrice}</p>
              </div>
            </div>

            <img
              src="assets/images/icon-remove-item.svg"
              alt=""
              srcset=""
              class="border-2 border-Rose-300 rounded-full p-1 btn-borrar"
            />
          </div>
      `;
    carirroContent.appendChild(divProduct);

    const btnEliminar = divProduct.querySelector(".btn-borrar");

    btnEliminar.addEventListener("click", (e) => {
      const newArrProduct = ProductosAgregados.filter((e) => e.id !== id);
      ProductosAgregados = newArrProduct;
      Productos();
      isCaritoVacio();
    });
  });
}

function limpiarHTML() {
  while (carirroContent.firstChild) {
    carirroContent.removeChild(carirroContent.firstChild);
  }
}
