/*Autor: Víctor Martínez*/

import Bien from "./Bien.js"
import Circuito from "./Circuito.js"
import ClaseList from "./ClaseList.js"
import EstadoLinea from "./EstadoLinea.js"
import Interseccion from "./Intercepcion.js"
import ParejaLinea from "./ParejaLinea.js"
import Punto from "./Punto.js"
import PuntoArranque from "./PuntoArranque.js"

const PuntoArranqueController = {
    lista: [
        new PuntoArranque(new Punto(0, 1), ClaseList.fromNombre('nivel-facil')),
        new PuntoArranque(new Punto(1, 0), ClaseList.fromNombre('nivel-facil')),
        new PuntoArranque(new Punto(1, 2), ClaseList.fromNombre('nivel-facil')),
        new PuntoArranque(new Punto(2, 1), ClaseList.fromNombre('nivel-facil')),
        new PuntoArranque(new Punto(0, 0), ClaseList.fromNombre('nivel-medio')),
        new PuntoArranque(new Punto(0, 2), ClaseList.fromNombre('nivel-medio')),
        new PuntoArranque(new Punto(2, 0), ClaseList.fromNombre('nivel-medio')),
        new PuntoArranque(new Punto(2, 2), ClaseList.fromNombre('nivel-medio'))
    ],
    fromNivel: function (nivel) {
        return this.lista.filter(function (puntoArranque) {
            return puntoArranque.getNivel().toString() === nivel.toString()
        })
    }
}


const EstadoLineaController = {
    lista: [
        new EstadoLinea(ClaseList.fromNombre('ficha-x'), 114, ClaseList.fromNombre('puede-ganar')),
        new EstadoLinea(ClaseList.fromNombre('ficha-x'), 141, ClaseList.fromNombre('puede-ganar')),
        new EstadoLinea(ClaseList.fromNombre('ficha-x'), 411, ClaseList.fromNombre('puede-ganar')),
        new EstadoLinea(ClaseList.fromNombre('ficha-x'), 111, ClaseList.fromNombre('ganador')),
        new EstadoLinea(ClaseList.fromNombre('ficha-0'), 4, ClaseList.fromNombre('puede-ganar')),
        new EstadoLinea(ClaseList.fromNombre('ficha-0'), 40, ClaseList.fromNombre('puede-ganar')),
        new EstadoLinea(ClaseList.fromNombre('ficha-0'), 400, ClaseList.fromNombre('puede-ganar')),
        new EstadoLinea(ClaseList.fromNombre('ficha-0'), 0, ClaseList.fromNombre('ganador'))
    ],
    from: function (ficha, estado) {
        return this.lista.filter(e => ficha.toString() === e.getClaseFicha().toString() && e.getClaseEstado().toString() === estado.toString())
    },
    fromClase: function (clase) {
        return this.lista.filter(e => e.getClaseEstado().toString() === clase.toString())
    }
}



export default function MiniCPU(cuadricula, fichaCpu, fichaJugador, fichaEspacio, dificultad) {
    this.cuadricula = cuadricula
    this.fichaCpu = fichaCpu
    this.fichaJugador = fichaJugador
    this.fichaEspacio = fichaEspacio
    this.dificultad = dificultad
    this.circuitoLinea = null
}

MiniCPU.prototype = Object.create(MiniCPU.prototype)
MiniCPU.prototype.constructor = MiniCPU

MiniCPU.prototype.colocarFicha = function () {
    if (!this.hayEspacioDisponible()) {
        return
    }
    if (this.debeColocarPuntoArranque()) {
        this.colocarPuntoArranque()
    } else if (this.puedeGanar()) {
        this.ganar()
    } else if (this.puedeNeutralizar()) {
        this.neutralizar()
    } else if (this.puedeResponderFormaRandom()) {
        this.colocarPuntoRandom()
    } else if (this.debeHacerEstrategia()) {
        this.colocarPuntoEstrategico()
    }
}

MiniCPU.prototype.hayEspacioDisponible = function () {
    const lineas = this.cuadricula.toLineas()
    return lineas.filter(l => l.tieneEspacioDisponible()).length > 0
}

MiniCPU.prototype.finalizoJuego = function () {
    return this.hayGanador() || this.hayEmpate()
}

MiniCPU.prototype.hayGanador = function () {
    const lineas = this.cuadricula.toLineas()
    const estados = EstadoLineaController.fromClase(ClaseList.fromNombre('ganador'))
    return lineas.filter(l => estados.map(c => c.getEstado()).includes(l.toNumber())).length === 1
}

MiniCPU.prototype.falloJugador = function () {
    const lineas = this.cuadricula.toLineas()
    const [controller] = EstadoLineaController.from(this.fichaCpu, ClaseList.fromNombre('ganador'))
    return this.hayGanador() && lineas.filter(l => l.toNumber() === controller.getEstado()).length === 1
}

MiniCPU.prototype.ganoJugador = function () {
    const lineas = this.cuadricula.toLineas()
    const [controller] = EstadoLineaController.from(this.fichaJugador, ClaseList.fromNombre('ganador'))
    return this.hayGanador() && lineas.filter(l => l.toNumber() === controller.getEstado()).length === 1
}

MiniCPU.prototype.getLineaGanador = function () {
    if (!this.hayGanador()) {
        throw new Error('No hay ganador.')
    }
    const lineas = this.cuadricula.toLineas()
    if (this.ganoJugador()) {
        const [controller] = EstadoLineaController.from(this.fichaJugador, ClaseList.fromNombre('ganador'))
        return lineas.find(l => l.toNumber() === controller.getEstado())
    } else if (this.falloJugador()) {
        const [controller] = EstadoLineaController.from(this.fichaCpu, ClaseList.fromNombre('ganador'))
        return lineas.find(l => l.toNumber() === controller.getEstado())
    }
}

MiniCPU.prototype.puedeNeutralizar = function () {
    const lineas = this.cuadricula.toLineas()
    const estados = EstadoLineaController.from(this.fichaJugador, ClaseList.fromNombre('puede-ganar'))
    return lineas.filter(l => estados.map(c => c.getEstado()).includes(l.toNumber())).length > 0
}

MiniCPU.prototype.neutralizar = function () {
    const lineas = this.cuadricula.toLineas()
    const estados = EstadoLineaController.from(this.fichaJugador, ClaseList.fromNombre('puede-ganar'))
    const [l] = lineas.filter(l => estados.map(c => c.getEstado()).includes(l.toNumber()))
    const celda = l.getCeldaEspacio()
    celda.setClaseFicha(this.fichaCpu)
    this.cuadricula.setCelda(celda)
}

MiniCPU.prototype.puedeGanar = function () {
    const lineas = this.cuadricula.toLineas()
    const estados = EstadoLineaController.from(this.fichaCpu, ClaseList.fromNombre('puede-ganar'))
    return lineas.filter(l => estados.map(c => c.getEstado()).includes(l.toNumber())).length > 0
}

MiniCPU.prototype.ganar = function () {
    const lineas = this.cuadricula.toLineas()
    const estados = EstadoLineaController.from(this.fichaCpu, ClaseList.fromNombre('puede-ganar'))
    const [l] = lineas.filter(l => estados.map(c => c.getEstado()).includes(l.toNumber()))
    const celda = l.getCeldaEspacio()
    celda.setClaseFicha(this.fichaCpu)
    this.cuadricula.setCelda(celda)
}

MiniCPU.prototype.hayEmpate = function () {
    return !this.hayEspacioDisponible() && !this.hayGanador()
}

MiniCPU.prototype.debeHacerEstrategia = function () {
    return !this.debeColocarPuntoArranque()
        || !this.puedeGanar()
        || !this.puedeNeutralizar()
        || !this.puedeResponderFormaRandom()
}

MiniCPU.prototype.debeColocarPuntoArranque = function () {
    return this.cuadricula.getCeldasOcupada().length === 0
}

MiniCPU.prototype.colocarPuntoArranque = function () {
    const puntosArranque = PuntoArranqueController.fromNivel(this.dificultad)
    const puntos = puntosArranque.map(pa => pa.getPunto())
    const n = Math.floor(Math.random() * puntos.length)
    const punto = puntos[n]
    const celda = this.cuadricula.fromPunto(punto)
    celda.setClaseFicha(this.fichaCpu)
    this.cuadricula.setCelda(celda)
}

MiniCPU.prototype.getIntersectos = function (lineas) {
    const intersectos = []
    for (let i = 0; i < lineas.length; i++) {
        for (let j = i + 1; j < lineas.length; j++) {
            const pareja = new ParejaLinea(lineas[i], lineas[j])
            const parejas = intersectos.map(intercepto => intercepto.getPareja())
            if (pareja.intersecta() && !this.existe(pareja, parejas)) {
                const celda = pareja.getCeldaIntercepto()
                intersectos.push(new Interseccion(pareja, celda))
            }
        }
    }
    return intersectos
}

MiniCPU.prototype.colocarPuntoEstrategico = function () {

    let puntos = []
    if (this.dificultad.isEscalaMedia()) {
        const {linea} = this.cuadricula.toLineas().map(l => new Bien(l, this.fichaCpu, this.fichaJugador, this.fichaEspacio))
        .find(b => b.getPropietario() === null)
        
        if (linea && this.cuadricula.getCeldasOcupada().length === 2 && this.cuadricula.fromXY(1, 1).getClaseFicha().toString() === this.fichaJugador.toString()) {
            puntos = linea.toArrayCelda().filter(c => c.isEspacioDisponible()).map(({ ubicacion: { puntoAbstracto } }) => puntoAbstracto)
        } else {
            this.crearCircuito()
            puntos = this.circuitoLinea.interceptosClaveDisponibles().map(({ ubicacion: { puntoAbstracto } }) => puntoAbstracto)
        }

    } else if (this.dificultad.isEscalaFacil()){
        const lineas = this.cuadricula.toLineas().map(l => new Bien(l, this.fichaCpu, this.fichaJugador, this.fichaEspacio))
        const bienes = lineas.filter(b => b.tienePropietario())
        const intersectos = this.getIntersectos(bienes.map(bien => bien.getLinea()))    
        puntos = intersectos.filter(({ celda }) => celda.isEspacioDisponible())
            .map(({ celda: { ubicacion } }) => ubicacion.getPuntoAbstracto())
    }

    const n = Math.floor(Math.random() * puntos.length)
    const punto = puntos[n]
    const celda = this.cuadricula.fromPunto(punto)
    celda.setClaseFicha(this.fichaCpu)
    this.cuadricula.setCelda(celda)
}

MiniCPU.prototype.crearCircuito = function () {
    const lineas = this.cuadricula.toLineas().map(l => new Bien(l, this.fichaCpu, this.fichaJugador, this.fichaEspacio))
    const bienes = lineas.filter(b => b.tienePropietario())

    if (this.circuitoLinea === null) {
        const lineasCpu = bienes.filter(b => b.isFichaCpu()).map(({ linea }) => linea)
        const lineasCierre = bienes.filter(b => b.isFichaEspacio()).map(({ linea }) => linea)
        for (let linea of lineasCierre) {
            this.circuitoLinea = new Circuito(...lineasCpu, linea)
            if (this.circuitoLinea.formaCircuito()) {
                break
            }
        }
    }
}

MiniCPU.prototype.existe = function (pareja, parejas) {
    for (let actual of parejas) {
        if (actual.toNumber() === pareja.toNumber()) {
            return true
        }
    }
    return false
}

MiniCPU.prototype.puedeResponderFormaRandom = function () {
    const espacios = this.cuadricula.getCeldasEspacio().map(({ ubicacion: { puntoAbstracto } }) => puntoAbstracto)
    return espacios.length <= 3 && !this.formaLineaRecta(espacios)
}

MiniCPU.prototype.formaLineaRecta = function (puntos) {
    if (puntos.length < 3) {
        return false
    }
    for (let linea of this.cuadricula.toLineas()) {
        if (puntos.every(punto => linea.pertenece(punto))) {
            return true
        }
    }
    return false
}

MiniCPU.prototype.colocarPuntoRandom = function () {
    const espacios = this.cuadricula.getCeldasEspacio().map(({ ubicacion: { puntoAbstracto } }) => puntoAbstracto)
    const n = Math.floor(Math.random() * espacios.length)
    const punto = espacios[n]
    const celda = this.cuadricula.fromPunto(punto)
    celda.setClaseFicha(this.fichaCpu)
    this.cuadricula.setCelda(celda)
}