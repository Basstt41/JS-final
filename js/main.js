// Libreria slider
const slider = new KeenSlider("#my-keen-slider", {
    loop: true,
})

let productos = []

fetch("./js/componentes-js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = [...data]
        mostrarProductos(productos)        
        manageCartButtons()
        manageCart()
})

// Elementos DOM
const contenedorProductos = document.getElementById('productos__card-container')
const carritoContainer = document.getElementById('carrito')


// TO-DO

// Proceso de registro || no estoy seguro de terminarlo antes de la entrega final
// Rediseño de la ruta del carrito: Add-to-cart => swal con cantidad y foto extra(o no), descripcion, etc => carrito
// Completar scss para version desktop
// Acomodar las imagenes de portada
// Botones para el slider en desktop 
// LAS SUGERENCIAS SON BIENVENIDAS




const carrito = JSON.parse(localStorage.getItem('carrito')) || []

class Producto {
    constructor(id, nombre, img, precio, categoria, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.img = `./Recursos/imgs/ProductosPNG/${img}.png`;
        this.precio = precio;
        this.categoria = categoria;
        this.cantidad = cantidad;
    }
}

const addProducto = (array, id, nombre, img, precio, categoria, cantidad) => {
    const nuevoProducto = new Producto(id, nombre, img, precio, categoria, cantidad);
    array.push(nuevoProducto)
}





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
            const productoId =  parseInt(e.target.id)
            const indexProducto = carrito.findIndex(prod => prod.id === productoId)
            const carritoContainer = document.getElementById('carrito')
            carrito.splice(indexProducto, 1)
            localStorage.setItem('carrito', JSON.stringify(carrito))
            carritoContainer.innerHTML = ''
            manageCart()
        }
    }
    
}


const mostrarProductos = (array) => {
    for(const producto of array) {
        let productoCard = document.createElement('div')
        productoCard.classList.add('product-card')
        productoCard.innerHTML = `
        <img src='${producto.img} ' class='product-img card-img-top'>
        <h5>${producto.nombre}</h5>
        <p>$${producto.precio}</p>

        <div class='product-card__buttons'>
            <button id='${producto.id}' class='btn__add-to-cart '>Add</button>
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
        title: `Se agrego ${p.nombre}`,
        timer: 1500 
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

//Filtro?? 
const filtrar = () => {
    const radioBtns = document.querySelectorAll('input[type="radio"]')
    radioBtns.forEach((filtro) => {
        filtro.addEventListener('change', function(){
            const productosContainer = document.getElementById('productos__card-container')
            if(filtro.checked) {
                productosContainer.innerHTML = ''
                const filtroSeleccionado = filtro.id
                const prodRemeras = productos.filter(prod => prod.categoria === 'remeras')
                const prodDiscos = productos.filter(prod => prod.categoria === 'discos')
                const prodPuas = productos.filter(prod => prod.categoria === 'puas')
                //console.log(prodDiscos)

                switch(filtroSeleccionado) {
                    case 'filtro_remera':
                        mostrarProductos(prodRemeras)
                        
                        break
                    case 'filtro_discos':
                        mostrarProductos(prodDiscos)
                        break
                    case 'filtro_puas':
                        mostrarProductos(prodPuas)
                        break
                    case 'filtro_todos': 
                        mostrarProductos(productos)
                }
                manageCartButtons()
                
            }
        })
    })
}



// Puramente vibe de la pag
const girarVinilos = () => {  

    const buttonsVinil = document.querySelectorAll('.btn-slide')
    const vinils = document.querySelectorAll('.vinilo')
    // const sound = document.getElementById('sound')
    const canciones = document.getElementsByClassName('canciones')
    console.log(canciones)
    for(let i = 0; i < buttonsVinil.length; i++) {
        buttonsVinil[i].onclick = () =>{
            
            // Canciones
            if(canciones[i].paused || canciones[i].ended) {
                for(let cancion of canciones) {
                    cancion.pause()
                }
                canciones[i].play()
            } else {
                canciones[i].pause()
                canciones[i].currentTime = 0
            }
            // Vinilos
            function agregarClass() {
                vinils[i].classList.add('girando')
            }
            function quitarClass() {
                vinils[i].classList.remove('girando')
            }
            canciones[i].addEventListener('play', agregarClass)
            canciones[i].addEventListener('pause', quitarClass)
            canciones[i].addEventListener('ended', quitarClass)

        }
    }
}



girarVinilos()

// Reseñas random Utilizando API
const resWrapper =  document.getElementById('reseñas-wrapper')

//Creo que no esta bien esta funcion, pero anda. no lo se.
const ReseñasGenerador = async () => {
    await fetch('https://randomuser.me/api/?results=3')
    .then((res) =>  res.json())
    .then((data) => {
        const usuariosArray = data.results
       // console.log(usuariosArray)

        for(let usuario of usuariosArray) {
            let userCard = document.createElement('div')
            userCard.innerHTML = `
                <img src='${usuario.picture.medium}' />
                <h6>${usuario.name.first} ${usuario.name.last}</h6>
                <p>Reseña aqui</p>
            `
            userCard.classList.add('resCard')
            resWrapper.appendChild(userCard)
        }
    })
}



manageCartButtons()
manageCart()
removeCartItem()
filtrar()
ReseñasGenerador()
