// Libreria slider
const slider = new KeenSlider("#my-keen-slider", {
    loop: false,
})


// Elementos DOM
const contenedorProductos = document.getElementById('productos__card-container')
const carritoContainer = document.getElementById('carrito')
// Carrito


// TO-DO

// Proceso de registro
// Opiniones y reseñas, Hay un par de APIS para llenar eso no?
// LAS SUGERENCIAS SON BIENVENIDAS

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
    
    if(carrito.length > 0) {
        for(let producto of carrito) {
            let carritoItem = document.createElement('li')
            carritoItem.innerHTML = `
                <p>${producto.nombre}</p>
                <p>${(producto.precio * producto.cantidad)}</p>
                <p>${producto.cantidad}</p>
                <button class='remove-btn' id='${producto.id}'>Quitar</button>
            `
            carritoContainer.append(carritoItem)
        }
    } else {
        const textCart = document.createElement('p')
        textCart.innerHTML = 'El carrito esta vacio'
        carritoContainer.append(textCart)
    }
    removeCartItem()
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
            // location.reload()
            e.preventDefault()
        }
    }
    
}


const mostrarProductos = (array) => {
    for(const producto of array) {
        let productoCard = document.createElement('div')
        productoCard.classList.add('product-card')
        productoCard.innerHTML = `
        <img src='#' class='product-img'>
        <h5>${producto.nombre}</h5>
        <p>$${producto.precio}</p>
        <button id='${producto.id}' class='btn__add-to-cart '>Agregar a carrito</button>

        <div>
            <button class='btn__less-product' id='menos${producto.id}'>-</button>
            <span class='product_quantity'>0</span>
            <button class='btn__more-product' id='mas${producto.id}'>+</button>
        </div>
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

const manageQuantity = () => {
    const displays = document.getElementsByClassName('product_quantity')
    const botonesMas = document.getElementsByClassName('btn__more-product')
    const botonesMenos = document.getElementsByClassName('btn__less-product')
    for(boton of botonesMas) {
        boton.onclick = (e) => {
            const botonId = e.target.id
            const productoSelec = productos.find((producto) => producto.id === parseInt(botonId[3]))
            productoSelec.cantidad++
            displays[productoSelec.id - 1].innerHTML = productoSelec.cantidad
        }
    }
    
    for(boton of botonesMenos) {
        boton.onclick = (e) => {
            const botonId = e.target.id
            const productoSelec = productos.find((producto) => producto.id === parseInt(botonId[5]))
            if(productoSelec.cantidad > 0){
            productoSelec.cantidad--
            displays[productoSelec.id - 1].innerHTML = productoSelec.cantidad
            }
        }
    }
    
}


mostrarProductos(productos)
manageQuantity()
manageCartButtons()
manageCart()
removeCartItem()


// Puramente vibe de la pag
const girarVinilos = () => {  

    const buttonsVinil = document.querySelectorAll('.btn-slide')
    const vinils = document.querySelectorAll('.vinilo')
    const sound = document.getElementById('sound')
    for(let i = 0; i < buttonsVinil.length; i++) {
        buttonsVinil[i].onclick = () =>{
            vinils[i].classList.toggle('girando')
            if(sound.paused || sound.ended) {
                sound.play()
            } else {
                sound.pause()
                sound.currentTime = 0
            }
        }
    }
}



girarVinilos()

// Reseñas random Utilizando API
const resWrapper =  document.getElementById('reseñas-wrapper')

const ReseñasGenerador = () => {
    fetch('https://randomuser.me/api/?results=6')
    .then((res) => res.json())
    .then((data) => {
        const usuariosArray = data.results
        console.log(usuariosArray)

        for(let usuario of usuariosArray) {
            let userCard = document.createElement('div')
            userCard.innerHTML = `
                <img src='${usuario.picture.medium}' />
                <h6>${usuario.name.first} ${usuario.name.last}</h6>
                <p>Reseña aqui</p>
            `
            resWrapper.appendChild(userCard)
        }
    })
}
ReseñasGenerador()