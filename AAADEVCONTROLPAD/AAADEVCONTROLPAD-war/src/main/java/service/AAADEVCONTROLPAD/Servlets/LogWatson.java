package service.AAADEVCONTROLPAD.Servlets;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

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
@WebServlet(name = "LogWatson", urlPatterns = {"/LogWatson"})
public class LogWatson extends HttpServlet {

	private static final long serialVersionUID = 1L;

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
    	setAccessControlHeaders(response);
        PrintWriter out = response.getWriter();
        JSONObject json = new JSONObject();

        try {
            String username = request.getParameter("usuario");
            String password = request.getParameter("password");
            String pais = request.getParameter("pais");
            String cliente = request.getParameter("cliente");
            System.out.println(username + password + pais + cliente);
            FileWriter fichero = new FileWriter("home/wsuser/web/LogIn/Accesslogs.txt", true);
            PrintWriter pw = new PrintWriter(fichero);
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = new Date(System.currentTimeMillis());
            pw.println(df.format(date) +"_AAADEVCONTROLPAD"+"_Usuario:" + username +"_País:" + pais + "_Cliente:" + cliente);
            fichero.close();

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(200);
            json.put("status", "ok");
            out.print(json);

        } catch (Exception e) {
            JSONObject error = new JSONObject();
            error.put("Status", "Error");
            error.put("Error", e.toString());
            response.setStatus(404);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.println(error);

        }

    }
    
	// AUTORIZAR CROSS DOMAIN
	@Override
	protected void doOptions(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		setAccessControlHeaders(response);
		response.setStatus(HttpServletResponse.SC_OK);
	}

	private void setAccessControlHeaders(HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setHeader("Access-Control-Allow-Methods",
				"GET, POST, DELETE, PUT");
		response.setHeader("Access-Control-Allow-Headers",
				"Content-Type, Accept, X-Requested-With");
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

}
