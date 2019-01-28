package service.AAADEVCONTROLPAD.Servlets;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;

import org.json.JSONException;
//import com.avaya.collaboration.util.logger.Logger;
import org.json.JSONObject;

import service.AAADEVCONTROLPAD.Arrays;

import com.avaya.collaboration.util.logger.Logger;





/**
 *
 * @author umansilla
 */
@MultipartConfig
@WebServlet(urlPatterns = {"/ControladorGrabaciones/*"})
public class ControladorGrabaciones extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private transient final Logger logger = Logger.getLogger(ControladorGrabaciones.class);

    String userHomeDir = null;
    String osName = null;
    String windows = "WINDOWS";


    @Override
    public void init() throws ServletException {
        this.userHomeDir = System.getProperty("user.home");
        this.osName = System.getProperty("os.name");
    }
    

	public ControladorGrabaciones() {
		super();
	}

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     * response)
     * 
     * El método doGet nos proporciona el audio en especifico, se debe de establecer la ruta en la que se ha guardado 
     * el audio web/Watson/
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//    	logger.info("Metodo GET");
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
//        logger.info("audioFile");
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");
        response.setHeader("Content-Type", "audio/wav");
        OutputStream out = response.getOutputStream();
        try (FileInputStream in = new FileInputStream(audioFile)) {
            byte[] buffer = new byte[4096];
            int length;
            while ((length = in.read(buffer)) > 0) {
                out.write(buffer, 0, length);
            }
        }
        
        out.flush();
//        logger.info("out.flush()");
      
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
     * response)
     * 
     * El método doPost guarda un nuevo audio en la apliación, Se deben de establecer las siguientes variables para 
     * realizar correctamente el POST
     * rec_data -> el archivo de audio formato wav
     * recFileName -> nombre del archivo con terminación .wav
     * restRecordURI -> con la ruta que se ha establecido /web/Watson/
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        logger.info("Método POST");
    	setAccessControlHeaders(response);
        String recFileName = null;
        System.out.println("doPost - Start");
        System.out.println("doPost - Request - User Home Dir is " + userHomeDir); //C:\Users umansilla
        System.out.println("doPost - Request - Operating System is " + osName);   //Windows 10
        String recordLocationOnHttpServer = null;
        File audioFile = null;
        String recFileUri = null;
        File dir = null;
        JSONObject responseJson = new JSONObject();
        try {
            /*https://docs.oracle.com/javaee/6/tutorial/doc/gmhba.html*/
            final Part audioPartOfFile = request.getPart("rec_data"); //Se refiere a los datos de grabación
            final Part audioFileName = request.getPart("recFileName");//hace referencia al nombre del archivo
            final Part audioFileRestUri = request.getPart("restRecordURI"); // hace referencia al URI de registro completo de la solicitud
            if (audioFileName != null) {
                recFileName = getStringValue(audioFileName);
            }
            if (audioFileRestUri != null) {
                recFileUri = getStringValue(audioFileRestUri);
            }
            final String str[] = recFileUri.split("/");

            final int lengthUrlPre = recFileUri.indexOf(str[4]);
            final int lengthUrlPost = str[4].length();
            final int completeUrl = lengthUrlPre + lengthUrlPost;
            final String folderPath = recFileUri.substring(completeUrl, recFileUri.lastIndexOf('/'));
            recordLocationOnHttpServer = userHomeDir + folderPath;
            if (folderPath.length() > 0) {
                dir = new File(recordLocationOnHttpServer);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
            }
//            logger.info(recordLocationOnHttpServer);
            
            audioFile = new File(recordLocationOnHttpServer + "/" + recFileName);

            final InputStream audioInput = audioPartOfFile.getInputStream();
            
            final byte audioBytes[] = new byte[(int) audioPartOfFile.getSize()];

            final FileOutputStream saveAudioFile
                    = new FileOutputStream(audioFile);
            while ((audioInput.read(audioBytes)) != -1) {
                InputStream byteAudioStream = new ByteArrayInputStream(audioBytes);
                final AudioFormat audioFormat = getAudioFormat();
                AudioInputStream audioInputStream
                        = new AudioInputStream(byteAudioStream, audioFormat, audioBytes.length);

                if (AudioSystem.isFileTypeSupported(AudioFileFormat.Type.WAVE,
                        audioInputStream)) {
                    AudioSystem.write(audioInputStream, AudioFileFormat.Type.WAVE, saveAudioFile);
                }
            }
            JSONObject grabaciones = Arrays.main(recordLocationOnHttpServer);
//            logger.info(grabaciones);
            audioInput.close();
            saveAudioFile.flush();
            saveAudioFile.close();
            responseJson.put("status", "file saved successfully on web server");
            responseJson.put("grabacion", recFileName);
            responseJson.put("Absolute Path", audioFile.getAbsolutePath());
        } catch (final Exception e) {
            e.printStackTrace();
            try {
                responseJson.put("status", "failed to save the recording on web server");
            } catch (JSONException ex) {
//            	logger.info("Error: " + ex);
                // Logger.getLogger(FileSaveServlet.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        response.setContentType("application/json");
        response.getWriter().write(responseJson.toString());
    }

    @Override
    /*
     * (non-Javadoc)
     * @see javax.servlet.http.HttpServlet#doDelete(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
     * 
     * El método doDelete borra un archivo de audio en específico, se debe determinar la ruta /web/Watson/audio.wav 
     * al final de la ruta especificar el archivo de audio que desea borrar
     */
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        logger.info("Método DELETE"); 
    	setAccessControlHeaders(resp);
        JSONObject responseJson = new JSONObject();
        String reqURIForDelete = req.getRequestURL().toString();
        final String str[] = reqURIForDelete.split("/");

        final int lengthUrlPre = reqURIForDelete.indexOf(str[5]);
        final String deleteFilePath = userHomeDir + "/" + reqURIForDelete.substring(lengthUrlPre, reqURIForDelete.length());
        final File file = new File(deleteFilePath);
        if (file.exists() && file.delete()) {
            resp.setStatus(HttpServletResponse.SC_OK);
            responseJson.put("status", "file deleted successfully on web server");
            resp.setContentType("application/json");
            resp.getWriter().write(responseJson.toString());
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            responseJson.put("status", "failed deleted on web server");
            resp.setContentType("application/json");
            resp.getWriter().write(responseJson.toString());
        }
        resp.setContentType("text/html");
    }

    private AudioFormat getAudioFormat() {
        final float sampleRate = 8000.0F;
        // 8000,11025,16000,22050,44100
        final int sampleSizeInBits = 16;
        // 8,16
        final int channels = 1;
        // 1,2
        final boolean signed = true;
        // true,false
        final boolean bigEndian = false;
        // true,false
        return new AudioFormat(
                sampleRate,
                sampleSizeInBits,
                channels,
                signed,
                bigEndian);
    }

    private String getStringValue(final Part part) {

        BufferedReader bufferedReader = null;
        final StringBuilder stringBuilder = new StringBuilder();
        String line;
        final String partName = part.getName();
        try {
            final InputStream inputStream = part.getInputStream();
            bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            while ((line = bufferedReader.readLine()) != null) {
                stringBuilder.append(line);
            }
        } catch (final IOException e) {
            System.out.println("getStringValue - IOException while reading inputStream. Part name : " + partName);
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (final IOException e) {
                    System.out.println("getStringValue - IOException while closing bufferedReader. Part name : " + partName);
                }
            }
        }
        return stringBuilder.toString();
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