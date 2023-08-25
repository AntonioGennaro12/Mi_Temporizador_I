const   miTemporizador  = document.querySelector("#mi-tempo");   
const   misHoras        = document.querySelector("#mis-horas");
const   misMinutos      = document.querySelector("#mis-minutos");
const   misSegundos     = document.querySelector("#mis-segundos");
const   miBotonTemp     = document.querySelector("#boton-temp");
// Intervalos usados
let tempInterval    = 0;
let auxInterval     = 0;
let cronoInterval   = 0;
// Variables
let running         = false;
let contTemp        = false;
let waitInt         = false;
let horas           = 0;
let minutos         = 0;
let segundos        = 0;
let segTotales      = 0;

//Inicializaciones varias
misHoras.value      = horas;
misMinutos.value    = minutos;
misSegundos.value   = segundos;
miBotonTemp.style.backgroundColor = "lightgreen"; 

// FUNCIONES

function muestraTiempo() {
    let segUnits = segundos%10;
    let segDecs  = (segundos - segundos%10) / 10;
    let minUnits = minutos%10;
    let minDecs  = (minutos - minutos%10) / 10;
    let horUnits = horas%10;
    let horDecs  = (horas - horas%10) / 10;
    miTemporizador.textContent = "Te quedan...     "+
            (horDecs)+(horUnits)+" : "+
            (minDecs)+(minUnits)+" : "+
            (segDecs)+(segUnits);
}

function inicioTempo () {
    if (!running) {
        horas       = parseInt(misHoras.value);
        minutos     = parseInt(misMinutos.value);
        segundos    = parseInt(misSegundos.value);
        segTotales = ((horas * 3600) + (minutos * 60)) + segundos
        if ((segTotales == 0)||(segundos > 59)|| (minutos > 59)||(horas > 23)) {
            miTemporizador.textContent = "Tiempo ingresado no valido"; 
            return;
        }
        else {
            muestraTiempo ();
        }
        iniciaTimer(); 
        miBotonTemp.textContent = "Detener";
        miBotonTemp.style.backgroundColor = "lightpink"; 
        running = true; 
    }
    else {
        if (!contTemp) {
            contTemp = true;
            stopTimer();
            miBotonTemp.textContent = "Continuar";
            miBotonTemp.style.backgroundColor = "lightgreen"; 
        }
        else { 
            contTemp = false;
            iniciaTimer(); 
            miBotonTemp.textContent = "Detener"; 
            miBotonTemp.style.backgroundColor = "lightpink"; 
        }
    }
}
 
function iniciaTimer () {
    clockInterval = setInterval(ticSegundo, 1000); 
}

function stopTimer () {
    clearInterval(clockInterval);
}

function ticSegundo () {
    if (--segTotales == 0) {
        stopTimer();
        miBotonTemp.textContent = "Iniciar";
        running = false;
        miTemporizador.textContent = "FIN!!!  Tiempo alcanzado";
        miBotonTemp.style.backgroundColor = "lightgreen"; 
    }
    else {
        segundos    = segTotales %60;
        minutos     = ((segTotales - segundos)/60)%60;
        horas       = ((segTotales - segundos) - (minutos * 60))/3600; 
        muestraTiempo ();
    }
}

