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

- ```GET /skins/avaible``` - Enviamos la petición get y nos devolverá un array con las **skins disponibles**.
- ```GET /skins/getskin/{id}``` - Enviamos la petición get con la **id** y nos devolverá el **skin disponible** elegido por su **id**.

### Privadas

Estas rutas por su naturaleza pasan por un middleware de autenticación ```src/middleware/auth/userExtractor.js```. Para ello he utilizado **JsonWebToken**, hay que pasárselo por el header de **Authorization** en formato **Token Bearer**. 

Pero no te preocupes que en el archivo de los usuarios ```src/database/users.json``` cada uno tiene su token que contiene su id. Además en el ```.env.example``` tienes el **JWT_PRIVATE_KEY** para que pueda desencriptarlo, la key es "12345678".

Resumiendo, el middleware extrae la id del usuario del **JWT**. Con la id recuperamos el **user** y lo añadimos a la propiedad de la request ```req.user``` para poder usarlo más adelante.

#### Rutas

- ```POST /sins/buy``` - Para esta ruta hay que enviarle un body en formato **JSON** que contenga la **id**, el **tipo** y el **color** de la **skin deseada**. El tipo y el color deben estar **disponibles** dentro de los arrays **colors y types** del skin. Además el usuario tiene que tener suficientes **coins** para poder comprarlo.

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

- ```GET /skins/myskins``` - Enviaremos la petición junto con el **JWT** descrito anteriormente. Si es correcto devolverá todos los **skins comprados** por este **usuario**.

- ```DELETE /skins/delete/{id}``` - Aquí la api comprobará que el **id** coincide con un **skin comprado**. Certificará que el skin pertenece al **usuario** y lo borrará.

## Instrucciones para ejecutarlo

Clonamos el repositorio.

```
git clone https://github.com/Juan-Gines/jump2digital-alentadev.git 
```

Instalamos las dependencias.

```
npm install
```

Creamos la BBDD ejecutando el script sql, también le insertará unos cuantos registros para probar los endpoints.

URL del script.

```
src/database/skinsdb.sql
```

Ahora necesitamos configurar la api. Crearemos el archivo ```.env``` a partir del ```.env.example``` y cambiaremos los valores de conexión a la **BBDD** (**DB_USER**,**DB_PASSWORD** y si usas otro puerto el **DB_PORT**)

Ahora ya podemos ejecutar la api.

```
npm start
```

## Probar los endpoints

En la carpeta ```request/``` hay unos archivos con request para probar todos los endpoints. Están preparadas para la extensión **REST Client** de **Visual Studio Code**. Si no utilizas esta extensión no hay problema, te pueden servir de guía para crear tus propias request con el programa que vayas a utilizar.

## Agradecimientos

Quiero agradecer a **Jump2Digital** la oportunidad que me han brindado.

Espero que disfruteis con esta api tanto como yo desarrollandola.

Cualquier duda, aclaración o problemas enviad un email.

Juan Ginés Alentà - AlentaDev

