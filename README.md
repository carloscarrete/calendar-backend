
# Calenova Backend

El backend de **Calenova** es una API RESTful desarrollada con **Node.js**, **Express** y **MongoDB**. Esta API permite gestionar usuarios, autenticación y eventos asociados a cada usuario. Es el núcleo de una aplicación de calendario que permite a los usuarios crear, actualizar y eliminar eventos.
## Características
- **Autenticación de usuarios**: Registro e inicio de sesión con nombre, email y contraseña.
- **Gestión de eventos**: Los usuarios pueden crear, actualizar y eliminar eventos.
- **Validación de tokens JWT**: Seguridad mediante tokens JWT para proteger las rutas.
- **Manejo de errores**: Validación de datos y manejo de errores en las solicitudes.
## Tecnologías utilizadas
- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para construir aplicaciones web y APIs.
- **MongoDB**: Base de datos NoSQL para almacenar datos.
- **Mongoose**: Librería para modelar objetos de MongoDB.
- **JWT (JSON Web Tokens)**: Para autenticación y autorización.
- **Bcrypt**: Para el hash de contraseñas.
- **Express Validator**: Para validar los datos de entrada en las solicitudes.
- **CORS**: Para permitir solicitudes cruzadas entre el frontend y el backend.
## Estructura del proyecto

	carloscarrete-calendar-backend/
	├── index.js
	├── package.json
	├── .env-template
	├── controllers/
	│   ├── auth.controller.js
	│   └── events.controller.js
	├── database/
	│   └── config.js
	├── helpers/
	│   ├── isDate.js
	│   └── jwt.js
	├── middleware/
	│   ├── validateToken.js
	│   └── validator.js
	├── models/
	│   ├── Event.js
	│   └── User.js
	└── routes/
	    ├── auth.js
	    └── event.js


## Instalación

1.  Clona el repositorio:

	    git clone https://github.com/carloscarrete/calendar-backend.git
    
2.  Navega al directorio del proyecto:
    
	    cd calendar-backend
    
3.  Instala las dependencias:

	    npm install
    
4.  Crea un archivo  `.env`  en la raíz del proyecto y añade tus variables de entorno:

	    PORT=3000
	    DB_CONNECTION=tu_url_de_mongodb
	    SECRET_JWT=tu_clave_secreta_jwt
    
5.  Inicia el servidor de desarrollo:

	    npm run dev
    
6.  El servidor estará corriendo en  `http://localhost:3000`.
## Endpoints
### Autenticación
-   **Registro de usuario**:  `POST /api/auth/new`    
-   **Inicio de sesión**:  `POST /api/auth/`    
-   **Renovación de token**:  `GET /api/auth/renew`    
### Eventos
-   **Obtener todos los eventos**:  `GET /api/events/` 
-   **Crear un evento**:  `POST /api/events/`    
-   **Actualizar un evento**:  `PUT /api/events/:id`    
-   **Eliminar un evento**:  `DELETE /api/events/:id`
## Ejemplos de solicitudes
### Registro de usuario

	POST /api/auth/new
	Content-Type: application/json
	 {
	    "name": "Carlos",
	    "email": "carlos@example.com",
	    "password": "password123"
	}

### Inicio de sesión
	POST /api/auth/
	Content-Type: application/json
	 {
	    "email": "carlos@example.com",
	    "password": "password123"
	}

### Crear un evento

	POST /api/events/
	Content-Type: application/json
	Authorization: Bearer <token>
	 {
	    "title": "Reunión de equipo",
	    "start": "2023-10-10T10:00:00",
	    "end": "2023-10-10T11:00:00"
	}

### Actualizar un evento
	PUT /api/events/1234567890
	Content-Type: application/json
	Authorization: Bearer <token>
	 {
	    "title": "Reunión de equipo actualizada",
	    "start": "2023-10-10T10:00:00",
	    "end": "2023-10-10T12:00:00"
	}

### Eliminar un evento

	DELETE /api/events/1234567890
	Authorization: Bearer <token>

## Contribución
Si deseas contribuir a este proyecto, sigue estos pasos:
1.  Haz un fork del repositorio.   
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).   
3.  Realiza tus cambios y haz commit (`git commit -am 'Añade nueva funcionalidad'`).    
4.  Haz push a la rama (`git push origin feature/nueva-funcionalidad`).    
5.  Abre un Pull Request.  
## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo  [LICENSE](https://license/)  para más detalles.