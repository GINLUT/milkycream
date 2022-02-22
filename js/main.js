/* DECLARACIÓN DE VARIABLES - ARRAYS*/

let total = 0;

let carrito = []

const productos = [{
        codigo: 1,
        nombre: "7 maravillas del chocolate",
        precio: 6200,
        img: "../images/7-maravillas.jpg",
        idHTML: "maravillas",
        descripcion: "Helado de chocolate, chantilly, chocolisto, minibrownies, nutella y gotas de chocolate.",
        cantidad: 1,
        promocion: true,
    },

    {
        codigo: 2,
        nombre: "Frutos Rojos",
        precio: 3500,
        img: "../images/frutos-rojos.jpg",
        idHTML: "frutos",
        descripcion: "Helado de Fresa y vainilla con salsa de fresa, crema chantilly y cerezas",
        cantidad: 1,
        promocion: false,
    },

    {
        codigo: 3,
        nombre: "Import",
        precio: 8500,
        img: "../images/import-xxl.jpg",
        idHTML: "import",
        descripcion: "Helado de chocolate, Ferrero Rocher, kinder bueno, nutella y gotas de chocolate.",
        cantidad: 1,
        promocion: true,
    },

    {
        codigo: 4,
        nombre: "Malteada Genovesa",
        precio: 4500,
        img: "../images/genovesa.jpg",
        idHTML: "genovesa",
        descripcion: "Helado Tres leches, chantilly, arequipe, salsa de chocolate y piazza",
        cantidad: 1,
        promocion: true,
    },
    {
        codigo: 5,
        nombre: "Arcoiris",
        precio: 5500,
        img: "../images/arcoiris-xxl.jpg",
        idHTML: "arcoiris",
        descripcion: "Helado napolitano, chantilly, salsa de fresa, golochips y aros Trululú.",
        cantidad: 1,
        promocion: false,
    },
    {
        codigo: 6,
        nombre: "Malteada Pingüinitos",
        precio: 4000,
        img: "../images/pinguinitos.jpg",
        idHTML: "pinguinitos",
        descripcion: "Helado de chocolate, chantilly, salsa de chocolate, Pingüinitos y piazza",
        cantidad: 1,
        promocion: false,
    },
    {
        codigo: 7,
        nombre: "Minichips 2x1",
        precio: 4000,
        img: "../images/minichips-2x1.jpg",
        idHTML: "minichips",
        descripcion: "Helado de vainilla, chantilly, minichips, piazza y salsa de chocolate",
        cantidad: 1,
        promocion: false,
    },
    {
        codigo: 8,
        nombre: "Brownies 2x1",
        precio: 4000,
        img: "../images/brownie-2x1.jpg",
        idHTML: "brownie",
        descripcion: "Helado de brownie, chantilly, arequipe, minibrownie, salsa de chocolate y piazza",
        cantidad: 1,
        promocion: false,
    },
]


const contenedorProductos = document.querySelector(".productos"),
    productosAgregados = document.querySelector('.productos-carrito'),
    totalCarrito = document.getElementById('total-carrito');



/*DECLARACIÓN DE FUNCIONES*/

listaProductos();


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
            <p class="precio">${producto.precio}</p>
        </div>
        <div class="col-md-7 d-flex align-items-center">
            <img class="fotosProductos img-fluid rounded mx-auto d-block" data-bs-toggle="modal" data-bs-target="#${producto.idHTML}" src="${producto.img}" alt="${producto.nombre}">
        </div>
        <div class="card-footer">
            <input type="submit" class="botonProductos boton${producto.codigo}" value="Agregar al Carrito" />
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
        const { codigo, cantidad } = articuloRepetido
        articuloRepetido.cantidad += 1
        document.getElementById(`cantidad${codigo}`).innerHTML = `<h3 id="cantidad${codigo}">Cantidad:${cantidad}</h3>`

        actualizarCarrito()

    } else { // DESTRUCTURACIÓN

        let productoAgregar = productos.find(elemento => elemento.codigo == codigoProducto)
        const { codigo, nombre, precio, img, idHTML, cantidad } = productoAgregar
        carrito.push(productoAgregar)
        actualizarCarrito()

        let div = document.createElement('div')
        div.className = 'productoEnCarrito'
        div.innerHTML = `
        <img class="fotosProductos img-fluid rounded mx-auto d-block" data-bs-toggle="modal" data-bs-target="#${idHTML}" src="${img}" alt="${nombre}">
                        <h3>${nombre}</h3>
                        <h3>Precio: $${precio}</h3>
                        <h3 id="cantidad${codigo}">Cantidad:${cantidad}</h3>
                        <button id="btnEliminar${codigo}" class="botonEliminar"> Eliminar</button>
                        `

        productosAgregados.appendChild(div)

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
                document.getElementById(`cantidad${productoAgregar.codigo}`).innerHTML = `<h3 id="cantidad${productoAgregar.codigo}">Cantidad:${productoAgregar.cantidad}</h3>`
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
    totalCarrito.innerText = calcularTotal(...precios) //SPREAD
}

function calcularTotal(...precios) { //SPREAD
    return precios.reduce((acc, n) => acc + n, 0)
}


//Recupera los productos seleccionados en el carrito si se reinicia la página
function recuperarCarrito() {
    let recuperarLS = JSON.parse(localStorage.getItem('carrito'))
    if (recuperarLS) {
        recuperarLS.forEach(element => {
            agregarAlCarrito(element.codigo)
        });
    }

}

recuperarCarrito()