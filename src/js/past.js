const arrayEventos = data.events;

let fechaActual = data.currentDate;

const eventosPasados = [];

function filtrarEventosPasados(arrayEventos, fechaActual) {
    for (const evento of arrayEventos) {
        if(evento.date < fechaActual){
            
            eventosPasados.push(evento)
        }
    }
}

filtrarEventosPasados(arrayEventos, fechaActual)

const contenedorEventos = document.querySelector(".contenedor-eventos");

let eventosHtmlPasados = ""
 
function mostrarEventosPasados(arrayEventos) {
    for (const evento of arrayEventos) {
        eventosHtmlPasados += `
        <div class="col-12 col-sm-10 col-md-9 col-lg-4 col-xl-3 p-0 d-flex align-self-stretch justify-content-center">
            <div class="card-event d-flex flex-column w-100">
                <img src=${evento.image} class="card-img-top" alt="...">
                <div class="card-body p-4 d-flex flex-column justify-content-between">
                    <div class="text-container">
                        <h5 class="card-title">${evento.name}</h5>
                        <p class="card-text">${evento.description}</p>
                    </div>
                    
                    <div class="btn-bottom d-flex justify-content-between align-items-center mt-3">
                        <p class="m-0">Price: $${evento.price}</p>
                        <button class="btn btn-custom">See more...</button>
                    </div>
                </div>
            </div>
        </div>`
    }
}

mostrarEventosPasados(eventosPasados)

contenedorEventos.innerHTML = eventosHtmlPasados;