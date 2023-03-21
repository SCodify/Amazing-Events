let tablaEstadisticas = document.querySelector(".event-statics")
let tablaPasados = document.querySelector(".past-events-statistic")
let tablaFuturos = document.querySelector(".upcoming-events-statistics")

async function obtenerDatos() {
    try {
        /* const response = await fetch("/src/data/data.json") */
        const response = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
        const datos = await response.json()
    
        const fechaActual = datos.currentDate
        const arrayEventos = datos.events
        
        const eventosFuturos = arrayEventos.filter((evento) => evento.date > fechaActual)
        const eventosPasados = arrayEventos.filter((evento) => evento.date < fechaActual)
        
        const mayorPasados = calcularEventoConMayorPorcentajeAsistencia(eventosPasados)
        const menorPasados = calcularEventoConMenorPorcentajeAsistencia(eventosPasados)
        const mayorCapacidad = calcularEventoConMayorCapacidad(eventosPasados)
        
        const categoriasFuturos = obtenerCategorias(eventosFuturos)
        const categoriasPasados = obtenerCategorias(eventosPasados)

        const ingresosAsistenciaFuturos = calcularIngresoAsistenciaPorCategoria(eventosFuturos, categoriasFuturos)
        const ingresosAsistenciaPasados = calcularIngresoAsistenciaPorCategoria(eventosPasados, categoriasPasados)
        
        crearTablaCategorias(ingresosAsistenciaFuturos, tablaFuturos)
        crearTablaCategorias(ingresosAsistenciaPasados, tablaPasados)

        crearTablaEstadisticas(mayorPasados, menorPasados, mayorCapacidad, tablaEstadisticas)

    } catch (error) {
        console.log(error.message)
    }
}

obtenerDatos()

function obtenerCategorias(array) {
    return (array.map(evento => evento.category)).reduce((acumulador, valorActual) => {
        if(!acumulador.includes(valorActual)) {
            acumulador.push(valorActual)
        }
        return acumulador
    }, [])
}

function calcularEventoConMayorPorcentajeAsistencia(array){
    let elMayor = array.reduce((acumulador, valorActual)=>{
        return (acumulador.assistance * 100) / acumulador.capacity > (valorActual.assistance * 100) / valorActual.capacity ? acumulador : valorActual
    })
    return elMayor
}

function calcularEventoConMenorPorcentajeAsistencia(array){
    let elMenor = array.reduce((acumulador, valorActual)=>{
        return (acumulador.assistance * 100) / acumulador.capacity < (valorActual.assistance * 100) / valorActual.capacity ? acumulador : valorActual
    })
    return elMenor
}

function calcularEventoConMayorCapacidad(array){
    let mayorCapacidad = array.reduce((acumulador, valorActual)=>{
        return acumulador.capacity > valorActual.capacity ? acumulador : valorActual
    })
    return mayorCapacidad
}

function calcularIngresoAsistenciaPorCategoria(arrayDeEventos, arrayDeCategorias) {
    /* Calculo de promedio de porcentajes */
    let datos = []
    arrayDeCategorias.forEach(element => {
        let porcentajes = []
        let ganancias = []
        arrayDeEventos.forEach(evento => {
            if (evento.category.includes(element)) {
                if (evento.assistance != undefined) {
                    ganancias.push(evento.price*evento.assistance)
                    porcentajes.push((evento.assistance * 100) / evento.capacity)
                } else {
                    ganancias.push(evento.price*evento.estimate)
                    porcentajes.push((evento.estimate * 100) / evento.capacity)
                }
            }  
        })
        let ganancia = 0
        let porcentaje = 0
        
        ganancias.forEach(item => ganancia += item)

        porcentajes.forEach(item => porcentaje += item)
        datos.push({
            categoria: element,
            ganancia: formatearAPesos(ganancia),
            porcentajeDeAsistencia: (porcentaje / porcentajes.length).toFixed(2)
        })
    })
    return datos

    /* Calculo de porcentaje */
    /* let datos = []
    arrayDeCategorias.forEach(element => {
    let ganancias = []
    let totalAsistencia = 0
    let totalCapacidad = 0
    arrayDeEventos.forEach(evento => {
        if (evento.category.includes(element)) {
            if (evento.assistance != undefined) {
                ganancias.push(evento.price*evento.assistance)
                totalAsistencia += evento.assistance
                totalCapacidad += evento.capacity
            } else {
                ganancias.push(evento.price*evento.estimate)
                totalAsistencia += evento.estimate
                totalCapacidad += evento.capacity
            }
        }
    })
        let ganancia = 0

        ganancias.forEach(item => ganancia += item)

        datos.push({
            categoria: element,
            ganancia: formatearAPesos(ganancia),
            porcentajeDeAsistencia: ((totalAsistencia * 100) / totalCapacidad).toFixed(2)
        })
        console.log(datos);
    })  
    return datos */
}

function formatearAPesos(monto) {
    const montoFormateado = new Intl.NumberFormat("es-AR",{
      style: "currency",
      currency: "ARS"
    }).format(monto)
  
    return montoFormateado
}

function crearTablaCategorias(array, contenedor) {
    let tablaHtml = ""
    array.forEach(elemento => {
        tablaHtml += `
        <tr>
            <td>${elemento.categoria}</td>
            <td>${elemento.ganancia}</td>
            <td>${elemento.porcentajeDeAsistencia}%</td>
        </tr>
        `
    })
    contenedor.innerHTML = tablaHtml
}

function crearTablaEstadisticas(mayor, menor, capacidad, contenedor) {
    let tablaHtml = ""

    const capacidadFormateada = new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 3,
    }).format(capacidad.capacity)
    
    tablaHtml = `
    <tr>
        <td>${mayor.name} (${((mayor.assistance * 100) / mayor.capacity).toFixed(2)}%)</td>
        <td>${menor.name} (${((menor.assistance * 100) / menor.capacity).toFixed(2)}%)</td>
        <td>${capacidad.name} (${capacidadFormateada})</td>
    </tr>
    `

    contenedor.innerHTML = tablaHtml
} 