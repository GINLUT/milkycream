/* DECLARACIÓN DE VARIABLES - ARRAYS*/

let total = 0;

let carrito = []

let productos = []

const contenedorProductos = document.querySelector(".productos"),
    productosAgregados = document.querySelector('.productos-carrito'),
    totalCarrito = document.getElementById('total-carrito'),
    carritoAbrir = document.getElementById('botonCarrito'),
    carritoCerrar = document.getElementById('carritoCerrar'),
    contadorCarrito = document.getElementById('contadorCarrito');

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0],
    modalCarrito = document.getElementsByClassName('modal-carrito')[0];

carritoAbrir.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
carritoCerrar.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation()
})
contenedorModal.addEventListener('click', () => {
    carritoCerrar.click()
})

/*DECLARACIÓN DE FUNCIONES*/
async function mostrarProductos() {
    const resp = await fetch("../productos.json")
    productos = await resp.json()
    listaProductos();
}

mostrarProductos()

//Recorre todos los productos y los agrega al HTML
function listaProductos() {
    contenedorProductos.innerHTML = "";
    productos.forEach(function(producto) {
        agregarCajaProducto(producto)
    })

}

//Agrega un producto del stock 
function agregarCajaProducto(producto) {
    let div = document.createElement('div');
    div.className = 'card col-lg-6 col-md-12';
    div.innerHTML += `<div class="row g-0 fondoCard">
        <div class="col-md-5 boxProductos">
            <h2 class="card-header cajaProducto">${producto.nombre}</h2>
            <p class="card-text">${producto.descripcion}</p>
            <p class="precio"> $ ${producto.precio}</p>
        </div>
        <div class="col-md-7 d-flex align-items-center">
            <img class="fotosProductos img-fluid rounded mx-auto d-block" data-bs-toggle="modal" data-bs-target="#${producto.idHTML}" src="${producto.img}" alt="${producto.nombre}">
        </div>
        <div class="card-footer">
            <input type="submit" class="botonProductos boton${producto.codigo}" value=" Agregar al Carrito" />
        </div>
        <div class="modal fade" id="${producto.idHTML}">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content card">
                    <h2 class="card-header productos">${producto.nombre}</h2>
                    <img src="${producto.img}" alt="${producto.nombre}" class="imgModal">
                    <p class="card-text descripcion">${producto.descripcion}</p>
                    <p class="precio">${producto.precio}</p>
                    <input type="submit" class="botonProductos boton${producto.codigo}" value="Agregar al Carrito" />
                </div>
            </div>
        </div>
    </div>`
    contenedorProductos.appendChild(div);

    let botonesAgregar = document.getElementsByClassName(`boton${producto.codigo}`)

    botonesAgregar[0].addEventListener('click', () => {
        agregarAlCarrito(producto.codigo)
        Toastify({
            text: "Producto añadido al carrito",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#e448c2",
            },
            onClick: function() {} // Callback after click
        }).showToast();
    })

    botonesAgregar[1].addEventListener('click', () => {
        agregarAlCarrito(producto.codigo)
    })
}

// recorre el arreglo del carrito sumando los precios de los productos seleccionados

function agregarAlCarrito(codigoProducto) {
    let articuloRepetido = carrito.find(buscar => buscar.codigo == codigoProducto)

    if (articuloRepetido) { // DESTRUCTURACIÓN
        const { codigo } = articuloRepetido
        articuloRepetido.cantidad += 1
        document.getElementById(`cantidad${codigo}`).innerHTML =
            `<p id="cantidad${codigo}">Cantidad:${articuloRepetido.cantidad}</p>`

        actualizarCarrito()

    } else { // DESTRUCTURACIÓN

        let productoAgregar = productos.find(elemento => elemento.codigo == codigoProducto)
        const { codigo, nombre, precio, cantidad } = productoAgregar
        carrito.push(productoAgregar)
        actualizarCarrito()

        let div = document.createElement('div')
        div.className = 'productoEnCarrito'
        div.innerHTML = `
                        <p>${nombre}</p>
                        <p>Precio: $${precio}</p>
                        <p id="cantidad${codigo}">Cantidad:${cantidad}</p>
                        <button id="btnEliminar${codigo}" class="botonEliminar"><i class="fas fa-trash-alt"></i></button>
                        `



        modalCarrito.appendChild(div)

        // Se crea el boton para eliminar productos del carrito

        let btnEliminar = document.getElementById(`btnEliminar${productoAgregar.codigo}`)

        btnEliminar.addEventListener('click', () => {
            if (carrito.find(elemento => elemento.codigo == codigoProducto).cantidad == 1) {
                Swal.fire({
                    title: `¿Deseas eliminar ${productoAgregar.nombre} del carrito?`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar'
                }).then((result) => {
                    console.log(result)
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Eliminado',
                            ` ${productoAgregar.nombre} ha sido eliminado del carrito`,
                            'success')
                        btnEliminar.parentElement.remove()
                        carrito = carrito.filter(item => item.codigo != productoAgregar.codigo)
                        actualizarCarrito()
                        localStorage.setItem('carrito', JSON.stringify(carrito))
                    }
                })


            } else {
                productoAgregar.cantidad = productoAgregar.cantidad - 1
                document.getElementById(`cantidad${productoAgregar.codigo}`).innerHTML = `<p id="cantidad${productoAgregar.codigo}">Cantidad:${productoAgregar.cantidad}</p>`
                actualizarCarrito()
                localStorage.setItem('carrito', JSON.stringify(carrito))
            }

        })
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }
}

//Actualiza y suma los items en el carrito
function actualizarCarrito() {
    const precios = carrito.map((el) => (el.promocion ? el.precio * 0.9 : el.precio) * el.cantidad)
    contadorCarrito.innerText = carrito.reduce((acc, el) => acc + el.cantidad, 0)
    totalCarrito.innerText = calcularTotal(...precios) //SPREAD
}

function calcularTotal(...precios) { //SPREAD
    return precios.reduce((acc, n) => acc + n, 0)
}


//Recupera los productos seleccionados en el carrito si se reinicia la página
// function recuperarCarrito() {
//     let recuperarLS = JSON.parse(localStorage.getItem('carrito'))
//     if (recuperarLS) {
//         recuperarLS.forEach(element => {
//             agregarAlCarrito(element.codigo)
//         });
//     }

// }

// recuperarCarrito()