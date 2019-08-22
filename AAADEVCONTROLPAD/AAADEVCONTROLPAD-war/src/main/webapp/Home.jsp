<%-- 
    Document   : Home
    Created on : Aug 21, 2019, 12:11:20 PM
    Author     : umansilla
--%>
<%@page import="service.AAADEVCONTROLPAD.Bean.Usuario"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Avaya And Watson Assistant IVR</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Use This for 
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"> -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap.min.css">
        <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
        <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap.min.js"></script>
        <style>
            #demotext {
                color: #FFFFFF;
                background: #FFFFFF;
                text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5;
                color: #FFFFFF;
                background: #FFFFFF;
            }
        </style>
    </head>

    <%

        Usuario usuario = (Usuario) request.getAttribute("Usuario");
        String userName = usuario.getName();
        if (userName == null || userName.isEmpty()) {
            userName = usuario.getUsername();
        }
    %>
    <body>
        <nav class="navbar navbar-default text-center">
            <div class="container-fuid ">

                <div class="navbar-header text-center">
                    <h2 style="font-weight: bold; text-align: center; font-weight: 50px !important;" class="text-center navbar-text">America’s International PoC Development Team</h2>

                </div>

                <ul class="nav navbar-nav navbar-right">
                    <p class="navbar-text">Signed in as <span style="font-weight: bold;"><%= userName%></span></p>
                    <p class="navbar-text"><a class="navbar-link" id="closeSessionBtn" style="cursor:pointer;">Close Session</a></p>

                </ul>
            </div>
        </nav> 
        <div class="jumbotron" style="background-color: #c72d1c">
            <img src="img/avaya-01-logo-black-and-white.png" width="190" height= "60" style="display: inline;">
            <p style="display: inline; color: white; font-size: 40px;">|</p>
            <p style="display: inline; color: white; text-align: center; font-size: 30px;"> Watson Assistant IVR </p>
        </div>


        <ol class="breadcrumb">
            <li><a id="homeRedirectPage" style="cursor: pointer">Home</a></li>

        </ol>

        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <a class="thumbnail" style="height: 85px; width: 250px; margin: 0 auto; cursor: pointer;" id="esSelect">
                        <div id="demotext" style="text-align: center;
                             margin: 0 auto;"><span  style="font-size: 50px" >Espa&ntilde;ol</span></div>
                    </a>
                </div>
                <div class="col-md-4">
                    <a class="thumbnail" style="height: 85px; width: 250px; margin: 0 auto; cursor: pointer;" id="ptSelect">
                        <div id="demotext" style="text-align: center;
                             margin: 0 auto;"><span  style="font-size: 50px" >Portugues</span></div>
                    </a>
                </div>
                <div class="col-md-4">
                    <a class="thumbnail" style="height: 85px; width: 250px; margin: 0 auto; cursor: pointer;" id="enSelect">
                        <div id="demotext" style="text-align: center;
                             margin: 0 auto;"><span  style="font-size: 50px" >English</span></div>
                    </a>
                </div>
            </div>
        </div>

        <script src="js/sweetAlertmin.js"></script>
        <script src="js/jquery.canvasjs.min.js"></script>

        <script src="js/home.js"></script>


    </body>
</html>
