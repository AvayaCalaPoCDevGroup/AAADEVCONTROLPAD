/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.AAADEVCONTROLPAD.Controllers;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import service.AAADEVCONTROLPAD.Actions.ChangeLanguage;
import service.AAADEVCONTROLPAD.Actions.CloseSession;
import service.AAADEVCONTROLPAD.Actions.DeleteAudios;
import service.AAADEVCONTROLPAD.Actions.GetAudiosAction;
import service.AAADEVCONTROLPAD.Actions.GetEmotionsAction;
import service.AAADEVCONTROLPAD.Actions.RestartTimeSession;
import service.AAADEVCONTROLPAD.Bean.Usuario;
import service.AAADEVCONTROLPAD.Util.PartToString;


/**
 *
 * @author umansilla
 */
@MultipartConfig
@WebServlet(name = "AdminController", urlPatterns = {"/AdminController"})
public class AdminController extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    	HttpSession userSession = (HttpSession) request.getSession();
        Usuario usuario = (Usuario) userSession.getAttribute("userActive");
        String pageHome = request.getParameter("Location");
        if (pageHome != null && pageHome.equals("home")) {
            request.setAttribute("Usuario", usuario);
            request.getRequestDispatcher("Home.jsp").forward(request, response);
        } else {
            if (usuario == null) {
                request.getRequestDispatcher("LogIn.html").forward(request, response);
            } else {
                GetAudiosAction audios = new GetAudiosAction();
                request.setAttribute("Registros", audios.getAudios(usuario.getLanguage()));
                usuario.setPassword(null);
                request.setAttribute("Usuario", usuario);
                request.getRequestDispatcher("index.jsp").forward(request, response);
            }
        }

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	setAccessControlHeaders(response);
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONObject json = new JSONObject();
        String action = new PartToString().getStringValue(request.getPart("action"));
        switch (action) {
            case "GetEmotions":
                GetEmotionsAction actionEmotions = new GetEmotionsAction(request);
                json = actionEmotions.getEmotions();
                break;
            case "DeleteAudios":
                DeleteAudios audio = new DeleteAudios(request);
                json = audio.delete();
                break;
            case "CloseSession":
                CloseSession session = new CloseSession(request);
                json = session.closeSession();
                break;
            case "ChangeLanguage":
                ChangeLanguage language = new ChangeLanguage(request);
                json = language.changeLanguage();
                break;
            case "RestartTimeSession":
                RestartTimeSession sessiontime = new RestartTimeSession(request);
                json = sessiontime.restartTime();
                break;
        }
        out.println(json);
    }

    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods",
                "GET, POST, DELETE, PUT");
        response.setHeader("Access-Control-Allow-Headers",
                "Content-Type, Accept, X-Requested-With");
    }
}
