# Jump2Digital Alentadev

API backend creada para **Jump2Digital Barcelona 2023** que resuelve un caso de catálogo y gestión de skins de un videojuego. Es una demo autocontenida para recorrer el flujo completo: consultar el catálogo, autenticarse con un usuario de prueba, comprar una skin y gestionar las skins adquiridas.

> **Estado del proyecto:** ejercicio/demo de aproximadamente tres años de antigüedad. No está diseñado ni preparado para producción.

## Qué problema aborda

Una persona jugadora necesita descubrir skins disponibles, elegir una combinación válida de tipo y color, comprobar que dispone de monedas y administrar sus compras. La API concentra esas operaciones y aplica las reglas de validación asociadas.

| Necesidad | Respuesta de la API |
| --- | --- |
| Explorar el catálogo | Consulta del listado o de una skin concreta. |
| Comprar una skin | Validación de tipo, color y monedas antes de crear la compra. |
| Consultar las compras | Listado de skins vinculadas al usuario autenticado. |
| Personalizar o eliminar | Cambio de color válido y eliminación con comprobación de propiedad. |

## Capacidades y endpoints

La aplicación expone las rutas bajo el prefijo `/skins`.

### Públicas

| Método | Endpoint | Capacidad |
| --- | --- | --- |
| `GET` | `/skins/avaible` | Devuelve el catálogo de skins disponibles. |
| `GET` | `/skins/getskin/:id` | Devuelve una skin disponible por su identificador. |

### Protegidas con JWT

Estas rutas requieren el encabezado `Authorization` con un token Bearer válido.

| Método | Endpoint | Capacidad |
| --- | --- | --- |
| `POST` | `/skins/buy` | Compra una skin con `id`, `type` y `color`; valida las opciones del catálogo y las monedas del usuario. |
| `GET` | `/skins/myskins` | Lista las skins compradas por el usuario autenticado. |
| `PUT` | `/skins/color` | Cambia el color de una skin adquirida con `id` y `newColor`; valida propiedad, disponibilidad y que el color sea distinto. |
| `DELETE` | `/skins/delete/:id` | Elimina una skin adquirida si pertenece al usuario autenticado. |

## Recorrido de uso

1. Consultá `GET /skins/avaible` y elegí una skin junto con uno de sus tipos y colores permitidos.
2. Usá uno de los usuarios y JWT de demostración versionados como fixtures didácticos para ejecutar la demo autocontenida de inmediato. No los reutilices fuera de este entorno.
3. Enviá `POST /skins/buy` con el token y un cuerpo como este:

   ```json
   {
     "id": 1,
     "type": "Enano",
     "color": "negro"
   }
   ```

4. Consultá `GET /skins/myskins`, cambiá un color con `PUT /skins/color` o eliminá una compra con `DELETE /skins/delete/:id`.

La carpeta [`request/`](./request/) incluye peticiones para la extensión REST Client de Visual Studio Code y sirve también como referencia para otros clientes HTTP.

## Stack y estructura

- **Node.js** con **Express** para el servidor HTTP.
- **MySQL** mediante `mysql2` para persistir las skins adquiridas.
- **JSON local** para el catálogo y los usuarios de demostración.
- **JSON Web Token** para proteger las operaciones por usuario.
- **Zod** para validar las reglas de compra y cambio de color.
- **dotenv** para cargar la configuración local.

```text
src/
├── config/       # Express, entorno y conexión MySQL
├── routes/       # Definición de endpoints
├── controllers/  # Adaptación HTTP y coordinación de casos de uso
├── models/       # Catálogo JSON y consultas SQL de skins adquiridas
├── schemas/      # Validaciones de entrada y reglas de negocio
├── middleware/   # Extracción de usuario desde JWT
├── database/     # Datos demo y esquema SQL
└── errors/       # Errores HTTP
```

Las rutas y los controladores están separados del acceso a datos. Esto permite sustituir MySQL preservando el contrato HTTP, aunque esta base no pretende presentarse como Clean Architecture ni como arquitectura hexagonal estricta: el modelo actual concentra JSON, SQL y la dependencia de MySQL.

## Ejecución local y persistencia

### Requisitos

- Node.js y npm.
- Una instancia local de MySQL.

### Puesta en marcha

```bash
git clone https://github.com/Juan-Gines/jump2digital-alentadev.git
cd jump2digital-alentadev
npm install
cp .env.example .env
```

Creá el esquema y los registros iniciales ejecutando [`src/database/skinsdb.sql`](./src/database/skinsdb.sql) contra MySQL. El script recrea la base de datos `skinsdb`, por lo que debe usarse únicamente en un entorno local de demostración.

Después, configurá en `.env` los valores de servidor, conexión MySQL y secreto JWT: `URL`, `PORT`, `DB_HOST`, `DB_USER`, `DB_PORT`, `DB_PASSWORD`, `DB_NAME` y `JWT_PRIVATE_KEY`. Con el esquema preparado y esas variables configuradas, la API se ejecuta sin modificar el código:

```bash
npm start
```

Para desarrollo con recarga del proceso:

```bash
npm run dev
```

Por defecto el servidor escucha en `http://localhost:3001`.

## Datos y autenticación de demostración

- El catálogo se lee desde `src/database/skins.json`.
- Los usuarios de prueba, sus monedas y sus JWT se encuentran en `src/database/users.json`.
- Las compras se almacenan en MySQL, en la tabla `skins`, y el script SQL aporta registros iniciales.

Estos datos y JWT están versionados intencionalmente como fixtures didácticos para que la demo autocontenida funcione de inmediato. No son cuentas reales, credenciales operativas ni un mecanismo de gestión de usuarios reutilizable en producción. Este README no reproduce sus valores completos ni secretos.

## Alcance y no alcance

**Incluye:** catálogo local, autenticación JWT de prueba, compra validada, consulta de compras, cambio de color y eliminación con comprobación de propiedad.

**No incluye:** gestión real de identidades, emisión o rotación de tokens, persistencia de usuarios o monedas, control transaccional de saldo, pruebas automatizadas, observabilidad, despliegue, endurecimiento de seguridad ni garantías operativas de producción.
