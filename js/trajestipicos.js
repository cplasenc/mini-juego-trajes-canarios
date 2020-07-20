/***** MEJORAS *****/
//QUE SALGA UN POPUP DE VICTORIA CUANDO GANES Y PERMITA REINICIAR

//para acceder luego a las propiedades de las imagenes
var result = {};
//numero de aciertos 
var aciertos = 0;

/**
 * Lanza el pop up al finalizar el juego
 */
$(function () {
    $("#dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Volver a jugar": function () {
                location.reload();
            }
        }
    });
});


//numero aleatorio de containers para las diferentes islas (entre 4 y 7)
let islas = Math.floor(Math.random() * (8 - 4) + 4);

$(document).ready(function () {

    //pop up con las instrucciones del juego
    $("#dialog").dialog({
        draggable: false
    });

    //dificultad y carga de imagenes de trajes
    $("#botones button").click(function () {
        $("#botones button").button("disable");
        if ($(this).text() === "Fácil") {
            crearTrajes(4);
        } else if ($(this).text() === "Normal") {
            crearTrajes(6);
        } else if ($(this).text() === "Experto") {
            crearTrajes(8);
        }
    })

    crearIslas();

    /**
     * hace las islas (containers) 'droppable'
     * hace las comprobaciones finales
     */
    $(function () {
        $(".droppable").droppable({
            drop: function (event, ui) {

                result.drop = event.target.alt;

                ui.draggable.draggable({ disabled: true });

                if (result.drag == result.drop) {
                    toastBien();
                    aciertos++;
                    if (aciertos == 1) {
                        $("#puntuacion").text(aciertos + " acierto");
                    } else if (aciertos > 1) {
                        $("#puntuacion").text(aciertos + " aciertos");
                    }
                    $(this).addClass("bordeVerde");

                } else {
                    toastMal();
                    $(this).addClass("bordeRojo");
                }
            }
        });
    });

})

/**
 * crea las islas (containers) de forma aleatoria
 */
function crearIslas() {
    for (let i = 0; i < islas; i++) {
        //let random2 = Math.floor(Math.random() * 7) + 0;
        let random2 = randomSinRepetir(7);
        $('<img />').attr({
            'src': 'images/islas/' + arrayIslas[random2],
            'alt': arrayIslas[random2].slice(0, -4),
            'width': 200,
            'height': 200,
            'class': "droppable"
        }).appendTo('#areaIslas');
    }
}

/**
 * Genero los trajes en base a las islas (containers) existentes
 * @param {*} limite - número de trajes a crear
 */
function crearTrajes(limite) {
    let limit = 0;

    $("#areaIslas > img").each(function () {

        var arrayIslasCreadas = $(this).attr("alt");

        for (let i = 0; i < arrayTrajes.length; i++) {
            let random = randomSinRepetir2(14);

            console.log(arrayTrajes[random].isla);
            console.log(arrayIslasCreadas);
            if (arrayTrajes[random].isla == arrayIslasCreadas && limit < limite) {
                limit++;
                console.log(limit);
                $('<img />').attr({
                    'src': 'images/trajes/' + arrayTrajes[random].url,
                    'alt': arrayTrajes[random].isla,
                    'width': 150,
                    'height': 250,
                    'class': 'draggable'
                }).appendTo('#areaTrajes');
            }
        }
    });

    /**
    * Hace la imagen 'draggable'
    * capturo el 'alt' de la imagen
    */
    $(function () {
        $(".draggable").draggable({
            start: function (e) {
                result.drag = e.target.alt;
            }
        });
    });
}

/**
 * Añade JQuery UI a los botones
 */
$(function () {
    $("#botones button").button();
    $("button").click(function (event) {
        event.preventDefault();
    });
});

/**
 * Notificación de error Toastr
 */
function toastMal() {
    toastr["error"]("Este traje no es de esta isla")
}
/**
 * Notificación de acierto Toastr
 */
function toastBien() {
    toastr["success"]("¡Correcto!")
}

/**
 * Calcular números aleatorios sin repetir
 * @param {*} numRandoms - Valor máx. entre los que calcular números al azar
 */
let uniqueRandoms = [];
function randomSinRepetir(numRandoms) {

    if (!uniqueRandoms.length) {
        for (let i = 0; i < numRandoms; i++) {
            uniqueRandoms.push(i);
        }
    }
    let index = Math.floor(Math.random() * uniqueRandoms.length);
    let val = uniqueRandoms[index];

    uniqueRandoms.splice(index, 1);

    return val;
}

/**
 * function duplicada
 */
let uniqueRandoms2 = [];
function randomSinRepetir2(numRandoms2) {

    if (!uniqueRandoms2.length) {
        for (let i = 0; i < numRandoms2; i++) {
            uniqueRandoms2.push(i);
        }
    }
    let index = Math.floor(Math.random() * uniqueRandoms2.length);
    let val = uniqueRandoms2[index];

    uniqueRandoms2.splice(index, 1);

    return val;
}