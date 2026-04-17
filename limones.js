let canvas= document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTURA_SUELO = 20;
const ALTURA_PERSONAJE =60;
const ANCHO_PERSONAJE = 40;
const ANCHO_LIMON = 20;
const ALTO_LIMON=20;
let personajeX = canvas.width-ANCHO_PERSONAJE;
let personajeY = canvas.height -(ALTURA_SUELO+ALTURA_PERSONAJE );
let limonX =canvas.width/2;
let limonY=0;
let vidas=5;
let velocidadCaida=50;
let intervalo;// almacenará el setInterval

let punaje =0;
let juegoActivo = true;


function dibujarSuelo(){
    ctx.fillStyle= "blue";
    ctx.fillRect(0,canvas.height - ALTURA_SUELO, canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle= "yellow";
    ctx.fillRect(personajeX, personajeY , ANCHO_PERSONAJE,ALTURA_PERSONAJE );
}

function inciar(){
    intervalo = setInterval(bajarLimon,velocidadCaida);//primeraramtero funcion segunto dle timepo
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();

    
}

function moverIzquierda(){
  if(!juegoActivo) return; //  no se mueve si terminó
  if(personajeX > 0){
        personajeX -= 10;
    }
    actualizarPantalla();
}

function moverDerecha(){
    if(!juegoActivo) return; //  no se mueve si terminó
    if(personajeX + ANCHO_PERSONAJE < canvas.width){
        personajeX += 10;
    }
    actualizarPantalla();
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
    
}
function limpiarCanva(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function dibujarLimon(){
   ctx.fillStyle= "#88ff00";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTO_LIMON );
}
function bajarLimon(){
    limonY = limonY + 10;
    actualizarPantalla();
    detectarColicion();
    detectarPiso();
}
    

function detectarColicion(){
    if(limonX + ANCHO_LIMON>personajeX  &&
       limonX < personajeX+ ANCHO_PERSONAJE &&
       limonY + ALTO_LIMON > personajeY  &&
       limonY < personajeY+ ALTURA_PERSONAJE){
       aparecerLimon();
       punaje = punaje+1;

       mostarEnSpan("txtPuntaje", punaje);

    }
}

function aparecerLimon(){
    limonX=generarAleatorio(0, canvas.width-ANCHO_LIMON)
    limonY=0;
    actualizarPantalla();
}

function detectarPiso(){
    if (limonY + ALTO_LIMON >= canvas.height - ALTURA_SUELO){

        aparecerLimon();
        vidas = vidas - 1;
        mostarEnSpan("txtVidas", vidas);

        // 👉 verificar GAME OVER
        if(vidas <= 0){
            mostarEnSpan("txtVidas", "GAME OVER");
            juegoActivo = false;
            clearInterval(intervalo);
        }
    }
}

/* ================= REINICIAR JUEGO ================= */
function reiniciarJuego(){
    clearInterval(intervalo); // detener juego anterior

    // Reiniciar valores
    personajeX = canvas.width / 2;
    personajeY = canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);

    limonX = canvas.width / 2;
    limonY = 0;

    vidas = 5;
    punaje = 0;

    // Actualizar interfaz
    mostarEnSpan("txtVidas", vidas);
    mostarEnSpan("txtPuntaje", punaje);

    // Dibujar todo limpio
    actualizarPantalla();

    // Volver a iniciar el juego
    intervalo = setInterval(bajarLimon, velocidadCaida);
}