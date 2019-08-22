/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.AAADEVCONTROLPAD.Actions;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import service.AAADEVCONTROLPAD.Bean.InputIntent;
import service.AAADEVCONTROLPAD.Util.Constants;

/**
 *
 * @author umansilla
 */
public class GetAudiosAction {

    public List<InputIntent> getAudios(String language) {
    	String routeLanguage = null;
    	if(language.equals("es")){
    		routeLanguage = Constants.ROUTE_GRABACIONES_ES;
    	}
    	if(language.equals("pt")){
    		routeLanguage = Constants.ROUTE_GRABACIONES_PT;
    	}
    	if(language.equals("en")){
    		routeLanguage = Constants.ROUTE_GRABACIONES_EN;
    	}
    	
    	
        final File folder = new File(routeLanguage);
        List<InputIntent> listIntents = listFilesForFolder(folder);
        return listIntents;
    }

    public static List<InputIntent> listFilesForFolder(final File folder) {
         List<InputIntent> listInputIntents = new ArrayList<>();
        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                listFilesForFolder(fileEntry);
            } else {
                String wavFile = fileEntry.getName();
                String txtFile = wavFile.replace(".wav", ".txt");
                try (FileReader reader = new FileReader(Constants.ROUTE_INTENTS +txtFile);
                        BufferedReader br = new BufferedReader(reader)) {
                    // read line by line
                    String line;
                    StringBuilder sb = new StringBuilder();
                    while ((line = br.readLine()) != null) {
                        sb.append(line);
                    }
                    
                    JSONObject jsonIntentResults = new JSONObject(sb.toString());
                    InputIntent intentObject = new InputIntent(jsonIntentResults.getString("Anger")
                            , jsonIntentResults.getString("Fear")
                            , jsonIntentResults.getString("Transcript")
                            , jsonIntentResults.getString("fechayHora")
                            , jsonIntentResults.getString("Disgust")
                            , jsonIntentResults.getString("Destino")
                            , jsonIntentResults.getString("Joy")
                            , jsonIntentResults.getString("sadness")
                            , jsonIntentResults.getJSONObject("Intent").getString("Intent")
                            , jsonIntentResults.getString("COnfidence")
                            , jsonIntentResults.getString("Origen"), fileEntry.getName());
                    listInputIntents.add(intentObject);
                } catch (IOException e) {
                    System.err.format("IOException: %s%n", e);
                }

            }
        }
        return listInputIntents;
    }
}
