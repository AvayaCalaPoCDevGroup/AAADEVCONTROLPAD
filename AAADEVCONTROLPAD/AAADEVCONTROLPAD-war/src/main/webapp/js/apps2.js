/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

console.log("funciona app2.js 10 15 2018");
/*
 * 
 * variables
 */
var contador = 0;
var angv = 0;
var sadv = 0;
var fearv = 0;
var disgv = 0;
var joyv = 0;

/*
 * Funciones ******************************************************************
 */
obtenerGrabaciones();

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
                        var texto = document.createTextNode('Procesar');

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
                        var texto = document.createTextNode('Ver');

                        nuevoButtonProcesar.appendChild(texto);
                        nuevoTrTd.appendChild(nuevoButtonProcesar);
                    }


                    nuevoTBodyTr.appendChild(nuevoTrTd);

                }
                tbody.appendChild(nuevoTBodyTr);
            }
        }
    });
//    1
//    xhr.open("GET", "http://localhost:8085/AAADEVURIEL_PRUEBAS_WATSON-war/Grabaciones/web/Watson/");
    xhr.open("GET", "http://devavaya.ddns.net:8080/AAADEVURIEL_PRUEBAS_WATSON-war-1.0.0.0.0/Grabaciones/web/Watson/");
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

            var content = this.responseText;

            var data = JSON.stringify({
                "audio": {
                    "content": content
                },
                "config": {
                    "languageCode": "en-US",
                    "maxAlternatives": 1,
                    "profanityFilter": true,
                    "enableWordTimeOffsets": false
                }
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                }
            });

            xhr.open("POST", "https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyDjFb-kHwyIdaQrjIRV_v_pJYpGWpBhKps");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(data);






//            let myObj = JSON.parse(this.responseText);
//
//            let transcription = myObj.results["0"].alternatives["0"].transcript;
//            let confidence = myObj.results["0"].alternatives["0"].confidence;
//            console.log(transcription);
//            console.log(confidence);
//
//            confidence = confidence * 100;
//
//            var text = document.createTextNode(transcription);
//            transaccionTd.appendChild(text);
//            var text2 = document.createTextNode("" + confidence + " % ");
//            confidenceTd.appendChild(text2);
//
//            var textosend = encodeURI(transcription);
//            var data = "comentarios=" + textosend;
//
//            var xhr = new XMLHttpRequest();
//            xhr.withCredentials = true;
//
//            xhr.addEventListener("readystatechange", function () {
//                if (this.readyState === 4) {
//                    console.log(this.responseText);
//                    console.log("Respuesta Análisis Texto");
//                    let myObj = JSON.parse(this.responseText);
//                    console.log(myObj);
//                    
//                    if (myObj.Status === "No se han ingresado credenciales") {
//                        if(myObj.NLU === false){
//                            swal({
//                            type: 'error',
//                            title: 'Oops...',
//                            text: 'No hay credenciales Natural Languaje Understanding!',
//                            footer: '<a href="Ajustes.html">INSERTAR CREDENCIALES</a>'
//                        });
//                    }
//                   
//                        if(myObj.WA === false){
//                            swal({
//                            type: 'error',
//                            title: 'Oops...',
//                            text: 'No hay credenciales Watson Assistant!',
//                            footer: '<a href="Ajustes.html">INSERTAR CREDENCIALES</a>'
//                        });
//                    }
//                        swal({
//                            type: 'error',
//                            title: 'Oops...',
//                            text: 'No hay credenciales!',
//                            footer: '<a href="Ajustes.html">INSERTAR CREDENCIALES</a>'
//                        });
//                    }else {
//                        let intent = myObj.Intent.Intent;
//                        console.log(intent);
//                        var text = document.createTextNode(intent);
//                        intentTd.appendChild(text);
//                        angv = myObj.Anger;
//                        console.log("Anger: " + angv);
//                        sadv = myObj.sadness;
//                        fearv = myObj.Fear;
//                        disgv = myObj.Disgust;
//                        joyv = myObj.Joy;
//                    }
//                }
//            });
//            //2
//            xhr.open("POST", "http://localhost:8085/AAADEVURIEL_PRUEBAS_WATSON-war/analisisTexto");
////            xhr.open("POST", "http://devavaya.ddns.net:8080/AAADEVURIEL_PRUEBAS_WATSON-war-1.0.0.0.0/analisisTexto");
//            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//
//            xhr.send(data);


        }
    });
    //3
//    xhr.open("POST", "http://localhost:8085/AAADEVURIEL_WATSON-war/Transcript");
    xhr.open("GET", "http://localhost:8085/AAADEVURIEL_PRUEBAS_WATSON-war/Transcript/web/Watson/" + wav);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);


}

function Ver() {
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Desktop Browser Market Share in 2016"
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

    xhr.open("GET", "http://localhost:8085/AAADEVURIEL_PRUEBAS_WATSON-war/Authentication");

    xhr.send(data);
}
