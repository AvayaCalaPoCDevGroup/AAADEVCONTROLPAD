package service.AAADEVCONTROLPAD.Servlets;


import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.avaya.collaboration.util.logger.Logger;

import service.AAADEVCONTROLPAD.Languaje_Translator;
import service.AAADEVCONTROLPAD.Natural_Language_Understanding;
import service.AAADEVCONTROLPAD.Watson_Assistant;
import service.AAADEVCONTROLPAD.Bean.Languaje_Translator_Bean;
import static service.AAADEVCONTROLPAD.Servlets.Authentication.Watson;
import static service.AAADEVCONTROLPAD.Servlets.Authentication.Natural;
import static service.AAADEVCONTROLPAD.Servlets.STT.myBeanObj_SPTT;

/**
 *
 * @author umansilla
 */
@WebServlet(name = "analisisTexto", urlPatterns = {"/analisisTexto"})
public class analisisTexto extends HttpServlet {

	private static final long serialVersionUID = 1L;
	public static Languaje_Translator_Bean myBeanObj_LT = null;
	private transient final Logger logger = Logger.getLogger(analisisTexto.class);

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     * 
     * 
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
//        processRequest(request, response);
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
     * El método doGet, recibe el parametro comentarios con el téxto que se desa analizar con NLU y WA, antes que 
     * realice el análisis, valida si se han inicializado las variables staticas Watson y Natural las cuales
     * son de tipo Boolean
     * 
     * Al detectar que el texto es en Español o en Portugues, traduce el idioma a inlges y postriormente envía la información a 
     * NLU y a WA
     * 
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	logger.info("Solicitud POST análisisTexto");
        setAccessControlHeaders(response);
        PrintWriter out = response.getWriter();
        logger.info("languaje = "+ myBeanObj_SPTT.getLanguaje());
        if (Watson == false || Natural == false) {
            JSONObject resultado = new JSONObject();
            resultado.put("Status", "No se han ingresado credenciales");
            resultado.put("WA", Watson);
            resultado.put("NLU", Natural);
            out.println(resultado);
        } else {
            try {
                String texto = request.getParameter("comentarios");
                logger.info("Texto: " + texto);

                
                if (myBeanObj_SPTT.getLanguaje().equals("es-MX")) {
                	logger.info("Languaje = es-MX = " + myBeanObj_SPTT.getLanguaje());
                	myBeanObj_LT = new Languaje_Translator_Bean();
                	
                    myBeanObj_LT.setModelId("es-en"); // Null point Exception
                    logger.info("Languaje_Translator");
                    //WATASON LANGUAJE TRANSLATOR
                    texto = Languaje_Translator.main(texto);
                    //WATSON Assistant
                    logger.info("Watson_Assistant");
                    String intent = Watson_Assistant.main(texto);
                    //WATASON NAtural Languaje
                    logger.info("Natural_Language_Understanding");
                    String[] arregloEmociones = Natural_Language_Understanding.main(texto);
                    JSONObject json = new JSONObject();
                    json.put("Anger", arregloEmociones[0]);
                    json.put("Disgust", arregloEmociones[1]);
                    json.put("Fear", arregloEmociones[2]);
                    json.put("Joy", arregloEmociones[3]);
                    json.put("sadness", arregloEmociones[4]);
                    json.put("Intent", intent);
                    JSONObject jsonIntent = new JSONObject();
                    jsonIntent.put("Intent", intent);
                    json.put("Intent", jsonIntent);
                    out.print(json);
                }
                if (myBeanObj_SPTT.getLanguaje().equals("pt-BR")) {
                	logger.info("Languaje = pt-BR = " + myBeanObj_SPTT.getLanguaje());
                	myBeanObj_LT = new Languaje_Translator_Bean();
                	
                    myBeanObj_LT.setModelId("pt-en"); //Null Point Exception
                    logger.info("Languaje_Translator");
                    //WATASON LANGUAJE TRANSLATOR
                    texto = Languaje_Translator.main(texto);
                    //WATSON Assistant
                    logger.info("Watson_Assistant");
                    String intent = Watson_Assistant.main(texto);
                    myBeanObj_LT.setModelId("es-en");
                    intent = Languaje_Translator.main(intent);
                    myBeanObj_LT.setModelId("en-pt");
                    intent = Languaje_Translator.main(intent);
                    //WATASON NAtural Languaje
                    logger.info("Natural_Language_Understanding");
                    String[] arregloEmociones = Natural_Language_Understanding.main(texto);
                    JSONObject json = new JSONObject();
                    json.put("Anger", arregloEmociones[0]);
                    json.put("Disgust", arregloEmociones[1]);
                    json.put("Fear", arregloEmociones[2]);
                    json.put("Joy", arregloEmociones[3]);
                    json.put("sadness", arregloEmociones[4]);
                    json.put("Intent", intent);
                    JSONObject jsonIntent = new JSONObject();
                    jsonIntent.put("Intent", Languaje_Translator.main(intent));
                    json.put("Intent", jsonIntent);
                    out.print(json);

                }
                if (myBeanObj_SPTT.getLanguaje().equals("en-US")) {
                	logger.info("Languaje = en-US = " + myBeanObj_SPTT.getLanguaje());
                	logger.info("Watson_Assistant");
                	myBeanObj_LT = new Languaje_Translator_Bean();
                    //WATSON Assistant
                    String intent = Watson_Assistant.main(texto);
                    //WATASON NAtural Languaje
                    myBeanObj_LT.setModelId("es-en");
                    intent = Languaje_Translator.main(intent);
                    logger.info("Natural_Language_Understanding");
                    String[] arregloEmociones = Natural_Language_Understanding.main(texto); //listo
                    JSONObject json = new JSONObject();
                    json.put("Anger", arregloEmociones[0]);
                    json.put("Disgust", arregloEmociones[1]);
                    json.put("Fear", arregloEmociones[2]);
                    json.put("Joy", arregloEmociones[3]);
                    json.put("sadness", arregloEmociones[4]);
                    json.put("Intent", intent);
                    JSONObject jsonIntent = new JSONObject();
                    jsonIntent.put("Intent", intent);
                    json.put("Intent", jsonIntent);
                    out.print(json);
                }
            } catch (Exception e) {
                JSONObject jsonError = new JSONObject();
                jsonError.put("Error: ", e);
                out.println(jsonError);
            }
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
