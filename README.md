<h3 align="center">Registra tus vinos favoritos</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

<!-- [![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE) -->

</div>

---

<p align="center"> Esta aplicación construída en React usando el stack MERN, te permite registrar, visualizar, editar y eliminar tus vinos. Es un CRUD funcional.
    <br> 
</p>

## 📝 Tabla de Contenidos

<!-- - [Deployment](#deployment) -->

- [Acerca de](#about)
- [Empecemos](#getting_started)
- [Tecnologías usadas](#built_using)
- [Autor](#authors)
  <!-- - [TODO](../TODO.md) -->
  - [Deployment](#deploy)
    <!-- - [Contributing](../CONTRIBUTING.md) -->
    <!-- - [Acknowledgments](#acknowledgement) -->

## 🧐 Acerca de <a name = "about"></a>

Si tienes curiosidad, te invito a registrarte, iniciar sesión, y registrar tu primer vino. Puedes añadir la foto del vino desde tu ordenador (.jpg o .png), y podrás verla al hacer click en la table donde se muestran todos los vinos.

## 🏁 Empecemos <a name = "getting_started"></a>

### Instalación

Crea una carpeta donde desees instalar el proyect. Usando la terminal, ve hasta la ruta de esa carpeta y haz un clon del proyecto, mediante:

```
git clone https://github.com/juancgalueweb/wines-blog.git
```

En la raíz de la carpeta hay un archivo `Makefile` con una serie de tareas para que fácilmente puedas crear las imágenes de Docker y correr los contenedores con solo escribir lo siguiente: <br>
`make build-dev` <br>
`make run-dev` <br>

Con este podrás correr el proyecto en el modo de desarollo (base de datos dentro del contenedor).

Si se fijan, en el archivo `docker-compose-dev.yml`, expuse el puerto 27020 para que puedan conectarse a la base de datos desde el contenedor. Ejemplo, usando MongoDB Compass, te puedes conectar a la base de datos desde la siguiente URI: `mongodb://localhost:27020`

### Prerequisitos

Este proyecto está dockerizado, por lo que debes tener instalado Docker.

Las imágenes que subas a la app, se almacenan en AWS S3, y en la base de datos de MongoDB solo se almacena la `key` de esa imagen, para poder luego descagarla, eliminarla, etc. Por lo tanto, también debes tener una cuenta de AWS, crear un bucket en S3, generar políticas para el bucket para poder obtener un objeto, actualizarlo y borrarlo, y dar permiso a tu servidor Express para que se conecte con AWS mediante la creación de un usuario desde IAM (Identity and Access Management).

Deberás crear varios archivos de variables de enterno. En la ruta `server/config/`, debes crear un `.env.dev`, con la siguiente data:

```
SECRET_KEY="tu-llave-secreta-de-json-web-token"
MONGO_URI="mongodb://mongo/NOMBRE_BASE_DE_DATOS"
AWS_BUCKET_NAME="NOMBRE_DE_TU_BUCKET"
AWS_BUCKET_REGION="BUCKET_REGION"
AWS_ACCESS_KEY="ID_CLAVE_DE_ACCESO_AWS"
AWS_SECRET_KEY="LLAVE_SECRETA_DE_AWS"
```

En la carpeta `client`, debes crear un `.env.development`, con la siguiente data:

```
REACT_APP_BASE_URL=http://localhost:8000/api
```

Usamos el puerto 8000, porque en la ruta `server/server.js` definimos que ese era nuestro número de puerto.

Si quieres usar el modo local del proyecto, que crea la carpeta build que genera React, y que permite manejar la base de datos desde la web usando MongoDB Atlas, y probar que todo funcione bien antes de hacer el deployment, en la carpeta raíz del proyecto escriba en la terminal: <br>
`make build-local` <br>
`make run-local` <br>

Debes tener una cuenta en MongoDB Atlas, crear un proyecto, crear un cluster, crear un acceso a la base de datos mediante la creación de un usuario, definir las direcciones IP desde donde tendrá acceso su aplicación. Para este caso, dar acceso desde 0.0.0.0/0 (todas las IPs).

En la ruta `server/config/`, debes crear un `.env.local`, con la siguiente data:

```
SECRET_KEY="tu-llave-secreta-de-json-web-token"
MONGO_URI="mongodb+srv://<user_name>:<password>@cluster0.raacepp.mongodb.net/?retryWrites=true&w=majority"
AWS_BUCKET_NAME="NOMBRE_DE_TU_BUCKET"
AWS_BUCKET_REGION="BUCKET_REGION"
AWS_ACCESS_KEY="ID_CLAVE_DE_ACCESO_AWS"
AWS_SECRET_KEY="LLAVE_SECRETA_DE_AWS"
```

## ⛏️ Tecnologías usadas <a name = "built_using"></a>

- <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" alt="MongoDB icon" style="display: inline-block; width: 40px"> [MongoDB](https://www.mongodb.com/) - Database
- <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="ExpressJS icon" style="display: inline-block; height: 20px"> [Express](https://expressjs.com/) - Server Framework
- <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="ReactJS icon" style="display: inline-block; width: 20px"> [React](https://reactjs.org/) - Web Framework
- <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="NodeJS icon" style="display: inline-block; width: 20px"> [NodeJs](https://nodejs.org/en/) - Server Environment
- <img src="https://upload.wikimedia.org/wikipedia/commons/7/79/Docker_%28container_engine%29_logo.png" alt="Docker icon" style="display: inline-block; width: 40px"> [Docker](https://www.docker.com/) - Package Software into Standardized Units for Development, Shipment and Deployment

- <img src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Amazon-S3-Logo.svg" alt="AWS s3 logo" style="display: inline-block; width: 15px"> [AWS S3](https://aws.amazon.com/es/s3/) - Object storage through a web service interface

## ✍️ Authors <a name = "authors"></a>

- [@juancgalueweb](https://github.com/juancgalueweb/) - Idea y desarrollo del código.

## 🚀 Deployment <a name = "deploy"></a>

Pueden acceder a la app desde el siguiente sitio web:
[https://mywines.juancgalue-web.cl/](https://mywines.juancgalue-web.cl/home)
