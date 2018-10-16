package service.AAADEVCONTROLPAD.Servlets;

import com.avaya.collaboration.util.logger.Logger;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import java.io.IOException;
import java.io.PrintWriter;



import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.client.ClientProtocolException;
import static service.AAADEVCONTROLPAD.Servlets.STT.myBeanObj_SPTT;



/**
 *
 * @author umansilla
 */
@MultipartConfig
@WebServlet(urlPatterns = {"/PeticionVPS"})
public class PeticionVPS extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private transient final Logger logger = Logger.getLogger(PeticionVPS.class);


    

	public PeticionVPS() {
		super();
	}

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     * response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      PrintWriter out = response.getWriter();
      out.println("PeticionVPS");
    }
    
    /*
     * (non-Javadoc)
     * @see javax.servlet.http.HttpServlet#doPost(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
     * 
     * El método doPost es usado para solicitar la transcripción de un audio en especifo a la VPS.
     * Envía los siguientes parámetros como urlEncoded
     * audio = nombre del audio
     * idioma = el idioma del audio
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("Petición POST");
        PrintWriter out = response.getWriter();
        String audio = request.getParameter("audio");
        System.out.println(audio);
        String transcript;
        try {
            transcript = vpsPOST(audio);
            out.println(transcript);
        } catch (UnirestException ex) {
           logger.error(ex);
        }
    }
    
    public static String vpsPOST (String audio) throws ClientProtocolException, IOException, UnirestException{
    	 HttpResponse<String> response = Unirest.post("http://devavaya.ddns.net:8080/AAADEVURIEL_PRUEBAS_WATSON-war-1.0.0.0.0/TranscriptDesdeBreeze?audio="
    			 										+audio+"&idioma="+myBeanObj_SPTT.getLanguaje())
                 .header("Content-Type", "application/x-www-form-urlencoded")
                 .asString();
         return response.getBody().toString();
    }
    



}