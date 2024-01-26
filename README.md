
![](https://www.sohamkamani.com/nodejs/expressjs-architecture/express-routing-logo.png)

# CRUD con Express

Este es un ejemplo de cómo implementar un CRUD (Crear, Leer, Actualizar y Eliminar) utilizando Express. 

> No database, se esta utilizando un json.
## Dependencias

- express: `npm install express -E`
- cors: `npm install cors -E`
- zod: `npm install zod -E`
## Desarrollo

Para facilitar el desarrollo y reiniciar automáticamente el servidor cuando se realizan cambios en los archivos, utilizaremos Nodemon como una dependencia de desarrollo. Para instalarlo:

```bash
npm install nodemon -D
```

Una vez instalado, podemos agregar el siguiente script en nuestro archivo package.json:

```json
"scripts": {
  "dev": "nodemon app.js"
}
```

## Endpoints

### Listas No Ordenadas

- **GET** `/users`: Obtiene todos los usuarios.
- **GET** `/users/:id`: Obtiene un usuario por su ID.
- **POST** `/users`: Crea un nuevo usuario.
- **PATCH** `/users/:id`: Actualiza un usuario existente.
- **DELETE** `/users:id`: Elimina un usuario.