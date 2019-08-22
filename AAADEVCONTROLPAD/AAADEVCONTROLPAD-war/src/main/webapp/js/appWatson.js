/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//Obtener datos del formulario
var sumbit = document.getElementById('submit_watson');
var formulario = document.getElementById('regForm');
var action = formulario.getAttribute('action');
var absolutePath = getAbsolutePath();
window.location.replace(absolutePath + "AdminController");

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}


function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n === 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n === (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n);
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n === 1 && !validateForm())
        return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        var fomulario = new FormData(formulario);
        var object = {};
        fomulario.forEach(function (value, key) {
            object[key] = value;
        });
        var usuario = object.usuario;
        var password = object.password;
        var pais = object.pais;
        var cliente = object.cliente;


        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var json = JSON.parse(this.responseText);

                for (var i = 0; i < json.length; i++) {
                    if (usuario === json[i].username && password === json[i].password) {
                        sessionStorage.setItem('watsonUruario', true);

                        Swal({
                            position: 'center',
                            type: 'success',
                            title: 'Log in exitoso',
                            showConfirmButton: false,
                            timer: 3000
                        });

                        makePost(usuario, password, pais, cliente);
                        break;
                    } else {
                        console.log("Incorrecto");
                        Swal({
                            type: 'error',
                            title: 'Error',
                            text: 'Usuario y/o contrasseña incorrectos',

                        });
                       
                    }
                }
            }

        });

        xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/ReadText/web/LogIn/Access.txt");
        xhr.send(data);


//        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}


function makePost(usuario, password, pais, cliente) {


    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            console.log(response.status);
            window.location.href = "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/Record.html";
        }
    });

    xhr.open("POST", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/LogWatson?usuario=" + usuario + "&password=" + password + "&pais=" + pais + "&cliente=" + cliente);

    xhr.send(data);
}


function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value === "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}