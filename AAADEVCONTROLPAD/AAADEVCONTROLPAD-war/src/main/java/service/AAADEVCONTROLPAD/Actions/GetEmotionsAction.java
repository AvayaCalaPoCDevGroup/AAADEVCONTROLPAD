/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service.AAADEVCONTROLPAD.Actions;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;

import service.AAADEVCONTROLPAD.Bean.InputIntent;
import service.AAADEVCONTROLPAD.Util.Constants;
import service.AAADEVCONTROLPAD.Util.PartToString;

/**
 *
 * @author umansilla
 */
public class GetEmotionsAction {
    
    private final HttpServletRequest request;

    public GetEmotionsAction(HttpServletRequest request) {
        this.request = request;
    }

    public JSONObject getEmotions() throws IOException, ServletException {
        String wavFile = new PartToString().getStringValue(request.getPart("wavFile"));
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String json = gson.toJson(listFilesForFolder(wavFile)); //convert 
        return new JSONObject(json);
    }

    private static InputIntent listFilesForFolder(final String wavFile) {
       
        InputIntent intentObject = null;
        String txtFile = wavFile.replace(".wav", ".txt");
        try (FileReader reader = new FileReader(Constants.ROUTE_INTENTS + txtFile);
                BufferedReader br = new BufferedReader(reader)) {
            // read line by line
            String line;
            StringBuilder sb = new StringBuilder();
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }

            JSONObject jsonIntentResults = new JSONObject(sb.toString());
            intentObject = new InputIntent(jsonIntentResults.getString("Anger"),
                    jsonIntentResults.getString("Fear"),
                    jsonIntentResults.getString("Disgust"),
                    jsonIntentResults.getString("Joy"),
                    jsonIntentResults.getString("sadness"));

        } catch (IOException e) {
            System.err.format("IOException: %s%n", e);
        }
        return intentObject;
    }
    
    
}
