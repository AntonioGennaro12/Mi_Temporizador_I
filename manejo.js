const   miTemporizador  = document.querySelector("#mi-tempo"); 
const   miCronometro    = document.querySelector("#mi-crono");    
const   misHoras        = document.querySelector("#mis-horas");
const   misMinutos      = document.querySelector("#mis-minutos");
const   misSegundos     = document.querySelector("#mis-segundos");

const   miBotonTemp1    = document.querySelector("#boton-temp1");
const   miBotonTemp2    = document.querySelector("#boton-temp2");

const   miBotonCrono1   = document.querySelector("#boton-cron1");
const   miBotonCrono2   = document.querySelector("#boton-cron2");
const   miBotonCrono3   = document.querySelector("#boton-cron3");

const   contRegistros   = document.querySelector("#cont-registros")

// Intervalos usados
let tempInterval    = 0;
let tempoTime       = 1000;
let cronoInterval   = 0;
let cronoTime       = 10; // debería ser 10ms pero pongo 100ms
let cronoInc        = 1;  // 1 si fuera cada 10ms
// Variables
let running         = false;
let contTemp        = false;
let waitInt         = false;
// Temporizador
let horas           = 0;
let minutos         = 0;
let segundos        = 0;
let segTotales      = 0;
// Cronometro
let cronoRunning    = false;
let cronoDetenido   = true;
let cronoRegistro   = false;
let cronoDias       = 0;
let cronoHoras      = 0;
let cronoMins       = 0;
let cronoSegs       = 0;
let cronoCents      = 0;
let cronoTics       = 0;
let cronoData       = [cronoDias, cronoHoras, cronoMins, cronoSegs, cronoCents];
let lapContador     = 0;
let soloSecs        = 60*100; // solo muestra el primer minuto pero sigue internamente

//Inicializaciones varias
misHoras.value      = horas;
misMinutos.value    = minutos;
misSegundos.value   = segundos;
miBotonTemp1.style.backgroundColor = "greenyellow"; 
miBotonCrono1.style.backgroundColor = "greenyellow"; 

// FUNCIONES TEMPORIZADOR
/**
 * Muestra tiempo del Temporizador Hs:Min:Seg, rellena con "0"..
 */
function muestraTiempo() {
    let segUnits = segundos%10;
    let segDecs  = (segundos - segundos%10) / 10;
    let minUnits = minutos%10;
    let minDecs  = (minutos - minutos%10) / 10;
    let horUnits = horas%10;
    let horDecs  = (horas - horas%10) / 10;
    miTemporizador.textContent = "Quedan...   "+
            (horDecs)+(horUnits)+" : "+
            (minDecs)+(minUnits)+" : "+
            (segDecs)+(segUnits);
}

/**
 * convierte contador de segundos a Hs:Min:seg
 */
function setTempoValues () {
        segundos    = segTotales %60;
        minutos     = ((segTotales - segundos)/60)%60;
        horas       = ((segTotales - segundos) - (minutos * 60))/3600;
} 

/**
 * Lee los Datos de entrada del Temporizador
 */
function leeDatosTempo() {
    horas       = parseInt(misHoras.value);
    minutos     = parseInt(misMinutos.value);
    segundos    = parseInt(misSegundos.value);
};

/**
 * Oculta o muestra bpton 2 del temporizador 
 * @param {String} estado ("none" o  "block")
 */
function ctrlBot2Tempo (estado) {
    miBotonTemp2.style.display = estado;
}

/**
 * Restablece Boton iniciar del Temporizador
 */
function restoreBotonTempo() {
        miBotonTemp1.textContent = "Iniciar Temporizador";
        miBotonTemp1.style.backgroundColor = "greenyellow"; 
}

/**
 * Inico del Temporizador (click desde el noton "Iniciar Tempo")
 * chequea si no es cero o si nos es mayor a 23hs, 59min, o 59 seg.
 * @returns 
 */
function inicioTempo () {
    if (!running) { 
        leeDatosTempo();
        segTotales = ((horas * 3600) + (minutos * 60)) + segundos
        if ((segTotales == 0)||(segundos > 59)|| (minutos > 59)||(horas > 23)) {
            miTemporizador.textContent = "Tiempo ingresado no valido"; 
            return;
        }
        else { muestraTiempo (); }
        iniciaTimer(); 
        miBotonTemp2.textContent = "Cancelar";
        miBotonTemp2.style.backgroundColor = "salmon";
        ctrlBot2Tempo ("block");
        miBotonTemp1.textContent = "Detener";
        miBotonTemp1.style.backgroundColor = "lightpink"; 
        running = true; 
        contTemp = false;
    }
    else {
        if (!contTemp) {
            contTemp = true;
            stopTimer();
            miBotonTemp1.textContent = "Continuar";
            miBotonTemp1.style.backgroundColor = "greenyellow"; 
        }
        else { 
            iniciaTimer(); 
            contTemp = false;
            miBotonTemp1.textContent = "Detener"; 
            miBotonTemp1.style.backgroundColor = "lightpink"; 
        }
    }
}

/**
 * Cancelar Temporizador (click en botón)
 */
function cancelTempo () {
    stopTimer();
    running = false;
    ctrlBot2Tempo ("none");
    restoreBotonTempo();
    miTemporizador.textContent = "FIN!!!  Temporizador cancelado";
}

/**
 * Inicia el Intervalo del Temporizador
 */
function iniciaTimer () {
    clockInterval = setInterval(ticSegundo, 1000); 
}

/**
 * Detiene el Intervalo del Temporizador
 */
function stopTimer () {
    clearInterval(clockInterval);
}

/**
 * Rutina de Intervalo del Temporizador
 */
function ticSegundo () {
    if (--segTotales == 0) {
        stopTimer();
        restoreBotonTempo();
        running = false;
        miTemporizador.textContent = "FIN!!!  Tiempo alcanzado";
        ctrlBot2Tempo ("none");    
    }
    else {
        setTempoValues ();
        muestraTiempo ();
    }
}

/// FUNCIONES CRONOMETRO 
/**
 * Muestra tiempo en Cronómetro formato d:hh:mm:ss:cc rellena con 0 decenas y unidades 
 */
function muestraCrono() {
    let centUnit    = cronoCents%10;
    let centDec     = (cronoCents - cronoCents%10)/10;   
    let segUnits    = cronoSegs%10;
    let segDecs     = (cronoSegs - cronoSegs%10)/10;
    let minUnits    = cronoMins%10;
    let minDecs     = (cronoMins - cronoMins%10) / 10;
    let horUnits    = cronoHoras%10;
    let horDecs     = (cronoHoras - cronoHoras%10) / 10;
    let diasUnits   = cronoDias;
    miCronometro.textContent =  " " +  diasUnits  +  " : "+
                                (horDecs)+(horUnits)+" : "+    
                                (minDecs)+(minUnits)+" : "+
                                (segDecs)+(segUnits)+" : "+
                                (centDec)+(centUnit);
}

/**
 * Convierte contador de crnómetro a d:h:m:s:c
 */
function setCronoValues () {
    cronoCents  = cronoTics %100;
    cronoSegs   = ((cronoTics - cronoCents)/100) %60;
    cronoMins   = ((((cronoTics - cronoCents)/100) - cronoSegs)/60) %60;
    cronoHoras  = ((((((cronoTics - cronoCents)/100) - cronoSegs)/60) - cronoMins) /60) %24; 
    cronoDias   = (cronoHoras - cronoHoras%24) / 24;
}

/**
 * Lee los datos del cronómetro para registro de vuelta (LAP)
 */
function getCronoData() {
    cronoData = [cronoDias, cronoHoras, cronoMins, cronoSegs, cronoCents];
}

/**
 * Rutina del Intervalo del Cronómetro (entra cada 10Mseg)
 */
function ticCrono () {
        cronoTics += cronoInc;
        setCronoValues();
        if (cronoDias == 9){ // máximo 9 días
            cancelCrono();
        }
        if (cronoTics < soloSecs) {
            muestraCrono ();
        }  
        else if (!(cronoTics %100)) {
            muestraCrono ();
        }      
}

/**
 * Muestra el registro de vuelt (Lap #n) en la caja de salida
 */
function muestaLap() {
    contRegistros.innerHTML += `
    <p> Lap #${lapContador} - ${cronoData[0]} d. ${cronoData[1]} h. ${cronoData[2]} m. ${cronoData[3]} s. ${cronoData[4]} c.</p>
    `;
}

/**
 * Oculta o muestra contenedor de "Registros de Vuelts" (LAP)
 * @param {String} estado 
 */
function ctrlRegistros (estado) {
    contRegistros.style.display = estado;
}
/**
 * Oculta o muestra los botones 2 y 3 del cronómetro
 * @param {String} estado 
 */
function ctrlBot2Bot3 (estado) {
    miBotonCrono2.style.display = estado;
    miBotonCrono3.style.display = estado;
}

/**
 * Inicia el intervalo del Cronómetro
 */
function iniciaCrono() {
    cronoInterval = setInterval(ticCrono, cronoTime); 
}

/**
 * Click boton 1 (inicio /detener/ Continuar) del Cronómetro 
 */
function clickCrono1 () {
    if (!cronoRunning) {
        cronoRunning = true;
        cronoDetenido = false;
        cronoRegistro = false;
        miBotonCrono1.textContent = "Cancelar";
        miBotonCrono1.style.backgroundColor = "salmon"; 
        miBotonCrono2.textContent = "Detener";
        miBotonCrono2.style.backgroundColor = "lightpink"; 
        miBotonCrono3.textContent = "Registro (Lap)";
        miBotonCrono3.style.backgroundColor = "aqua"; 
        ctrlBot2Bot3 ("block");
        iniciaCrono();
    } 
    else {
        if (cronoRunning && cronoDetenido) {
            clearInterval(cronoInterval);
            cronoRunning  = false;
            cronoDetenido = true;
            cronoTics = 0;
            setCronoValues();
            muestraCrono ();
            miBotonCrono1.textContent = "Iniciar Cronómetro";
            miBotonCrono1.style.backgroundColor = "greenyellow"; 
            ctrlBot2Bot3 ("none");
            ctrlRegistros ("none");
        }
        else {
            miBotonCrono2.textContent = "¡Detener 1ro!"; 
        }
    }
}

/**
 * Click boton 2 (Cancelar) del Cronómetro 
 */
function clickCrono2 (){
    if (!cronoDetenido) {
        cronoDetenido = true;
        clearInterval(cronoInterval);
        miBotonCrono2.textContent = "Continuar";
        miBotonCrono2.style.backgroundColor = "greenyellow"; 
    }
    else {
        cronoDetenido = false;
        iniciaCrono();
        miBotonCrono2.textContent = "Detener";
        miBotonCrono2.style.backgroundColor = "lightpink"; 
    } 
}

/**
 * Click boton 3 (Registro de vuelta - LAP) del Cronómetro 
 */
function clickCrono3 () {
    if (!cronoDetenido && !cronoRegistro) {
        getCronoData();
        cronoRegistro = true;
        contRegistros.innerHTML = `
            <p> Registro/s (Lap) </p>
        `;
        lapContador = 1;
        muestaLap();
        ctrlRegistros ("grid");
    }
    else if (!cronoDetenido && cronoRegistro) {
        getCronoData();
        if (++lapContador <= 20) {
            muestaLap();
        }
    } 
}

/* Fin */


