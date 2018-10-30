/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log("funciona app.js áááá é10/16/2018");
/*
 * 
 * variables
 */
var contador = 0;
var angv = 0.10;
var sadv = 0.20;
var fearv = 0.20;
var disgv = 0.23;
var joyv = 0.27;
var languajeindex = "";

/*
 * Funciones ******************************************************************
 */
(async function getFruit() {
    const {value: languaje} = await swal({
        title: 'Select language',
        input: 'select',
        inputOptions: {
            'english': 'en',
            'español': 'es',
            'portugües': 'pt'
        },
        inputPlaceholder: 'language',
        showCancelButton: true,
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value === 'es') {
                    resolve();
                }
                if (value === 'en') {
                    resolve();

                } else if (value === 'pt') {
                    resolve();
                } else {
                    resolve();
                }

            });
        }
    });

    if (languaje) {
        if (languaje === 'español') {
            idiomaEspañol();
            languajeindex = 'español';
            obtenerGrabaciones();
            swal('Seleccionaste: ' + languaje);
        }
        if (languaje === 'english') {
            idiomaIngles();
            swal('Select ' + languaje);
            obtenerGrabaciones();
            languajeindex = 'english';
        }
        if (languaje === 'portugües') {
            idiomaPortugues();
            swal('Select ' + languaje);
            obtenerGrabaciones();
            languajeindex = 'portugües';
        }

    } else {
        idiomaIngles();
        obtenerGrabaciones();
        swal('You have not selected a language');
    }

})();





function obtenerGrabaciones() {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            console.log(this.responseText);
            let myObj = JSON.parse(this.responseText);
            console.log(myObj);
            console.log(Object.keys(myObj).length);

            for (let i = 0; i <= Object.keys(myObj).length - 1; i++) {

                let tbody = document.querySelector('.tbody'); //<tbody>
                let nuevoTBodyTr = document.createElement("tr");
                nuevoTBodyTr.setAttribute("id", myObj["Index " + i + ""]);
                let nuevoTBodyTh = document.createElement("th");
                nuevoTBodyTh.setAttribute("class", "wavs " + contador);
                let wav = document.createTextNode(myObj["Index " + i + ""]);
                nuevoTBodyTh.appendChild(wav);
                nuevoTBodyTr.appendChild(nuevoTBodyTh);
                contador++;

                for (let j = 1; j <= 5; j++) {
                    let nuevoTrTd = document.createElement("td");
                    if (j === 1) {
                        let wav2 = (myObj["Index " + i + ""]);
                        let nuevoButtonProcesar = document.createElement('button');
                        nuevoButtonProcesar.setAttribute("id", wav2);
                        nuevoButtonProcesar.setAttribute("onclick", "Procesar()");
                        nuevoButtonProcesar.setAttribute("class", "btn btn-success");

                        if (languajeindex === 'español') {
                            var texto = document.createTextNode('Procesar');
                        }
                        if (languajeindex === 'english') {
                            var texto = document.createTextNode('Process');
                        }
                        if (languajeindex === 'portugües') {
                            var texto = document.createTextNode('Processo');
                        }
                        nuevoButtonProcesar.appendChild(texto);
                        nuevoTrTd.appendChild(nuevoButtonProcesar);
                    }
                    if (j === 2) {
                        // let wav2 = (myObj["Index " + i + ""]);
                        let nuevoButtonProcesar = document.createElement('td');
                        nuevoButtonProcesar.setAttribute("id", "Transcription");
                        nuevoButtonProcesar.setAttribute("class", "Transcription");
//                        var texto = document.createTextNode('Transcripción');
//
//                        nuevoButtonProcesar.appendChild(texto);
                        nuevoTrTd.appendChild(nuevoButtonProcesar);
                    }
                    if (j === 3) {
                        // let wav2 = (myObj["Index " + i + ""]);
                        let nuevoButtonProcesar = document.createElement('td');
                        nuevoButtonProcesar.setAttribute("id", "Presición");
                        nuevoButtonProcesar.setAttribute("class", "Presición");
//                        var texto = document.createTextNode('Presición');
//
//                        nuevoButtonProcesar.appendChild(texto);
                        nuevoTrTd.appendChild(nuevoButtonProcesar);
                    }
                    if (j === 4) {
                        // let wav2 = (myObj["Index " + i + ""]);
                        let nuevoButtonProcesar = document.createElement('td');
                        nuevoButtonProcesar.setAttribute("id", "Presición");
                        nuevoButtonProcesar.setAttribute("class", "Presición");
//                        var texto = document.createTextNode('Intent');
//
//                        nuevoButtonProcesar.appendChild(texto);
                        nuevoTrTd.appendChild(nuevoButtonProcesar);
                    }
                    if (j === 5) {
                        // let wav2 = (myObj["Index " + i + ""]);
                        let nuevoButtonProcesar = document.createElement('button');
                        nuevoButtonProcesar.setAttribute("data-toggle", "modal");
                        nuevoButtonProcesar.setAttribute("data-target", "#exampleModal");
                        nuevoButtonProcesar.setAttribute("class", "btn btn-info");
                        nuevoButtonProcesar.setAttribute("onclick", "Ver()");

                        if (languajeindex === 'español') {
                            var texto = document.createTextNode('Ver');
                        }
                        if (languajeindex === 'english') {
                            var texto = document.createTextNode('Watch');
                        }
                        if (languajeindex === 'portugües') {
                            var texto = document.createTextNode('Ver');
                        }

                        nuevoButtonProcesar.appendChild(texto);
                        nuevoTrTd.appendChild(nuevoButtonProcesar);
                    }


                    nuevoTBodyTr.appendChild(nuevoTrTd);

                }
                tbody.appendChild(nuevoTBodyTr);
            }
        }
    });
    xhr.open("GET", "http://localhost:8085/AAADEVURIEL_PRUEBAS_WATSON-war/Grabaciones/web/Watson/");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}

function Procesar() {
    let tds = event.path[1].children;
    var wav = tds[0].id;
    console.log(wav);
    var tr = document.getElementById(wav);
    console.log(tr.cells[2]);
    var transaccionTd = tr.cells[2];
    var confidenceTd = tr.cells[3];
    var intentTd = tr.cells[4];
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
           
            console.log(this.responseText);
            let myObj = JSON.parse(this.responseText);

            let transcription = myObj.results["0"].alternatives["0"].transcript;
            let confidence = myObj.results["0"].alternatives["0"].confidence;
            console.log(transcription);
            console.log(confidence);

            confidence = confidence * 100;

            var text = document.createTextNode(transcription);
            transaccionTd.appendChild(text);
            var text2 = document.createTextNode("" + confidence + " % ");
            confidenceTd.appendChild(text2);

            var textosend = encodeURI(transcription);
            var data = "comentarios=" + textosend;

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                    console.log("Respuesta Análisis Texto");
                    let myObj = JSON.parse(this.responseText);
                    console.log(myObj);

                    if (myObj.Status === "No se han ingresado credenciales") {
                        if (myObj.NLU === false) {
                            swal({
                                type: 'error',
                                title: 'Oops...',
                                text: 'No hay credenciales Natural Languaje Understanding!',
                                footer: '<a href="Ajustes.html">INSERTAR CREDENCIALES</a>'
                            });
                        }

                        if (myObj.WA === false) {
                            swal({
                                type: 'error',
                                title: 'Oops...',
                                text: 'No hay credenciales Watson Assistant!',
                                footer: '<a href="Ajustes.html">INSERTAR CREDENCIALES</a>'
                            });
                        }
                        swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'No hay credenciales!',
                            footer: '<a href="Ajustes.html">INSERTAR CREDENCIALES</a>'
                        });
                    } else {
                        let intent = myObj.Intent.Intent;
                        console.log(intent);
                        var text = document.createTextNode(intent);
                        intentTd.appendChild(text);
                        angv = myObj.Anger;
                        sadv = myObj.sadness;
                        fearv = myObj.Fear;
                        disgv = myObj.Disgust;
                        joyv = myObj.Joy;
                        
                    }
                }
            });
            //2
            xhr.open("POST", "http://localhost:8085/AAADEVURIEL_PRUEBAS_WATSON-war/analisisTexto");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.send(data);


        }
    });
    //3
    xhr.open("POST", "http://localhost:8085/AAADEVURIEL_PRUEBAS_WATSON-war/PeticionVPS?audio="+wav);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);


}

function Ver() {
    if (languajeindex === 'español') {
        let Enfado = angv,
                Tristeza = sadv,
                Temor = fearv,
                Asco = disgv,
                Alegría = joyv;

        let perfil = Math.max(Enfado, Tristeza, Temor, Asco, Alegría);

        let variableMasAlta = Enfado === perfil ? "Enfado" :
                Tristeza === perfil ? "Tristeza" :
                Temor === perfil ? "Temor" :
                Asco === perfil ? "Asco" :
                Alegría === perfil ? "Alegría" : null;


        console.log(variableMasAlta);



        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light1", // "light1", "light2", "dark1", "dark2"
            exportEnabled: false,
            animationEnabled: true,
            title: {
                text: "Puntaje mayor " + variableMasAlta + " = " + Math.max(angv, sadv, fearv, disgv, joyv)
            },
            data: [{
                    type: "pie",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "false",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: [
                        {y: angv, label: "Enfado"},
                        {y: sadv, label: "Tristeza"},
                        {y: fearv, label: "Temor"},
                        {y: disgv, label: "Asco"},
                        {y: joyv, label: "Alegría"}

                    ]
                }]
        });
        chart.render();
    }
    if (languajeindex === 'english') {

        let Anger = angv,
                Sadness = sadv,
                Fear = fearv,
                Disgust = disgv,
                Joy = joyv;

        let perfil = Math.max(Anger, Sadness, Fear, Disgust, Joy);

        let variableMasAlta = Anger === perfil ? "Anger" :
                Sadness === perfil ? "Sadness" :
                Fear === perfil ? "Fear" :
                Disgust === perfil ? "Disgust" :
                Joy === perfil ? "Joy" : null;


        console.log(variableMasAlta);

        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: false,
            animationEnabled: true,
            title: {
                text: "Senior score " + variableMasAlta + " = " + Math.max(angv, sadv, fearv, disgv, joyv)
            },
            data: [{
                    type: "pie",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: [
                        {y: angv, label: "Anger"},
                        {y: sadv, label: "Sadness"},
                        {y: fearv, label: "Fear"},
                        {y: disgv, label: "Disgust"},
                        {y: joyv, label: "Joy"}

                    ]
                }]
        });
        chart.render();
    }
    if (languajeindex === 'portugües') {

        var Raiva = angv,
                Tristeza = sadv,
                Medo = fearv,
                Nojo = disgv,
                Alegria = joyv;

        perfil = Math.max(Raiva, Tristeza, Medo, Nojo, Alegria);

        variableMasAlta = Raiva === perfil ? "Raiva" :
                Tristeza === perfil ? "Tristeza" :
                Medo === perfil ? "Medo" :
                Nojo === perfil ? "Nojo" :
                Alegria === perfil ? "Alegria" : null;


        console.log(variableMasAlta);

        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: false,
            animationEnabled: true,
            title: {
                text: "Pontuação sênior " + variableMasAlta + " = " + Math.max(angv, sadv, fearv, disgv, joyv)
            },
            data: [{
                    type: "pie",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: [
                        {y: angv, label: "Raiva"},
                        {y: sadv, label: "Tristeza"},
                        {y: fearv, label: "Medo"},
                        {y: disgv, label: "Nojo"},
                        {y: joyv, label: "Alegria"}

                    ]
                }]
        });
        chart.render();
    }



}

function validar() {
    console.log("Validar credenciales");
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            let myObj = JSON.parse(this.responseText);
            if (myObj.Status === true) {
                swal(
                        'Good!',
                        'Credenciales insertadas!',
                        'success'
                        );
            } else {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'No hay credenciales insertadas!',
                    footer: '<a href="Ajustes.html">INSERTAR CREDENCIALES</a>'
                });
            }


        }
    });

    xhr.open("GET", "http://devavaya.ddns.net:8080/AAADEVURIEL_PRUEBAS_WATSON-war-1.0.0.0.0/Authentication");

    xhr.send(data);
}

function idiomaIngles() {
    var data = JSON.stringify({
        "languaje": "en-US"
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:8085/AAADEVURIEL_PRUEBAS_WATSON-war/STT");
    xhr.send(data);
}

function idiomaEspañol() {
    var data = JSON.stringify({
        "languaje": "es-MX"
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:8085/AAADEVURIEL_PRUEBAS_WATSON-war/STT");
    xhr.send(data);
}

function idiomaPortugues() {
    var data = JSON.stringify({
        "languaje": "pt-BR"
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:8085/AAADEVURIEL_PRUEBAS_WATSON-war/STT");
    xhr.send(data);
}
