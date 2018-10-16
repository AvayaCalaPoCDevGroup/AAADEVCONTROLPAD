package service.AAADEVCONTROLPAD;

import service.AAADEVCONTROLPAD.Servlets.analisisTexto;

import com.ibm.watson.developer_cloud.language_translator.v3.LanguageTranslator;
import com.ibm.watson.developer_cloud.language_translator.v3.model.TranslateOptions;
import com.ibm.watson.developer_cloud.language_translator.v3.model.TranslationResult;
import com.ibm.watson.developer_cloud.service.security.IamOptions;


/**
 *
 * @author umansilla
 */
public class Languaje_Translator {

	/**
	 * @param texto
	 * @return
	 * Ingresa el texto que desea transcribir, Regresa el texto traducido, de acuerdo al Model-id proporcionado
	 * myBeanObj_LT es una variable statica que se inicializa de acuerdo al idioma que se requere, desde el Front-end
	 * https://console.bluemix.net/docs/services/language-translator/translation-models.html#translation-models
	 */
	public static String main(String texto) {
		// TODO code application logic here

		IamOptions options = new IamOptions.Builder().apiKey(
				"kVrAnsbYI64uK5oJvjDCYwftGECOUgLDYTJbPc7sbsJX").build();

		LanguageTranslator languageTranslator = new LanguageTranslator(
				"2018-05-01", options);

		TranslateOptions translateOptions = new TranslateOptions.Builder()
				.addText(texto)
				.modelId(analisisTexto.myBeanObj_LT.getModelId()).build();

		TranslationResult result = languageTranslator.translate(
				translateOptions).execute();

		return result.getTranslations().get(0).getTranslationOutput();

	}
}