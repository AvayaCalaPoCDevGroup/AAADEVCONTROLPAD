/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
console.log("Funciona app3 29/10/2018");
// console.log("Funciona app3 29/10/2018");
var data = null;
var contador = 0;
let angv = 0;
let sadv = 0;
let fearv = 0;
let disgv = 0;
let joyv = 0;
var languajeindex = 'español';
var res = "";
var myObjIntn = "";
var btn_borrar = document.getElementById('btn_borrar');
var checkboxes = document.getElementsByClassName('borrar_contacto');
var tableBody = document.getElementsByTagName('tbody');
var checkTodos = document.getElementById('borrar_todos');
var acomodar = document.getElementById('th-sm');
var acomodarOrigen = document.getElementById('th-sm1');
var acomodarDestino = document.getElementById('th-sm2');

// Obtener el dominio. 11 De enero 2019


var absolutePath = getAbsolutePath();

var selectBox = document.getElementById("mySelect");

function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}
/*
 * Recargar tabla
 */
function validar() {
    if (selectBox.selectedIndex === 0) {
        document.getElementById('th-sm').innerHTML = "Hora";
        document.getElementById('th-sm1').innerHTML = "Origen";
        document.getElementById('th-sm2').innerHTML = "Destino";
        document.getElementById('th-sm3').innerHTML = "Audio";
        document.getElementById('th-sm4').innerHTML = "Transcripción";
        document.getElementById('th-sm5').innerHTML = "Confianza";
        document.getElementById('th-sm6').innerHTML = "Intención";
        document.getElementById('th-sm7').innerHTML = "Emociones";
    }
    if (selectBox.selectedIndex === 1) {
        document.getElementById('th-sm').innerHTML = "Hora";
        document.getElementById('th-sm1').innerHTML = "Origem";
        document.getElementById('th-sm2').innerHTML = "Destino";
        document.getElementById('th-sm3').innerHTML = "Audio";
        document.getElementById('th-sm4').innerHTML = "Transcrição";
        document.getElementById('th-sm5').innerHTML = "Confiança";
        document.getElementById('th-sm6').innerHTML = "Intenção";
        document.getElementById('th-sm7').innerHTML = "Emoções";
    }
    if (selectBox.selectedIndex === 2) {
        document.getElementById('th-sm').innerHTML = "Time";
        document.getElementById('th-sm1').innerHTML = "Origin";
        document.getElementById('th-sm2').innerHTML = "Destino";
        document.getElementById('th-sm3').innerHTML = "Destination";
        document.getElementById('th-sm4').innerHTML = "Transcription";
        document.getElementById('th-sm5').innerHTML = "Confidence";
        document.getElementById('th-sm6').innerHTML = "Intention";
        document.getElementById('th-sm7').innerHTML = "Emotions";

    }


    $("#tbody").empty();
    obtenerGrabaciones();

}
// FIN 11 De enero 2019

validarSession();

function validarSession() {
    var session = sessionStorage.getItem('watsonUruario');
    console.log(session);
    if (session === "true") {
        obtenerGrabaciones();
    } else {
        window.location.href = "index.html";
    }

}


function cerrarSesion() {
    sessionStorage.clear();
}

function obtenerGrabaciones() {
    console.log("Ontener Grabaciones");
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let myObj = JSON.parse(this.responseText);
            for (let i = 0; i <= Object.keys(myObj).length - 1; i++) {

                let tbody = document.querySelector('.tbody'); // <tbody>

                let nuevoTBodyTr = document.createElement("tr");
                nuevoTBodyTr.setAttribute("id", myObj["Index " + i + ""]);
                let nuevoTBodyTh = document.createElement("th");
                nuevoTBodyTh.setAttribute("class", "wavs " + contador);
                nuevoTBodyTh.setAttribute("style", "visibility: hidden");
                let wav = document.createTextNode(myObj["Index " + i + ""]);
                let wavNombre = (myObj["Index " + i + ""]);
                res = wavNombre.replace(".wav", ".txt");
// nuevoTBodyTh.appendChild(wav);
// nuevoTBodyTr.appendChild(nuevoTBodyTh);


                contador++;
                var data = null;
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                xhr.addEventListener("readystatechange", function () {

                    if (this.readyState === 4) {

                        myObjIntn = JSON.parse(this.responseText);


                        for (let j = 1; j <= 10; j++) {
                            let nuevoTrTd = document.createElement("td");
                            let nuevoaudio = document.createElement("AUDIO");
                            if (j === 1) {
                                let nuevoButtonProcesar = document.createElement('td');
                                var texto = document.createTextNode(myObjIntn.fechayHora);
                                nuevoButtonProcesar.appendChild(texto);
                                nuevoTrTd.appendChild(nuevoButtonProcesar);
                            }
                            if (j === 2) {


                                let nuevoButtonProcesar = document.createElement('td');
                                var texto = document.createTextNode(myObjIntn.Origen);
                                nuevoButtonProcesar.appendChild(texto);
                                nuevoTrTd.appendChild(nuevoButtonProcesar);
                            }
                            if (j === 3) {

                                let nuevoButtonProcesar = document.createElement('td');
                                var texto = document.createTextNode(myObjIntn.Destino);
                                nuevoButtonProcesar.appendChild(texto);
                                nuevoTrTd.appendChild(nuevoButtonProcesar);
                            }
                            if (j === 4) {
                                let wav2 = (myObj["Index " + i + ""]);
                                nuevoaudio.setAttribute("class", "democlass");
                                nuevoaudio.controls = true;
                                if (selectBox.selectedIndex === 0) {
                                    nuevoaudio.setAttribute("src", absolutePath + "ControladorGrabaciones/web/Record/" + wav2);
                                }
                                if (selectBox.selectedIndex === 1) {
                                    nuevoaudio.setAttribute("src", absolutePath + "ControladorGrabaciones/web/RecordPt/" + wav2);
                                }
                                if (selectBox.selectedIndex === 2) {
                                    nuevoaudio.setAttribute("src", absolutePath + "ControladorGrabaciones/web/RecordEn/" + wav2);
                                }

                                nuevoTrTd.appendChild(nuevoaudio);
                            }



                            if (j === 5) {
                                let nuevoButtonProcesar = document.createElement('td');
                                var texto = document.createTextNode(myObjIntn.Transcript);
                                nuevoButtonProcesar.appendChild(texto);
                                nuevoTrTd.appendChild(nuevoButtonProcesar);
                            }
                            if (j === 6) {


                                let confianza = myObjIntn.COnfidence;
                                let nuevoButtonProcesar = document.createElement('td');
                                var texto = document.createTextNode(confianza);
                                nuevoButtonProcesar.appendChild(texto);
                                nuevoTrTd.appendChild(nuevoButtonProcesar);
                            }
                            if (j === 7) {


                                let intent = myObjIntn.Intent.Intent;
                                let nuevoButtonProcesar = document.createElement('td');
                                var texto = document.createTextNode(intent);
                                nuevoButtonProcesar.appendChild(texto);
                                nuevoTrTd.appendChild(nuevoButtonProcesar);
                            }

                            if (j === 8) {
                                // let wav2 = (myObj["Index " + i + ""]);
                                let nuevoButtonProcesar = document.createElement('button');
                                nuevoButtonProcesar.setAttribute("data-toggle", "modal");
                                nuevoButtonProcesar.setAttribute("data-target", "#exampleModal");
                                nuevoButtonProcesar.setAttribute("class", "btn btn-info");
                                nuevoButtonProcesar.setAttribute("onclick", "Ver(event)");
                                // Modificado 11 de Enero 2019
                                if (selectBox.selectedIndex === 0) {
                                    var texto = document.createTextNode('Ver');
                                }
                                if (selectBox.selectedIndex === 1) {
                                    var texto = document.createTextNode('Ver');
                                }
                                if (selectBox.selectedIndex === 2) {
                                    var texto = document.createTextNode('Watch');
                                }
                                nuevoButtonProcesar.appendChild(texto);
                                nuevoTrTd.appendChild(nuevoButtonProcesar);
                            }
                            if (j === 9) {
                                let info2 = document.createElement("input");
                                info2.setAttribute("type", "checkbox");
                                info2.setAttribute("name", wavNombre);
                                info2.classList.add("borrar_contacto");
                                nuevoTrTd.setAttribute("class", "borrar");
                                nuevoTrTd.appendChild(info2);
                            }


                            nuevoTBodyTr.appendChild(nuevoTrTd);
                        }

                        tbody.appendChild(nuevoTBodyTr);
                    }
                    for_check();
                });

                xhr.open("GET", absolutePath + "inputIntent/web/Intent/" + res);
                xhr.send(data);

            }

        }

    }
    );
    if (selectBox.selectedIndex === 0) {
        xhr.open("GET", absolutePath + "Grabaciones/web/Record/");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }
    if (selectBox.selectedIndex === 1) {
        xhr.open("GET", absolutePath + "Grabaciones/web/RecordPt/");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }
    if (selectBox.selectedIndex === 2) {
        xhr.open("GET", absolutePath + "Grabaciones/web/RecordEn/");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }

}


/*
 * Desplegar emociones
 */
function Ver(e) {

    var path = e.path || (e.composedPath && e.composedPath());


    let tds = path[2].id;

    console.log(tds);

    res = tds.replace(".wav", ".txt");
    console.log("RES");
    console.log(res);
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;



    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            var myObjEmociones = JSON.parse(this.responseText);

            angv = (myObjEmociones.Anger * 100);
            sadv = (myObjEmociones.sadness * 100);
            fearv = (myObjEmociones.Fear * 100);
            disgv = (myObjEmociones.Disgust * 100);
            joyv = (myObjEmociones.Joy * 100);

            if (selectBox.selectedIndex === 0) {
                var Enfado = angv,
                        Tristeza = sadv,
                        Temor = fearv,
                        Rechazo = disgv,
                        Alegria = joyv;

                var perfil = Math.max(Enfado, Tristeza, Temor, Rechazo, Alegria);

                var variableMasAlta = Enfado == perfil ? "Enfado" :
                        Tristeza == perfil ? "Tristeza" :
                        Temor == perfil ? "Temor" :
                        Rechazo == perfil ? "Rechazo" :
                        Alegria == perfil ? "Alegria" : null;

                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light1", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: false,
                    animationEnabled: true,
                    title: {
                        text: "Puntaje mayor " + variableMasAlta + " = " + Math.max(angv, sadv, fearv, disgv, joyv) + "%"
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
                                {y: disgv, label: "Rechazo"},
                                {y: joyv, label: "Alegría"}

                            ]
                        }]
                });
                chart.render();
            }

            if (selectBox.selectedIndex === 1) {
                var Enfado = angv,
                        Tristeza = sadv,
                        Temor = fearv,
                        Rechazo = disgv,
                        Alegria = joyv;

                var perfil = Math.max(Enfado, Tristeza, Temor, Rechazo, Alegria);

                var variableMasAlta = Enfado == perfil ? "Irritado" :
                        Tristeza == perfil ? "Tristeza" :
                        Temor == perfil ? "Medo" :
                        Rechazo == perfil ? "Rejeição" :
                        Alegria == perfil ? "Felicidade" : null;

                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light1", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: false,
                    animationEnabled: true,
                    title: {
                        text: "Pontuação sênior " + variableMasAlta + " = " + Math.max(angv, sadv, fearv, disgv, joyv) + "%"
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
                                {y: angv, label: "Irritado"},
                                {y: sadv, label: "Tristeza"},
                                {y: fearv, label: "Medo"},
                                {y: disgv, label: "Rejeição"},
                                {y: joyv, label: "Felicidade"}

                            ]
                        }]
                });
                chart.render();
            }

            if (selectBox.selectedIndex === 2) {
                var Enfado = angv,
                        Tristeza = sadv,
                        Temor = fearv,
                        Rechazo = disgv,
                        Alegria = joyv;

                var perfil = Math.max(Enfado, Tristeza, Temor, Rechazo, Alegria);

                var variableMasAlta = Enfado == perfil ? "Anger" :
                        Tristeza == perfil ? "Sadness" :
                        Temor == perfil ? "Fear" :
                        Rechazo == perfil ? "Disgust" :
                        Alegria == perfil ? "Joy" : null;

                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light1", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: false,
                    animationEnabled: true,
                    title: {
                        text: "Senior Score " + variableMasAlta + " = " + Math.max(angv, sadv, fearv, disgv, joyv) + "%"
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



        }
    });

    xhr.open("GET", absolutePath + "inputIntent/web/Intent/" + res);
    xhr.send(data);

}


/*
 * SideBar Menu
 */
function toggleSideBar() {
    document.getElementById("sidebar").classList.toggle('active');
}

/*
 * Funciones para arreglar Lista
 */
function acomodarValores() {
    console.log("Acomodar");
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("dtBasicExample");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /*
	 * Make a loop that will continue until no switching has been done:
	 */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*
		 * Loop through all table rows (except the first, which contains table
		 * headers):
		 */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /*
			 * Get the two elements you want to compare, one from current row
			 * and one from the next:
			 */
            n = 0;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*
			 * Check if the two rows should switch place, based on the
			 * direction, asc or desc:
			 */
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*
			 * If a switch has been marked, make the switch and mark that a
			 * switch has been done:
			 */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*
			 * If no switching has been done AND the direction is "asc", set the
			 * direction to "desc" and run the while loop again.
			 */
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


function sortTableOrigen() {

    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("dtBasicExample");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /*
	 * Make a loop that will continue until no switching has been done:
	 */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*
		 * Loop through all table rows (except the first, which contains table
		 * headers):
		 */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /*
			 * Get the two elements you want to compare, one from current row
			 * and one from the next:
			 */
            n = 0;
            x = rows[i].children[1].innerText;
            y = rows[i + 1].children[1].innerText;
            /*
			 * Check if the two rows should switch place, based on the
			 * direction, asc or desc:
			 */
            if (dir === "asc") {
                if (x.toLowerCase() > y.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.toLowerCase() < y.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*
			 * If a switch has been marked, make the switch and mark that a
			 * switch has been done:
			 */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*
			 * If no switching has been done AND the direction is "asc", set the
			 * direction to "desc" and run the while loop again.
			 */
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


function sortTableDestino() {

    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("dtBasicExample");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /*
	 * Make a loop that will continue until no switching has been done:
	 */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*
		 * Loop through all table rows (except the first, which contains table
		 * headers):
		 */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /*
			 * Get the two elements you want to compare, one from current row
			 * and one from the next:
			 */
            n = 0;
            x = rows[i].children[2].innerText;
            y = rows[i + 1].children[2].innerText;
            /*
			 * Check if the two rows should switch place, based on the
			 * direction, asc or desc:
			 */
            if (dir === "asc") {
                if (x.toLowerCase() > y.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.toLowerCase() < y.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*
			 * If a switch has been marked, make the switch and mark that a
			 * switch has been done:
			 */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*
			 * If no switching has been done AND the direction is "asc", set the
			 * direction to "desc" and run the while loop again.
			 */
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
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
        var grabacion = grabaciones[i].replace(".wav", ".txt");
        xhr.open("DELETE", absolutePath + "inputIntent/web/Intent/" + grabacion);
        xhr.send(data);
    }

}

function  grabacionesEliminarwav(grabaciones) {
    console.log(grabaciones);
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            var grabacionesBorradas = this.responseText;
            var json = JSON.parse(grabacionesBorradas);
            if (json.status === 'file deleted successfully on web server') {
                eliminarHTML(grabaciones);
                swal(
                        'Good!',
                        'Borrado exitoso!',
                        'success'
                        );
            } else {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Error al borrar el archivo!'
                });
            }
        }
    });

    for (i = 0; i < grabaciones.length; i++) {

        if (selectBox.selectedIndex === 0) {
            xhr.open("DELETE", absolutePath + "ControladorGrabaciones/web/Record/" + grabaciones[i]);
            xhr.send(data);
        }
        if (selectBox.selectedIndex === 1) {
            xhr.open("DELETE", absolutePath + "ControladorGrabaciones/web/RecordPt/" + grabaciones[i]);
            xhr.send(data);
        }
        if (selectBox.selectedIndex === 2) {
            xhr.open("DELETE", absolutePath + "ControladorGrabaciones/web/RecordEn/" + grabaciones[i]);
            xhr.send(data);
        }

    }
}


function eliminarHTML(grabaciones) {
    for (i = 0; i < grabaciones.length; i++) {
        var grabacion = grabaciones[i];
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
    grabacionesEliminarwav(grabaciones);
    grabacionesEliminarTxt(grabaciones);

}

btn_borrar.addEventListener('click', function () {
    checkBoxSeleccionado();
});

checkTodos.addEventListener('click', function () {
    if (this.checked) {
        var todosRegistros = tableBody[0].getElementsByTagName('tr');
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            todosRegistros[i].classList.add('activo_check');
        }
    } else {
        var todosRegistros = tableBody[0].getElementsByTagName('tr');
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
            todosRegistros[i].classList.remove('activo_check');
        }
    }
});




acomodar.addEventListener('click', function () {
    acomodarValores();
});

acomodarOrigen.addEventListener('click', function () {
    sortTableOrigen();
});

acomodarDestino.addEventListener('click', function () {
    sortTableDestino();
});