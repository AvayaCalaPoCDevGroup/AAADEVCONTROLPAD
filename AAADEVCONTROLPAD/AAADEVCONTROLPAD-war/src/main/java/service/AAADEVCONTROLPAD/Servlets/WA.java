package service.AAADEVCONTROLPAD.Servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.AAADEVCONTROLPAD.Bean.Watson_Assistant_Bean;

/**
 *
 * @author umansilla
 */
@WebServlet(name = "WA", urlPatterns = {"/WA"})
public class WA extends HttpServlet {
     /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
     *Variable static de myBean
     */
    public static Watson_Assistant_Bean myBeanObj_WA;

    public WA() {
    }

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.sendRedirect("https://breeze2-132.collaboratory.avaya.com/services/AAADEVCONTROLPAD/index.html");
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     * 
     * El método doPost se usa para inicializar las credenciales de WatsonAssistant
     * UserName
     * CurrentVersion
     * Password
     * WorkSpaceID
     * 
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setAccessControlHeaders(response);
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        try {
            BufferedReader reader = request.getReader();
            Watson_Assistant_Bean myBean = gson.fromJson(reader, Watson_Assistant_Bean.class);
            myBeanObj_WA = myBean;
            JsonObject ok = new JsonObject();
            ok.addProperty("Status", "Ok");
            out.println(ok);
            response.setStatus(200);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            
        } catch (EnumConstantNotPresentException ex) {
            JsonObject error = new JsonObject();
            error.addProperty("Status", "Error");
            error.addProperty("Error", ex.getMessage());
            out.println(error);
            response.setStatus(403);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
    
        private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:8085");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With");
    }

}

