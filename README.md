# Introduction to JavaScript Development [FE03-TT] - Amazing Events

## Tabla de contenido
- [Task 1](#task-1)
    - [Requerimientos del cliente](#task-1)
    - [Mockup](#mockup)
        - [Home](#home)
        - [Events](#events)
        - [Contact](#contact)
        - [Details](#details)
        - [Stats](#stats)
    - [Datos task 1](#datos-task-1)
    - [Entrega task 1](#entrega-task-1)
- [Task 2](#task-2)
    - [Requerimientos del cliente](#task-2)
    - [Datos task 2](#datos-task-2)
    - [Entrega task 2](#entrega-task-2)
- [Task 3](#task-3)
    - [Requerimientos del cliente](#task-3)
    - [Datos task 3](#datos-task-3)
    - [Sugerencias task 3](#sugerencias-task-3)
    - [Entrega task 3](#entrega-task-3)

# Task 1

## Requerimientos del cliente:

> Hola,  
¡Bienvenidos a Web Code! Este es un momento emocionante para que te incorpores, ya que tiene varios proyectos nuevos en cartera como "Amazing Events".  
La idea es desarrollar desde cero la app, pero antes necesitamos que nos envíes algunos ejercicios sobre javascript para ver tus habilidades en ese lenguaje.  
Sé que te quiero en este proyecto, pero todavía estoy trabajando con Amazing Events para aclarar qué les gustaría que hiciéramos para ellos. Me reuniré con ellos esta semana, así que pronto tendremos más detalles Vienes a nosotros recomendado como un experto en HTML/CSS, lo cual es estupendo.  
Mientras trabajo con Amazing Events en los objetivos de su proyecto, me gustaría que repasaras tu JavaScript y te prepararas para sorprendernos a todos.

## Mockup

### Home:
![](./mockup/HOME.png)

### Events:
- Tenga en cuenta que es una página para Upcoming Events y otra para los Past Events con el mismo diseño

![](./mockup/EVENTS.png)
### Contact:
![](./mockup/CONTACT.png)

### Details:
![](./mockup/DETAILS.png)

### Stats:
![](./mockup/STATS.png)

## Datos task 1

Cada evento contiene los siguientes datos:
* Nombre.
* Fecha.
* Descripción.
* Categoría.
* Lugar.
* Capacidad.
* Asistencia o presupuesto.
* Precio.

## Entrega task 1
- Debe tener los 6 HTML (Home, Upcoming Events, Past Events, Contact, Details, Stats) previamente presentados en mockups.

- Tu navBar debe estar funcionando y debes poder navegar entre las diferentes páginas. 

- Evita tener errores del Validador.

- Estructura correctamente la carpeta de tu proyecto y define correctamente los nombres de cada uno de los archivos.

    Estructura de archivos del proyecto:
    ```
    Amazing-Events/
    ├── assets
    │   └── images/
    ├── public/
    │   ├── index.html
    │   ├── contact.html
    │   ├── details.html
    │   ├── past.html
    │   ├── stats.html
    │   └── upcoming.html
    ├── src/
    │   ├── js/
    │   │   └── index.js
    │   └── css/
    │       └── styles.css
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── README.md
    ```

- Puedes utilizar tu propio CSS o la librería que prefieras, si lo haces con una librería, asegúrate de que tu proyecto te representa, es decir, que los componentes no son idénticos a los que se encuentran en la librería.

- Incorpora el logo y el favicon en tu página.

- El detalle en las fichas que se encuentran en Home o Upcoming Events y Past Events debe ser menor que el que encontramos en Details, esto es debido a que esta última completa toda la información del evento y las anteriores son resúmenes o introducción del evento.

- Utiliza las fotos que te enviamos para hacer las fichas de los eventos.

- Distribuye correctamente los espacios y ten en cuenta que este proyecto será full responsive.

# Task 2

## Requerimientos del cliente:

> Hola de nuevo,  
Amazing Events nos ha enviado un archivo, con una muestra de cómo se almacenan los datos en su base de datos. Nos han pedido que incluyamos estos datos en el proyecto para poder hacer una muestra de progreso funcional.  
Los entregables están relacionados con esta nueva información. ¡Vamos a seguir adelante y añadir un poco de dinamismo al proyecto!  
A continuación, te enviaré un archivo .zip con la información que nos envió el cliente para que comiences a dinamizarlo utilizando el poder de javascript.

## Datos task 2

El archivo que le enviamos contiene información sobre los eventos, dos eventos por cada una de las categorías, y una fecha base que es necesaria para determinar si los sucesos fueron anteriores o posteriores a esta fecha, es decir, si fueron pasados o futuros.

## Entrega task 2

- Con la información de los eventos enviada por el cliente tendrá que reemplazar las cards estáticas de sus páginas Home, Past Events y Upcoming Events.

- Tendrá que recorrer el array de eventos y obtener la fecha base o de referencia por un por un lado y los eventos por el otro.

- Para su página de Home el bucle deberá generar una plantilla dinámica, con tantos datos como objetos contenidos en el array, es decir, si el array contiene 14 datos el bucle generará 14 plantillas.

- Para las páginas Past Events y Upcoming Events el bucle debe devolver 7 datos antes de la fecha base y 7 datos después de la fecha base.

- Una vez generadas las plantillas, imprímalas en su HTML correspondiente.

- Le aconsejamos que genere un archivo JS para cada página HTML, de esta forma la información estará más organizada y será más fácil hacer escalable tu aplicación.

    Nueva estructura de archivos del proyecto:
    ```
    Amazing-Events/
    ├── assets
    │   └── images/
    ├── public/
    │   ├── index.html
    │   ├── contact.html
    │   ├── details.html
    │   ├── past.html
    │   ├── stats.html
    │   └── upcoming.html
    ├── src/
    │   ├── js/
    │   │   ├── data.js
    │   │   ├── index.js
    │   │   ├── past.js
    │   │   └── upcoming.js
    │   └── css/
    │       └── styles.css
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── README.md
    ```

# Task 3

## Requerimientos del cliente:

> Hola de nuevo, en Amazing Events solicitan que incorporemos filtros en los proyectos, requieren un filtro de búsqueda por texto y filtros por categorías de eventos.  
Los filtros deben ser incorporados en la página de Home, Past Events y Upcoming Events.  
Adicionalmente, requieren que el detalle del evento también pueda ser utilizado. Con tus habilidades confiamos en que puedas lograrlo.

## Datos task 3

Revise de nuevo las maquetas que enviamos anteriormente para incorporar los solicitados por nuestros clientes, tenga en cuenta que los mismos deben estar presentes en las páginas Past Events y Upcoming Events.

## Sugerencias task 3

- Incorpore entradas de búsqueda y casillas de verificación de categorías en sus páginas de Home, Past Events y Upcoming Events.

- Te aconsejamos que empieces por el input de búsqueda, capturando los datos que el usuario teclee en este, ordenando la cadena que has capturado y pasándola a minúsculas, después filtra estos datos con el nombre del evento del fichero de datos también pasado a minúsculas para igualar los valores y finalmente guarda el array resultante del filtro para mostrarlo en tu html.

- Para las casillas de verificación, te aconsejamos que extraigas las categorías dinámicamente del fichero de datos del evento, elimines las repetidas para obtener un único valor para cada una y luego con el array resultante del filtro lo muestres en tu html.  

- Para que los filtros funcionen en combinación, defina condicionales que evalúen si la entrada tiene un valor o si las casillas de verificación están marcadas.


## Entrega task 3

- Incorporar filtros por input search y checkbox por categorías.

- Los filtros deben funcionar tanto de forma independiente como combinada.

- En caso de que no se encuentre ningún evento con los filtros, se debe pedir al usuario que ajuste los filtros para encontrar un evento.

- Los filtros deben estar presentes en las páginas Home, Past Events y Upcoming Events.

- Al hacer clic en la ficha del evento, éste debe aparecer en la página Details.

    Se agrega `details.js` a la estructura de archivos del proyecto:
    ```
    Amazing-Events/
    ├── assets
    │   └── images/
    ├── public/
    │   ├── index.html
    │   ├── contact.html
    │   ├── details.html
    │   ├── past.html
    │   ├── stats.html
    │   └── upcoming.html
    ├── src/
    │   ├── js/
    │   │   ├── data.js
    │   │   ├── index.js
    │   │   ├── past.js
    │   │   └── upcoming.js
    │   └── css/
    │       └── styles.css
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── README.md
    ```
