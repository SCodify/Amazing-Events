const arrayEventos = data.events

let fechaActual = data.currentDate

const eventosFuturos = arrayEventos.filter((evento) => evento.date > fechaActual)

const contenedorEventos = document.querySelector(".contenedor-eventos")

function mostrarEventos(array) {
    let eventosHtml = ""
    array.forEach(evento => {
        eventosHtml += `
        <div class="col-11 col-sm-10 col-md-9 col-lg-4 col-xl-3 p-0 d-flex align-self-stretch justify-content-center">
            <div class="card-event d-flex flex-column w-100">
                <img src=${evento.image} class="card-img-top" alt="...">
                <div class="card-body p-4 d-flex flex-column justify-content-between">
                    <div class="text-container">
                        <h5 class="card-title">${evento.name}</h5>
                        <p class="card-text">${evento.description}</p>
                    </div>
                    
                    <div class="btn-bottom d-flex justify-content-between align-items-center mt-3">
                        <p class="m-0">Price: $${evento.price}</p>
                        <a class="btn btn-custom" href="../public/details.html?id=${evento._id}&prevpage=index&text=Home">See more...</a>
                    </div>
                </div>
            </div>
        </div>`
    })
    return eventosHtml
}

contenedorEventos.innerHTML = mostrarEventos(eventosFuturos)



/* CATEGORÌAS -------------------------------------------------------------------------------------- */

/* 1° crear un array de string con las categorías de data.events */

const arrayCategorias = arrayEventos.map(evento => evento.category)


/* 2° crear un array reducido del array de categorías en el que se eliminen las categorías repetidas */

const arrayCategoriasSinRepetir = arrayCategorias.reduce((acumulador, valorActual) => {
    if(!acumulador.includes(valorActual)) {
        acumulador.push(valorActual)
    }
    return acumulador
}, [])


/* 3° hacer la lógica para que se muestren sobre el DOM los elementos de array de categorìas si repetir */

const contenedorCategorias = document.querySelector(".contenedor-categorias")


function mostrarCategorias(arrayCategorias){
    let categorias = ""
    
    let idNumber = 1
    
    arrayCategorias.forEach(evento => {
        categorias += `
            <div class="form-check form-check-inline m-0">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox${idNumber}" value="${evento}">
                <label class="form-check-label" for="inlineCheckbox${idNumber}">${evento}</label>
            </div>
        `

        idNumber ++
    })
    return categorias
}

let htmlCategorias = mostrarCategorias(arrayCategoriasSinRepetir)

contenedorCategorias.innerHTML = htmlCategorias

/* Filtrar las categorías y busqueda */

function mostrarEventosFiltrados(arrayEventos, categoriasFiltradas, eventosBuscados) {
    let htmlFiltrado = "";
    let eventosFiltradosPorCategoria = arrayEventos.filter(evento => categoriasFiltradas.includes(evento.category))

    console.log(eventosFiltradosPorCategoria);
    if(eventosBuscados.length == 0){
        htmlFiltrado = mostrarEventos(eventosFiltradosPorCategoria)
        contenedorEventos.innerHTML = mostrarEventos(eventosFiltradosPorCategoria)  
    } else if(categoriasFiltradas.length == 0) {
        let eventosFiltradosPorBusqueda = arrayEventos.filter(evento => eventosBuscados.includes(evento.name))
        htmlFiltrado = mostrarEventos(eventosFiltradosPorBusqueda)
        contenedorEventos.innerHTML = mostrarEventos(eventosFiltradosPorBusqueda)
    } else {
        let categoriasFiltradosPorBusqueda = eventosFiltradosPorCategoria.filter(evento => eventosBuscados.includes(evento.name))
        htmlFiltrado = mostrarEventos(categoriasFiltradosPorBusqueda)
        contenedorEventos.innerHTML = mostrarEventos(categoriasFiltradosPorBusqueda)
    }
}

/* Escuchar cambios en los checkbox de categorías */

let categoriasSeleccionadas = []

contenedorCategorias.addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        if (event.target.checked) {
            categoriasSeleccionadas.push(event.target.value)
        } else {
            categoriasSeleccionadas = categoriasSeleccionadas.filter(categoria => categoria != event.target.value)
        }    
        if(categoriasSeleccionadas.length != 0) {
            mostrarEventosFiltrados(arrayEventos, categoriasSeleccionadas, arrayEventosBuscados)
        } else {
            if (arrayEventosBuscados.length == 0) {
                contenedorEventos.innerHTML = mostrarEventos(arrayEventos)
            } else {
                mostrarEventosFiltrados(arrayEventos, categoriasSeleccionadas, arrayEventosBuscados)
            }

        }
    }
})

/* Buscar evento*/

let arrayEventosBuscados = []

const buscador = document.querySelector(".buscador")
buscador.addEventListener('input', function() {
    const valorBuscado = buscador.value.toLowerCase();
    
    arrayEventosBuscados = arrayEventos.filter(function(item) {
      return item.name.toLowerCase().includes(valorBuscado);
    });
    
    arrayEventosBuscados = arrayEventosBuscados.map(eventos => eventos.name)
    if(arrayEventosBuscados.length == 0) {
        contenedorEventos.innerHTML = `<p class="text-center text-danger">The event "<strong>${ buscador.value }</strong>" was not found.</p>`
    } else {
        console.log("arrayEventosBuscados: ", arrayEventosBuscados); 
        mostrarEventosFiltrados(arrayEventos, categoriasSeleccionadas, arrayEventosBuscados)
    }
});