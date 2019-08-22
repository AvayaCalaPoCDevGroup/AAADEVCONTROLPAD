<%@page import="java.util.List"%>
<%@page import="service.AAADEVCONTROLPAD.Bean.InputIntent"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>

    </head>
    <%

    List<InputIntent> listIntents = (List<InputIntent>) request.getAttribute("Personas");

    %>
    <body>
        <% for (InputIntent persona : listIntents) {%>

        <h1>Transcript = <%= persona.getTranscript()%>   </h1> 

        
        <% }%>
    </body>
</html>
