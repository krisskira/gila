# Gila Prueba de Ingreso

## Backend

### Como iniciar el proyecto.

- Dirijase a la carpera de [`backend`](backend/)

- Una ves haya clonado el proyecto debe instalar los modulos corriendo el comando de `yarn install` o `npm install`.

- Notara que podria llegar a ser necesario modificar el archivo `.env` dependiendo de las configuraciones que desee manejar:

<code>

    # Archivo .env

    DEBUG=1
    ENABLE_DATABASE_LOGGER=0
    PORT=5500
    SERVER_DOMAIN=http://localhost
    TZ='America/Bogota'

</code>

#### **IMPORTANTE:**
Podra ver la documentacio de la API una ves el backend este corriendo en el enlace: [http://localhost:5500/api/v1.0/docs/](http://localhost:5500/api/v1.0/docs/)

- Los archivos del frontend se encuentran compilado en la carpeta de `build/statics/` si se le hace necesario realizar alguna modificacion o revisar la  implemtación puede verlos en la carpera de [frontend](frontend/). _en esa carpeta podra encontrar los archivos en react usando vite._

## Frontend

- Para ver el proyecto de front debe ubicarce dentro de la carpeta [frontend](frontend/)
- El proyecto esta construido en ReactJS usando vite, para compilar el proyecto en modo desarrallo solo debe correr el comando `yarn dev` o `npm run dev` y para modo producción corra el comando `yarn buil` luego mueva los archivos estaticos generados a la carpera del proyecto de [`backend`](backend/).
- para cambiar la url de la API debe modificar el contenido del archivo `.env` y establecer el la variable de entorno `VITE_SERVER_URL` la url del API.


## A tener en cuenta.

No olvide que si quiere correr toda la app, tanto el frontend como el backend, debera hacerlo en dos terminales y tener en cuenta el modificar si es necesario los archivos `.env`
