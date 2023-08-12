Esto es mi primer intento de documentar una app c:

Voy a describir el "flow" de la app. a medida que aprenda como documentar esto ira cambiando.

1. Declarar la variable "productos" como un array vacio. Llamar los productos desde el achivo .JSON con fech
2.Push los nuevos producto dentro de su correspondiente array
	--NOTA--
	-Aca tuve un bug, la solucion que encontrar fue llamar las funciones mostrarProductos(), manageCartButtons() y manageCart()

3. Obtener elementos DOM importantes, Declarar y guardar en Localstorage al carrito, declarar constructor para agregar productos de forma manual con su respectiva funcion


4. Declarar funciones principales: 
	
	A) manageCart: Checkear si el carrito contiene 1 o mas productos
		true: Generar la "card" de los productos correspondientes, incluyendo su boton de "quitar"
		false: Muestra el mensaje "El carrito esta vacio"
		Por ultimo llama a la funcion removeCartItem (B)
	
	B) removeCartItems: Obtiene los botones "quitar del carrito", 
		identidica el 'click' en cada boton, su ID correspondiente al producto, encuentra al mismo y lo remueve del array 'carrito'
		actualiza el localStorage 
		limpia el contenedor de las Card, que la funcion A vuelve a llenar con los productos restantes

	C) mostrarProductos: Tomando un array de objetos como parametro, genera y adjunta las Card de cada producto

	D) addToCart: (funciona junto con la funcion E). tomando como parametro el producto seleccionado, comprueba si existe en el carrito.
		false: empuja el producto dentro del carrito
		true: encuentra el producto en el carrito y aumenta +1 la cantidad del mismo
		Por ultimo muesta una notificacion confirmando que se agrego al carrito
	
	E) manageCartButtons: Toma los botones de 'add to cart', encuentra el 'producto seleccionado' dentro del array de productos
		llama a la funcion D(addtoCart), pasando como parametro el 'producto seleccionado'
		actualiza el localStorage
	
	F) limpiarCarrito: Tengo que seguir trabajando en esta funcion

	G) filtrar: Obtiene los input de tipo 'radio'. Escucha por el evento 'change'.
		Si el elemento 'radio' se encuentra 'checked' crea un nuevo array filtrando los productos por la categoria correspondiente
		por ultimo ejecuta un switch case, dentro del cual se vuelve a ejecutar la funcion C(mostrarProductos) esta vez pasando como argumento el nuevo array que contiene los productos filtrados

5. Funciones de estetica:
	
	girarVinilos: Toma del DOM los botones, imagenes y audios correspondientes
		      Escuchando el evento 'click' reproduce y agrega || pause y quita las clases que contienen las animacions

	reseñasGenerador: utilizando una API consigue, genera cards y muestra opiniones de usuarios.

6. Llama a todas las funciones, por orden de importancia
			
 
		