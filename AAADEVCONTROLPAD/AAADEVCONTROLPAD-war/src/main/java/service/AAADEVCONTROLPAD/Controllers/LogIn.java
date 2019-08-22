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

import org.json.JSONObject;

import service.AAADEVCONTROLPAD.Actions.VerifyLogInUser;
import service.AAADEVCONTROLPAD.Util.PartToString;
/**
 *
 * @author umansilla
 */
@MultipartConfig
@WebServlet(name = "LogIn", urlPatterns = {"/LogIn"})
public class LogIn extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        JSONObject json = new JSONObject();
        String actionString = new PartToString().getStringValue(request.getPart("action"));
        response.setContentType("application/json");
        switch (actionString) {
            case "LogIn":
                VerifyLogInUser credentials = new VerifyLogInUser(request);
                json = credentials.verify();
                break;
            case "GetUser":
                break;
        }
        out.println(json);
    }
    
}
