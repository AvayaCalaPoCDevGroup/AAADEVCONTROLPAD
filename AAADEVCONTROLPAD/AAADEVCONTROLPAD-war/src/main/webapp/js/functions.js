/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log("functions.js");

/*
 * Variables ******************************************************************
 */
//NATURAL LANGUAJE UNDERSTANDING
var credencialesNLU = document.getElementById('agregarNLU');
var formularioNLU = document.getElementById('formulario_ajustes_NLU');
var actionNLU = formularioNLU.getAttribute('action');
//WATSON ASSISTANT
var credencialesWA = document.getElementById('agregarWA');
var formularioWA = document.getElementById('formulario_ajustes_WA');
var actionWA = formularioWA.getAttribute('action');
//GOOGLE CLOUD SPEECH TO TEXT



/*
 * Funciones ******************************************************************
 */

/*
 * POST NATURAL LANGUAJE UNDESRTADING
 */
function doPostNLU() {
    var fomulario = new FormData(formularioNLU);

    var object = {};
    fomulario.forEach(function (value, key) {
        object[key] = value;
    });
    var json = JSON.stringify(object);

    console.log(json);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', actionNLU, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resultado = xhr.responseText;
            var json = JSON.parse(resultado);

            if (json.Status === "Ok") {
                
                console.log(json);
            }



        }

    };

    xhr.send(json);

}

/*
 * POST WATSON ASSISTANT
 */
function doPostWA(){
    var fomulario = new FormData(formularioWA);

    var object = {};
    fomulario.forEach(function (value, key) {
        object[key] = value;
    });
    var json = JSON.stringify(object);

    console.log(json);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', actionWA, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resultado = xhr.responseText;
            var json = JSON.parse(resultado);

            if (json.Status === "Ok") {
                
                console.log(json);
            }
        }
    };
    xhr.send(json);
}


/*
 * POST GOOGLE CLOUD
 */



/*
 * EventListener *************************************************************
 */

//NATUAL LANGUAJE
credencialesNLU.addEventListener('click', function (e) {
    e.preventDefault();
    doPostNLU();
});

//WATSON ASSISTANT
credencialesWA.addEventListener('click', function (e) {
    e.preventDefault();
    doPostWA();
});