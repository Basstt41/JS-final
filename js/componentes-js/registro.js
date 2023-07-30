// Tomar los botones ingreso | registro *
// escuchar cual se ejecuta*
// limpiar componente '.form-container'*
// si es ingreso form 1 | form 2 registro*

// ---- INGRESO ---
    // Mail y contraseña coincide [usuarios]
    // => index.html

// --- REGISTRO ---
    // Mail valido (.match Regex) ?
    // contraseña .length >= 7 y contiene mayuscula, minuscula, numero
    // verificar contraseña 
    // Ciudad || provincias y ciudades api??? 
    // + codigo postal ?? ojala
    // Constructor usuario con inputs
    // New usuario => [usuarios]
    // => index.html



// Elementos DOM
const formContainer = document.getElementById('form-container')
const btnIngresar = document.getElementById('ingresar-btn')
const btnRegistro = document.getElementById('registro-btn')



const usuarios = []

class Usuario {
    constructor(nombre, apellido, mail, contraseña, direccion, ciudad, codigoPostal) {
        // Puedo pasar directamente los inputs del html como This.nombre = input??
    }

}




const botonesInput = () => {
    btnIngresar.onclick = () => {
        formContainer.innerHTML = `
        <form action="/login" method="post">
            <h2>Ingreso a la Plataforma</h2>
            <label for="usuario">Usuario:</label>
            <input type="text" id="usuario" name="usuario" required>
            <label for="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" required>
            <button type="submit">Ingresar</button>
        </form>
        `
    }
    btnRegistro.onclick = () => {
        formContainer.innerHTML = `
        <form id='registro-form'>
            <h2>Registro en E-commerce</h2>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" required>
            <label for="confirmar-contrasena">Confirmar Contraseña:</label>
            <input type="password" id="confirmar-contrasena" name="confirmar-contrasena" required>
            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" name="direccion" required>
            <label for="ciudad">Ciudad:</label>
            <input type="text" id="ciudad" name="ciudad" required>
            <label for="codigo-postal">Código Postal:</label>
            <input type="text" id="codigo-postal" name="codigo-postal" required>
            <button type="submit" id='submit-btn'>Registrarse</button>
        </form>`
    }
    const submitBtn = document.getElementById('submit-btn')
    submitBtn.onclick = () => {
        const inputs = document.querySelectorAll('input')
        console.log(inputs)
    }
}

botonesInput()

