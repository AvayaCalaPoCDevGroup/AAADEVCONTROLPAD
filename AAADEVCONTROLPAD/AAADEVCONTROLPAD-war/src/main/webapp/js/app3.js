/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
console.log("Funciona app3 29/10/2018");

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

obtenerGrabaciones();



function obtenerGrabaciones() {
    console.log("Ontener Grabaciones");
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
    let myObj = JSON.parse(this.responseText);
            for (let i = 0; i <= Object.keys(myObj).length - 1; i++) {

    let tbody = document.querySelector('.tbody'); //<tbody>

            let nuevoTBodyTr = document.createElement("tr");
            nuevoTBodyTr.setAttribute("id", myObj["Index " + i + ""]);
            let nuevoTBodyTh = document.createElement("th");
            nuevoTBodyTh.setAttribute("class", "wavs " + contador);
            nuevoTBodyTh.setAttribute("style", "visibility: hidden");
            let wav = document.createTextNode(myObj["Index " + i + ""]);
            let wavNombre = (myObj["Index " + i + ""]);
            res = wavNombre.replace(".wav", ".txt");
//                nuevoTBodyTh.appendChild(wav);
//                nuevoTBodyTr.appendChild(nuevoTBodyTh);


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
                    nuevoaudio.setAttribute("src", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/ControladorGrabaciones/web/Record/" + wav2);
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
                    nuevoButtonProcesar.setAttribute("onclick", "Ver()");
                    var texto = document.createTextNode('Ver');
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
            xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/inputIntent/web/Intent/" + res);
            xhr.send(data);
        }
        
    }
    
    }
    );
            xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/Grabaciones/web/Record/");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
            }
        

/*
 * Desplegar emociones
 */
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
                        Alegria == perfil ? "Alegria" : null;


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

    xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/inputTranscript/web/Intent/" + res);
    xhr.send(data);

}

/*
 * Recargar tabla
 */
function validar() {

    $("#tbody").empty();
    obtenerGrabaciones();

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
    /* Make a loop that will continue until
     no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
         first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
             one from current row and one from the next: */
            n = 0;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
             based on the direction, asc or desc: */
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
            /* If a switch has been marked, make the switch
             and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again. */
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
    /* Make a loop that will continue until
     no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
         first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
             one from current row and one from the next: */
            n = 0;
            x = rows[i].children[1].innerText;
            y = rows[i + 1].children[1].innerText;
            /* Check if the two rows should switch place,
             based on the direction, asc or desc: */
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
            /* If a switch has been marked, make the switch
             and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again. */
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
    /* Make a loop that will continue until
     no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
         first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
             one from current row and one from the next: */
            n = 0;
            x = rows[i].children[2].innerText;
            y = rows[i + 1].children[2].innerText;
            /* Check if the two rows should switch place,
             based on the direction, asc or desc: */
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
            /* If a switch has been marked, make the switch
             and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again. */
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
        xhr.open("DELETE", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/inputIntent/web/Intent/" + grabacion);
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
     
        xhr.open("DELETE", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/ControladorGrabaciones/web/Record/" + grabaciones[i]);
        xhr.send(data);
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
