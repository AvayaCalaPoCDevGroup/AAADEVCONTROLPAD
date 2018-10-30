/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
console.log("Funciona app2 10/22/2018");

var data = null;
var contador = 0;
var angv = 0;
var sadv = 0;
var fearv = 0;
var disgv = 0;
var joyv = 0;
var languajeindex = 'español';
var btn_borrar = document.getElementById('btn_borrar');
var checkboxes = document.getElementsByClassName('borrar_contacto');
var tableBody = document.getElementsByTagName('tbody');
var checkTodos = document.getElementById('borrar_todos');

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

                let tbody = document.querySelector('.tbody'); // <tbody>
                let nuevoTBodyTr = document.createElement("tr");
                nuevoTBodyTr.setAttribute("id", myObj["Index " + i + ""]);
                let nuevoTBodyTh = document.createElement("th");
                nuevoTBodyTh.setAttribute("class", "wavs " + contador);
                let wav = document.createTextNode(myObj["Index " + i + ""]);

                let wavNombre = (myObj["Index " + i + ""]);
                console.log(wavNombre);
                var res = wavNombre.replace(".wav", ".txt");
                console.log(res.toString());

// nuevoTBodyTh.appendChild(wav);
// nuevoTBodyTr.appendChild(nuevoTBodyTh);

                contador++;

                for (let j = 1; j <= 10; j++) {
                    let nuevoTrTd = document.createElement("td");
                    let nuevoaudio = document.createElement("AUDIO");
                    if (j === 1) {




                        var data = null;

                        var xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;

                        xhr.addEventListener("readystatechange", function () {
                            if (this.readyState === 4) {
                                var myObj = JSON.parse(this.responseText);
                                console.log(myObj.fechayHora);
                                let nuevoButtonProcesar = document.createElement('td');
                                var texto = document.createTextNode(myObj.fechayHora);
                                nuevoButtonProcesar.appendChild(texto);
                                nuevoTrTd.appendChild(nuevoButtonProcesar);
                            }
                        });

                        xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/inputIntent/web/Intent/" + res);
                        xhr.send(data);


                    }
                    if (j === 2) {




                        var data = null;

                        var xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;

                        xhr.addEventListener("readystatechange", function () {
                            if (this.readyState === 4) {
                                myObj = JSON.parse(this.responseText);

                                var myObj = JSON.parse(this.responseText);
                                console.log(myObj.Origen);
                                let nuevoButtonProcesar = document.createElement('td');
                                var texto = document.createTextNode(myObj.Origen);
                                nuevoButtonProcesar.appendChild(texto);
                                nuevoTrTd.appendChild(nuevoButtonProcesar);
                            }
                        });

                        xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/inputIntent/web/Intent/" + res);
                        xhr.send(data);

                    }

                    if (j === 3) {
                        var data = null;

                        var xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;

                        xhr.addEventListener("readystatechange", function () {
                            if (this.readyState === 4) {
                                var myObj = JSON.parse(this.responseText);
                                console.log(myObj.Destino);
                                let nuevoButtonProcesar = document.createElement('td');
                                var texto = document.createTextNode(myObj.Destino);
                                nuevoButtonProcesar.appendChild(texto);
                                nuevoTrTd.appendChild(nuevoButtonProcesar);
                            }
                        });

                        xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/inputIntent/web/Intent/" + res);
                        xhr.send(data);
                    }
                    if (j === 4) {
                        let wav2 = (myObj["Index " + i + ""]);
                        nuevoaudio.setAttribute("class", "democlass");
                        nuevoaudio.controls = true;
                        nuevoaudio.setAttribute("src", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/ControladorGrabaciones/web/Record/" + wav2);
                        nuevoTrTd.appendChild(nuevoaudio);
                    }
                    if(j === 5){
                        var data = null;

                        var xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;

                        xhr.addEventListener("readystatechange", function () {
                            if (this.readyState === 4) {

                                var myObj = JSON.parse(this.responseText);
                                console.log(myObj.Transcript);
                                let nuevoButtonProcesar = document.createElement('td');
                                var texto = document.createTextNode(myObj.Transcript);
                                nuevoButtonProcesar.appendChild(texto);
                                nuevoTrTd.appendChild(nuevoButtonProcesar);
                            }
                        });

                        xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/inputIntent/web/Intent/" + res);


                        xhr.send(data);
                    }
                    
                    if (j === 6) {
                        // let wav2 = (myObj["Index " + i + ""]);


                        var data = null;

                        var xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;

                        xhr.addEventListener("readystatechange", function () {
                            if (this.readyState === 4) {

                                myObj = JSON.parse(this.responseText);

                                let confianza = myObj.COnfidence;

                                console.log(confianza);
                                let nuevoButtonProcesar = document.createElement('td');
                                var texto = document.createTextNode(confianza);
                                nuevoButtonProcesar.appendChild(texto);
                                nuevoTrTd.appendChild(nuevoButtonProcesar);


                            }
                        });

                        xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/inputIntent/web/Intent/" + res);


                        xhr.send(data);

                    }
                    
                    
                    
                    if (j === 7) {
                        var data = null;

                        var xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;

                        xhr.addEventListener("readystatechange", function () {
                            if (this.readyState === 4) {

                                myObj = JSON.parse(this.responseText);

                                let intent = myObj.Intent.Intent;
                                let nuevoButtonProcesar = document.createElement('td');
                                var texto = document.createTextNode(intent);
                                nuevoButtonProcesar.appendChild(texto);
                                nuevoTrTd.appendChild(nuevoButtonProcesar);


                            }
                        });

                        xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/inputIntent/web/Intent/" + res);


                        xhr.send(data);
                    }
                    if (j === 8) {
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
                    if (j === 9) {
                        let info2 = document.createElement("input");
                        info2.setAttribute("type", "checkbox");
                        info2.setAttribute("name", res);
                        info2.classList.add("borrar_contacto");
                        nuevoTrTd.setAttribute("class", "borrar");
                        nuevoTrTd.appendChild(info2);
                    }

                    nuevoTBodyTr.appendChild(nuevoTrTd);

                }
                tbody.appendChild(nuevoTBodyTr);
            }
        }
        for_check();
    });
    xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/Grabaciones/web/Record/");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}


function Ver() {
    let tds = event.path[2].id;
    console.log("TDS");
    console.log(tds);

    res = tds.replace(".wav", ".txt");
    console.log("RES");
    console.log(res);
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;



    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            console.log(this.responseText);
            var myObjEmociones = JSON.parse(this.responseText);

            angv = myObjEmociones.Anger;
            sadv = myObjEmociones.sadness;
            fearv = myObjEmociones.Fear;
            disgv = myObjEmociones.Disgust;
            joyv = myObjEmociones.Joy;

            if (languajeindex === 'español') {
                var Enfado = angv,
                        Tristeza = sadv,
                        Temor = fearv,
                        Asco = disgv,
                        Alegria = joyv;

                var perfil = Math.max(Enfado, Tristeza, Temor, Asco, Alegria);

                var variableMasAlta = Enfado == perfil ? "Enfado" :
                        Tristeza == perfil ? "Tristeza" :
                        Temor == perfil ? "Temor" :
                        Asco == perfil ? "Asco" :
                        Alegria == perfil ? "Alegria": null;


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
        }
    });

    xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/inputIntent/web/Intent/" + res);
    xhr.send(data);

}


function validar() {
	  $("#tbody").empty();
	  obtenerGrabaciones();

}

function toggleSideBar(){
    document.getElementById("sidebar").classList.toggle('active');
}


/*
 * Funciones para Borrar
 */

function for_check() {
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', function () {
            if (this.checked) {
                this.parentNode.parentNode.classList.add('activo_check');
            } else {
                this.parentNode.parentNode.classList.remove('activo_check');
            }
        });
    }
}

function grabacionesEliminarTxt(grabaciones) {

    console.log(grabaciones);
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
           
        }
    });

    for (i = 0; i < grabaciones.length; i++) {
        xhr.open("DELETE", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/inputIntent/web/Intent/" + grabaciones[i]);
        xhr.send(data);
    }

}

function  grabacionesEliminarwav(grabaciones){
        console.log(grabaciones);
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            
            var grabacionesBorradas = this.responseText;
            var json =  JSON.parse(grabacionesBorradas);
            if(json.status === 'file deleted successfully on web server'){
                eliminarHTML(grabaciones);
                swal(
                        'Good!',
                        'Borrado exitoso!',
                        'success'
                        );
            }
            else{
                                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Error al borrar el archivo!' 
                });
            }
        }
    });

    for (i = 0; i < grabaciones.length; i++) {
        var grabacion = grabaciones[i].replace(".txt", ".wav");
        xhr.open("DELETE", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/ControladorGrabaciones/web/Record/" + grabacion);
        xhr.send(data);
    }
}


function eliminarHTML(grabaciones){
    for (i = 0;  grabaciones.length; i++){
        var grabacion = grabaciones[i].replace(".txt", ".wav");
        var elementoBorrar = document.getElementById(grabacion);
        tableBody[0].removeChild(elementoBorrar);
        
    }
}

function checkBoxSeleccionado() {
    var grabaciones = [];
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === true) {
            grabaciones.push(checkboxes[i].name);
        }
    }
    grabacionesEliminarTxt(grabaciones);
    grabacionesEliminarwav(grabaciones);
}

btn_borrar.addEventListener('click', function () {
    checkBoxSeleccionado();
});

checkTodos.addEventListener('click', function (){
   if(this.checked){
       var todosRegistros = tableBody[0].getElementsByTagName('tr');
       for(var i = 0; i < checkboxes.length; i ++){
           checkboxes[i].checked = true;
           todosRegistros[i].classList.add('activo_check');
       }
   } else{
              var todosRegistros = tableBody[0].getElementsByTagName('tr');
       for(var i = 0; i < checkboxes.length; i ++){
           checkboxes[i].checked = false;
           todosRegistros[i].classList.remove('activo_check');
       }
   }
});