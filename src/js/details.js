const containerDetail = document.querySelector(".container-details")

const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get("id")

const previousPage = params.get("prevpage")

const text = params.get("text")

async function obtenerdatos() {
    try {
        /* const response = await fetch("/src/data/data.json") */
        const response = await fetch("https://mindhub-xj03.onrender.com/api/amazing") 
        const datos = await response.json()
        
        const arrayEventos = datos.events
        
        let eventoSeleccionado = arrayEventos.find(evento => evento._id == id)
        
        mostrarEvento(containerDetail, eventoSeleccionado)
    } catch(error) {
        console.log(error.message);
    }
}

obtenerdatos()

function mostrarEvento(container, evento) {
    container.innerHTML += `
    <div class="row m-0 px-4 py-5 justify-content-center">          
        <div class="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-11 col-xxl-12 p-0 d-flex align-self-stretch justify-content-center">
            <div class="card-event card-event-detail d-flex flex-row w-100">
                <div class="col-12 col-md-12 col-lg-8 col-xl-6">
                    <img src=${evento.image} class="card-img-top h-100" alt="...">
                </div>
                <div class="col-12 col-sm-12 col-xl-6 card-body p-4 d-flex flex-column justify-content-between">
                    <div class="text-container">
                        <h3 class="card-title">${evento.name}</h3>
                        <p class="card-text"><small>Date: ${evento.date}</small></p>
                        <hr>
                        <p class="card-text"><strong>Description:</strong> <em>${evento.description}</em></p>
                        <p class="card-text"><strong>Category:</strong> ${evento.category}</p>
                        <p class="card-text"><strong>Place:</strong> ${evento.place}</p>
                        <p class="card-text"><strong>Capacity:</strong> ${formatearNumero(evento.capacity)}</p>
                        <p class="card-text" style="${evento.assistance == undefined?'display: none;':''}"><strong>Assistence:</strong> ${formatearNumero(evento.assistance)}</p>
                        <p class="card-text" style="${evento.estimate == undefined?'display: none;':''}"><strong>Estimate:</strong> ${formatearNumero(evento.estimate)}</p>
                        <p class="card-text"><strong>Price:</strong> ${formatearAPesos(evento.price)}</p>
                    </div>
                    <a class="btn btn-custom mt-4 align-self-end" href="../public/${previousPage}.html">Return to ${text}</a>
                </div>
            </div>
        </div>
    </div>`
}

function formatearAPesos(monto) {
    const montoFormateado = new Intl.NumberFormat("es-AR",{
      style: "currency",
      currency: "ARS"
    }).format(monto)
  
    return montoFormateado
}

function formatearNumero(numero) {
    const numeorFormateado = new Intl.NumberFormat("es-AR", {
        maximumFractionDigits: 3,
        }).format(numero)
    
    return numeorFormateado
}