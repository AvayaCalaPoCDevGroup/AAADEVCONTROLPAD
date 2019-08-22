/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.AAADEVCONTROLPAD.Actions;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import service.AAADEVCONTROLPAD.Bean.Usuario;
import service.AAADEVCONTROLPAD.Util.Constants;
import service.AAADEVCONTROLPAD.Util.PartToString;


/**
 *
 * @author umansilla
 */
public class DeleteAudios {

    private final HttpServletRequest request;

    public DeleteAudios(HttpServletRequest request) {
        this.request = request;
    }

    public JSONObject delete() throws IOException, ServletException {

        JSONObject json = new JSONObject();
        JSONArray jsonArrayResponseWav = new JSONArray();
        JSONArray jsonArrayResponseTxt = new JSONArray();
        String arrayString = new PartToString().getStringValue(request.getPart("AudiosArray"));
        JSONArray jsonArray = new JSONArray(arrayString);
        for (int i = 0; i < jsonArray.length(); i++) {
            String wavFile = jsonArray.getString(i);
            
            if (deleteWavFiles(wavFile)) {
                jsonArrayResponseWav.put(wavFile);
            }
            String txtFile = wavFile.replace(".wav", ".txt");
            if (deleteTextFiles(txtFile)) {
                jsonArrayResponseTxt.put(txtFile);
            }
        }
        return json.put("status", "ok").put("deletedAudios", jsonArrayResponseWav).put("deletedTextFile", jsonArrayResponseTxt);
    }

    private Boolean deleteWavFiles(String wavFile) {
    	HttpSession userSession = (HttpSession) request.getSession();
    	Usuario usuario = (Usuario) userSession.getAttribute("Usuario");
    	String routeLanguage = null;
    	if(usuario.getLanguage().equals("es")){
    		routeLanguage = Constants.ROUTE_GRABACIONES_ES;
    	}
    	if(usuario.getLanguage().equals("pt")){
    		routeLanguage = Constants.ROUTE_GRABACIONES_PT;
    	}
    	if(usuario.getLanguage().equals("en")){
    		routeLanguage = Constants.ROUTE_GRABACIONES_EN;
    	}
    	
        final File file = new File(routeLanguage + wavFile);
        if (file.exists() && file.delete()) {
            return true;
        } else {
            return false;
        }
    }

    private Boolean deleteTextFiles(String textFile) {
        
        final File file = new File(Constants.ROUTE_INTENTS + textFile);
        if (file.exists() && file.delete()) {
            return true;
        } else {
            return false;
        }
    }
}
