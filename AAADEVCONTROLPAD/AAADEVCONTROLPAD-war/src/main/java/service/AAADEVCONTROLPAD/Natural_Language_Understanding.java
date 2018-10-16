package service.AAADEVCONTROLPAD;

import service.AAADEVCONTROLPAD.Servlets.NLU;

import com.ibm.watson.developer_cloud.natural_language_understanding.v1.NaturalLanguageUnderstanding;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.AnalysisResults;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.AnalyzeOptions;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.EmotionOptions;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.EmotionScores;
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model.Features;

/**
 *
 * @author umansilla
 */

/*
 * Al método ingresa el téxto que se desea analizar (solo en ingles), y regresa un arreglo de emociones cada una con un 
 * rango en porcentaje. 
 * Se usa la variable statica myBeanObj_NLU para inicializar las credenciales necesarias. para inicializar estas credenciales
 * se deben de enviar un POST con las información al servlet NLU en formato json
 */
public class Natural_Language_Understanding {
	@SuppressWarnings("static-access")
	public static String[] main(String args) {
		NLU myObj = new NLU();

		NaturalLanguageUnderstanding service = new NaturalLanguageUnderstanding(
				myObj.myBeanObj_NLU.getCurrentVersion(),
				myObj.myBeanObj_NLU.getUserName(),
				myObj.myBeanObj_NLU.getPassword());

		String text = args;

		EmotionOptions emotion = new EmotionOptions.Builder().build();

		Features features = new Features.Builder().emotion(emotion).build();

		AnalyzeOptions parameters = new AnalyzeOptions.Builder().text(text)
				.features(features).build();

		AnalysisResults response = service.analyze(parameters).execute();

		EmotionScores Emociones = response.getEmotion().getDocument()
				.getEmotion();

		String anger = String.format("%.2f", Emociones.getAnger());
		String disgust = String.format("%.2f", Emociones.getDisgust());
		String fear = String.format("%.2f", Emociones.getFear());
		String joy = String.format("%.2f", Emociones.getJoy());
		String sadness = String.format("%.2f", Emociones.getSadness());

		String[] arregloEmociones = { anger, disgust, fear, joy, sadness };

		return arregloEmociones;

	}

}