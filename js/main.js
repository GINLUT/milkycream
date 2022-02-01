/*SUMATORIA DE COSTOS TOTALES DE PRODUCTOS SELECCIONADOS POR CLIENTES*/

/* DECLARACIÓN DE VARIABLES - ARRAYS*/

let total = 0;

const carrito = []

let productoSeleccionado = parseInt(
    prompt(
        "Selecciona una opción: \n1- Helado \n2- Waffle \n3- Milkshake \n4- Batido \n0- Finalizar Compra"
    )
);

const productos = [
    { codigo: 1, nombre: "Helado", precio: 10 },
    { codigo: 2, nombre: "Waffle", precio: 20 },
    { codigo: 3, nombre: "Milkshake", precio: 30 },
    { codigo: 4, nombre: "Batido", precio: 40 }
]

/*DECLARACIÓN DE FUNCIONES*/

function precioProducto(codigoSeleccionado) {
    const producto = productos.find((el) => el.codigo === codigoSeleccionado)
    return producto.precio
}

function agregarAlCarrito(producto) {
    if (productos.some((el) => el.codigo == producto)) {
        carrito.push(producto)
        console.log("Seleccionaste " + productos.find((el) => el.codigo === producto).nombre)
    } else {
        alert("Por favor ingrese una opción válida");
        return 0
    }
}

function calcularTotal() {
    carrito.forEach((producto) => {
        total += precioProducto(producto)
    })
}

/*PROCESAMIENTO DE DATOS*/

// Procesa la primera entrada y agraga al carrito hasta que el usuario finalice la compra

while (productoSeleccionado != 0) {
    agregarAlCarrito(productoSeleccionado)
    productoSeleccionado = parseInt(
        prompt(
            "Selecciona una opción: \n1- Helado \n2- Waffle \n3- Milkshake \n4- Batido \n0- Finalizar Compra"
        )
    )
}

// recorre el arreglo del carrito sumando los precios de los productos seleccionados

calcularTotal()

/*SALIDA DE RESULTADOS*/

console.log("Gracias por preferirnos, el total de su compra es " + total + " CLP")