# Jump2Digital Alentadev

Proyecto prueba para el hackathon backend de Jump2Digital. Consiste en crear una API que permita a las personas usuarias consultar, adquirir, modificar y eliminar skins por
un videojuego.

## Patrón y Tecnologías

Para este proyecto he utilizado el patron **MVC** y las tecnologías:

- **NodeJs (express)**
- **MySql**

## Estructura de Datos

Tenemos 2 archivos JSON para los users ```src/database/users.json``` y para los skins disponibles para comprar ```src/database/skins.json```. Guardaremos los skins comprados en la BBDD ```src/database/skinsdb.sql```

### Users

- id: int 
- name: string
- email: string
- coins: int 
- token: string

### Skins disponibles

- id: int
- skinName: string
- category: string
- types: []string
- colors: []string
- price: int

### Skins DDBB

- id: int
- skin_id: int
- user_id: int
- name: string
- category: string
- type: string
- color: string
- price: int

## ¿Cómo funciona la api?

Hay 2 rutas GET públicas y el resto son privadas de cada usuario. 

### Públicas

- ```GET /skins/avaible``` - Fácil enviamos la petición get y nos devolverá un array con las **skins disponibles**.
- ```GET /skins/getskin/{id}``` - Lo mismo que la anterior y nos devolverá el **skin** elegido por su **id**.

### Privadas

Estas rutas por su naturaleza pasan por un middleware de autenticación ```src/middleware/auth/userExtractor.js```. Para ello he utilizado **JasonWebToken** y hay que pasarselo por el header de **Authorization** en formato **Token Bearer**. 

Pero no te preocupes que en el archivo de los usuarios ```src/database/users.json``` cada uno tiene su token que contiene su id. Además en el ```.env.example``` tienes el **JWT_PRIVATE_KEY** para que pueda desencriptarlo, la key es "12345678".

Bien resumiendo el middleware extrae la id del usuario del **JWT**. Con la id recuperamos el **user** y lo añadimos a la propiedad de la request ```req.user``` para poderlo usar más adelante.

#### Rutas

- ```POST /sins/buy``` - Para esta ruta hay que enviarle un body en formato **JSON** que contenga la **id**, el **tipo** y el **color** de la **skin deseada**. El tipo y el color deben estar **disponibles**, dentro de los arrays **colors y types** del skin. Además el usuario tiene que tener suficientes **coins** para poderlo comprar.

```
{
  "id": 1,
  "type": "Enano",
  "color": "negro"
}
```

- ```PUT /skins/color``` - El body a enviar para esta ruta será en formato **JSON** y contendrá la **id** y el **nuevo color** de la **skin comprada**. Nuevamente el color debe estar disponible para esa skin y no se puede cambiar al mismo color que ya tenía.

```
{
  "id": 1,
  "newColor": "azul oscuro"
}
```

- ```GET /skins/myskins``` - Esta es sencilla le enviaremos la petición junto con el **JWT** descrito anteriormente. Si es correcto devolverá todos los **skins comprados** por este **usuario**.

- ```DELETE /skins/delete/{id}``` - Aquí la api comprobará que el **id** coincide con un **skin comprado**. Certificará que el skin pertenece al **usuario** y lo borrará.

## Instrucciones para 