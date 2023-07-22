// Libreria slider
const slider = new KeenSlider("#my-keen-slider", {
    loop: false,
})


// Elementos DOM
const contenedorProductos = document.getElementById('productos__card-container')
const carritoContainer = document.getElementById('carrito')
// Carrito

const carrito = JSON.parse(localStorage.getItem('carrito')) || []

const productos = [{
    id: 1, 
    nombre: 'Sr. domo',
    img: '',
    precio: 1000,
    cantidad: 0
},
{
    id: 2, 
    nombre: 'Violenta Fotosintesis',
    img: '',
    precio: 1000,
    cantidad: 0
},
{
    id: 3, 
    nombre: 'Otoño animal',
    img: '',
    precio: 1000,
    cantidad: 0
},
{
    id: 4, 
    nombre: '13 Lluvias de verano',
    img: '',
    precio: 1000,
    cantidad: 0
},
{
    id: 5, 
    nombre: 'rmera',
    img: '',
    precio: 1000,
    cantidad: 0
},]


const manageCart = () => {
    
    const carritoVacio = () => {
        const textCart = document.createElement('p')
        textCart.innerHTML = 'El carrito esta vacio'
        carritoContainer.append(textCart)
    }
    const carritoLleno = () => {
        
        for(producto of carrito) {
            let carritoItem = document.createElement('li')
            carritoItem.innerHTML = `
                <p>${producto.nombre}</p>
                <p>${(producto.precio * producto.cantidad)}</p>
                <p>${producto.cantidad}</p>
                <button class='remove-btn' id='${producto.id}'>Quitar</button>
            `
            carritoContainer.append(carritoItem)
        }
    }

    carrito.length > 0 ? carritoLleno() : carritoVacio()
}

// ESTA funcion no me convence, y por alguna razon no funciona a la primer, tengo que recargar la pagina antes 
const removeCartItem = () => {
    const removeBtns = document.querySelectorAll('.remove-btn')
    for(boton of removeBtns) {
        boton.onclick = (e) => {
            const newCart = carrito.filter((producto) => producto.id !== parseInt(e.target.id))
            localStorage.setItem('carrito', JSON.stringify(newCart))
            carritoContainer.innerHTML = ''
            carrito.length = 0
            carrito.push(...newCart)
            manageCart()
            location.reload()
        }
    }
}


const mostrarProductos = (array) => {
    for(const producto of array) {
        let productoCard = document.createElement('div')
        productoCard.classList.add('product-card')
        productoCard.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$${producto.precio}</p>
        <button id='${producto.id}' class='btn__add-to-cart '>Agregar a carrito</button>
        `
        contenedorProductos.append(productoCard)
    }
}


function addToCart(p) {
    const respuesta = carrito.includes(p)
    
    const addMore = () => {
        const productoActual = carrito.find((producto) => producto === p)
        productoActual.cantidad ++
    }

    const addProd = () => {
        p.cantidad ++
        carrito.push(p)
    }

    respuesta === true ? addMore() : addProd()
    swal({
        icon: 'success',
        text: `Se agrego ${p.nombre} al carrito`,
        timer: 1000
    }) 
    manageCart()
}



const manageCartButtons = () => {
    const botonesCarrito = document.getElementsByClassName('btn__add-to-cart')
    for(boton of botonesCarrito) {
        boton.onclick = (e) => {
            const productoSeleccionado = productos.find((producto) => producto.id === parseInt(e.target.id))
            carritoContainer.innerHTML = ''
            addToCart(productoSeleccionado)
            localStorage.setItem('carrito', JSON.stringify(carrito))
        }
    }
}

const limpiarCarrito = () => {
    localStorage.clear()
    location.reload()
}


mostrarProductos(productos)
manageCartButtons()
manageCart()
removeCartItem()

