package service.AAADEVCONTROLPAD.Servlets;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.AAADEVCONTROLPAD.Encoder;

import com.avaya.collaboration.util.logger.Logger;



/**
 *
 * @author umansilla
 */
@MultipartConfig
@WebServlet(urlPatterns = {"/PeticionBase64/*"})
public class PeticionBase64 extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private transient final Logger logger = Logger.getLogger(PeticionBase64.class);

    String userHomeDir = null;
    String osName = null;
    String windows = "WINDOWS";


    @Override
    public void init() throws ServletException {
        this.userHomeDir = System.getProperty("user.home");
        this.osName = System.getProperty("os.name");
    }
    

	public PeticionBase64() {
		super();
	}

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     * response)
     * 
     * El método doGet se usa para codificar en base64 un audio en especifico de acuerdo con la ruta especificada 
     *  PeticionBase64/web/Watson/audio.wav
     * 
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	logger.info("Metodo GET");
    	PrintWriter out = response.getWriter();
    	setAccessControlHeaders(response);
        String reviewLocationOnHttpServer = null;
        File audioFile = null;
        String reqURIForReview = request.getRequestURL().toString();
        String[] recordNameArray = reqURIForReview.split("\\/");
        String recFileName = recordNameArray[recordNameArray.length - 1];
        final String str[] = reqURIForReview.split("/");
        final int lengthUrlPre = reqURIForReview.indexOf(str[4]);
        final int lengthUrlPost = str[4].length();
        final int completeUrl = lengthUrlPre + lengthUrlPost;
        final String folderPath = reqURIForReview.substring(completeUrl, reqURIForReview.lastIndexOf('/'));
        reviewLocationOnHttpServer = userHomeDir + folderPath;
        audioFile = new File(reviewLocationOnHttpServer + "/" + recFileName);
        
        String Base64 = (Encoder.encoder(audioFile.getAbsolutePath()));
        response.setHeader("Content-Type", "text/plain");
        out.println(Base64);     
      
    }

  //AUTORIZAR CROSS DOMAIN
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setAccessControlHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private void setAccessControlHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://devavaya.ddns.net:8080");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With");
    }
    


}