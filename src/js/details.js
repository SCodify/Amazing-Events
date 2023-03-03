const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get("id")

const previousPage = params.get("prevpage")

const text = params.get("text")



const arrayEventos = data.events

let eventoSeleccionado = arrayEventos.find(evento => evento._id == id)

const containerDetail = document.querySelector(".container-details")

containerDetail.innerHTM

function mostrarEvento(container, evento) {
    container.innerHTML += `
    <div class="row m-0 px-4 py-5 justify-content-center">          
        <div class="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-11 p-0 d-flex align-self-stretch justify-content-center">
            <div class="card-event card-event-detail d-flex flex-row w-100">
                <div class="col-12 col-md-12 col-lg-8">
                    <img src=${evento.image} class="card-img-top h-100" alt="...">
                </div>
                <div class="col-12 col-sm-12 card-body p-4 d-flex flex-column justify-content-between">
                    <div class="text-container">
                        <h3 class="card-title">${evento.name}</h3>
                        <p class="card-text"><small>Date: ${evento.date}</small></p>
                        <hr>
                        <p class="card-text"><strong>Description:</strong> <em>${evento.description}</em></p>
                        <p class="card-text"><strong>Category:</strong> ${evento.category}</p>
                        <p class="card-text"><strong>Capacity:</strong> ${evento.capacity}</p>
                        <p class="card-text" style="${evento.assistance == undefined?'display: none;':''}"><strong>Assistence:</strong> ${evento.assistance}</p>
                        <p class="card-text" style="${evento.estimate == undefined?'display: none;':''}"><strong>Estimate:</strong> ${evento.estimate}</p>
                        <p class="card-text"><strong>Price:</strong> $${evento.price}</p>
                    </div>
                    <a class="btn btn-custom mt-4 align-self-end" href="../public/${previousPage}.html">Return ${text}</a>
                </div>
            </div>
        </div>
    </div>`
}

mostrarEvento(containerDetail, eventoSeleccionado)