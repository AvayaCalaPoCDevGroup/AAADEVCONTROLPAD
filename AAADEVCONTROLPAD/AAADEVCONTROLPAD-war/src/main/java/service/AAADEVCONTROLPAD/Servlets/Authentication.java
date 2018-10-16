package service.AAADEVCONTROLPAD.Servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/**
 *
 * @author umansilla
 */
@WebServlet(name = "Authentication", urlPatterns = {"/Authentication"})
public class Authentication extends HttpServlet {

	public static Boolean Watson = false;
    public static Boolean Natural = false;
	private static final long serialVersionUID = 1L;
    
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     * 
     * El método doGet, valida las variables Boolean staticas Watson y Natural y regresa su valor respectivamente.
     */
    @SuppressWarnings("static-access")
	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setAccessControlHeaders(response);
        PrintWriter out = response.getWriter();

        NLU NaturalLanguajeUnderstanding = new NLU();
        WA WatssonAssistant = new WA();
        response.setContentType("application/json");
        JSONObject resultado = new JSONObject();
        
        if(WatssonAssistant.myBeanObj_WA == null){
            Watson = false;
        }else{
            
            Watson = true;
        }
        
        
        if(NaturalLanguajeUnderstanding.myBeanObj_NLU == null){
            Natural = false;
        }else{
           
            Natural = true;
        }
        
        if(Watson == true && Natural == true){
            resultado.put("Status", "true");
            out.println(resultado);
        }
        if(Watson == false && Natural == false){
            resultado.put("Status", "false");
            out.println(resultado);
        }
        
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
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

