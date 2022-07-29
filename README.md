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

- [About](#about)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [Authors](#authors)
  <!-- - [TODO](../TODO.md) -->
  <!-- - [Usage](#usage) -->
  <!-- - [Contributing](../CONTRIBUTING.md) -->
  <!-- - [Acknowledgments](#acknowledgement) -->

## 🧐 About <a name = "about"></a>

Si tienes curiosidad, te invito a registrarte, iniciar sesión, y registrar tu primer vino. Puedes añadir la foto del vino que vayas a registrar, vía URL, y podrás ver la foto al hacer click en la table donde se muestran todos los vinos. Esto es un trabajo en progreso, así que paciencia.

## 🏁 Getting Started <a name = "getting_started"></a>

Para usar este proyecto, simplemente has un clone del proyecto e instalando las dependencias.

### Prerequisites

Debes usar la versión de NODE 16. No uses otras versiones porque no te funcionará la aplicación. Te sugiero instalar y usar NVM, un manejador de versiones de node.

Deberás crear dos archivos de variables de enterno. En la raíz del proyecto, debes crear un `.env`, con la siguiente data:

```
SECRET_KEY="tu-llave-secreta"
LOCAL_DB_URL="mongodb://localhost/NOMBRE_BASE_DE_DATOS"
PORT=NUMERO_DE_PUERTO
```

En la carpeta `client`, debes crear un `.env.development`, con la siguiente data:

```
REACT_APP_API_URL=http://localhost:PORT/api
```

En `PORT`, debes usar el mismo puerto definido en el `.env` que debe ir en la carpeta server.

### Installing

Copia y pega lo siguiente en tu terminal. Asegúrate de que en tu terminal, estés en la ruta donde desees instalar el proyecto y sus dependencias.

```
https://github.com/juancgalueweb/wines-blog.git
```

En la carpeta `server` del proyecto, recuerda instalar todas las dependencias, usando:

```
npm install
```

También recuerda instalar las dependencias dentro de la carpeta `client`.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [React](https://reactjs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@juancgalueweb](https://github.com/juancgalueweb/) - Idea y desarrollo del código.

Gracias al equipo de Coding Dojo por toda su ayuda y mentoría.
