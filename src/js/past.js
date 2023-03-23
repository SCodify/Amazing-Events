const contenedorEventos = document.querySelector(".contenedor-eventos")
const contenedorCategorias = document.querySelector(".contenedor-categorias")
const buscador = document.querySelector(".buscador")

async function obtenerDatos() {
    try {
        /* const response = await fetch("/src/data/data.json") */
        const response = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
        const datos = await response.json()
        
        const fechaActual = datos.currentDate
        const arrayEventos = datos.events.filter((evento) => evento.date < fechaActual)

        contenedorEventos.innerHTML = mostrarEventos(arrayEventos)

        const arrayCategorias = obtenerCategoriasSinRepetir(arrayEventos)

        contenedorCategorias.innerHTML = mostrarCategorias(arrayCategorias)

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
                    if (arrayEventosBuscados.length == 0 && buscador.value == "") {
                        contenedorEventos.innerHTML = mostrarEventos(arrayEventos)
                    } else {
                        mostrarEventosFiltrados(arrayEventos, categoriasSeleccionadas, arrayEventosBuscados)
                    }
                }
            }
        })

        let arrayEventosBuscados = []

        buscador.addEventListener('input', function() {
            const valorBuscado = buscador.value.toLowerCase();
            
            arrayEventosBuscados = arrayEventos.filter(function(item) {
            return item.name.toLowerCase().includes(valorBuscado);
            });
            
            arrayEventosBuscados = arrayEventosBuscados.map(eventos => eventos.name)
            if(arrayEventosBuscados.length == 0) {
                contenedorEventos.innerHTML = `<p class="text-center text-danger">The event "<strong>${ buscador.value }</strong>" was not found.</p>`
            } else {
                mostrarEventosFiltrados(arrayEventos, categoriasSeleccionadas, arrayEventosBuscados)
            }
        });
    } catch(error) {
        console.log(error.message);
    }
}

obtenerDatos()

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
                        <p class="card-text"><small>Date: ${evento.date}</small></p>
                        <p class="card-text">${evento.description}</p>
                    </div>
                    
                    <div class="btn-bottom d-flex justify-content-between align-items-center mt-3">
                        <p class="m-0">Price: ${formatearAPesos(evento.price)}</p>
                        <a class="btn btn-custom" href="../public/details.html?id=${evento._id}&prevpage=past&text=Past Events">See more...</a>
                    </div>
                </div>
            </div>
        </div>`
    })
    return eventosHtml
}

function obtenerCategoriasSinRepetir(array) {
    const arrayCategorias = array.map(evento => evento.category)
    
    const arrayCategoriasSinRepetir = arrayCategorias.reduce((acumulador, valorActual) => {
        if(!acumulador.includes(valorActual)) {
            acumulador.push(valorActual)
        }
        return acumulador
    }, [])

    return arrayCategoriasSinRepetir
}

function mostrarCategorias(array){
    let categorias = ""
    
    let idNumber = 1
    
    array.forEach(evento => {
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

function mostrarEventosFiltrados(array, categoriasFiltradas, eventosBuscados) {
    let htmlFiltrado = "";
    let eventosFiltradosPorCategoria = array.filter(evento => categoriasFiltradas.includes(evento.category))
    
    if(eventosBuscados.length == 0){
        if(buscador.value == 0) {
            htmlFiltrado = mostrarEventos(eventosFiltradosPorCategoria)
            contenedorEventos.innerHTML = mostrarEventos(eventosFiltradosPorCategoria)
        }
    } else if(categoriasFiltradas.length == 0) {
        let eventosFiltradosPorBusqueda = array.filter(evento => eventosBuscados.includes(evento.name))
        htmlFiltrado = mostrarEventos(eventosFiltradosPorBusqueda)
        contenedorEventos.innerHTML = mostrarEventos(eventosFiltradosPorBusqueda)
    } else {
        let categoriasFiltradasPorBusqueda = eventosFiltradosPorCategoria.filter(evento => eventosBuscados.includes(evento.name))
        
        if(categoriasFiltradasPorBusqueda.length == 0) {
            contenedorEventos.innerHTML = `<p class="text-center text-danger">No event "<strong>${buscador.value}</strong>" has been found in the category "<strong>${categoriasFiltradas.join(", ")}</strong>".</p>`
        } else {
            htmlFiltrado = mostrarEventos(categoriasFiltradasPorBusqueda)
            contenedorEventos.innerHTML = mostrarEventos(categoriasFiltradasPorBusqueda)
        }
    }
}

function formatearAPesos(monto) {
    const montoFormateado = new Intl.NumberFormat("es-AR",{
      style: "currency",
      currency: "ARS"
    }).format(monto)
  
    return montoFormateado
}