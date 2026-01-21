document.addEventListener("DOMContentLoaded", cargarCarrito);

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio, imagen) {
    const carrito = obtenerCarrito();
    let producto;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === nombre) {
            producto = carrito[i];
            break;
        }
    }

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({
            id: nombre,
            nombre,
            precio,
            imagen,
            cantidad: 1
        });
    }
    guardarCarrito(carrito);
    cargarCarrito();
}

function cargarCarrito() {
    const carrito = obtenerCarrito();
    const contenedor = document.getElementById("carrito-items");
    const totalElemento = document.getElementById("total");

    contenedor.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío</p>";
        totalElemento.textContent = "Total: $0";
        return;
    }

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
        let precioCantidad = producto.precio * producto.cantidad;

        contenedor.innerHTML += `
        <article class="car-item">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="car-img">
            <div class="car-info">
                <h4>${producto.nombre}</h4>
                <p>$${precioCantidad}</p>

                <div class="car-controls">
                    <button onclick="cambiarCantidad('${producto.id}', -1)">-</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="cambiarCantidad('${producto.id}', 1)">+</button>
                    <button onclick="cambiarCantidad('${producto.id}', -${producto.cantidad})">Eliminar</button>
                </div>
            </div>
        </article>
    `;
    });

    totalElemento.textContent = `Total: $${total}`;
}

function cambiarCantidad(id, cambio) {
    const carrito = obtenerCarrito();
    let producto;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === id) {
            producto = carrito[i];
            break;
        }
    }

    if (!producto) {
        return;
    }

    producto.cantidad += cambio;

    if (producto.cantidad === 0) {
        carrito.splice(carrito.indexOf(producto), 1);
    }

    guardarCarrito(carrito);
    cargarCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    cargarCarrito();
}

function finalizarCompra() {
    const carrito = obtenerCarrito(); 
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }
    alert("Gracias por tu compra.");
    vaciarCarrito();
}

