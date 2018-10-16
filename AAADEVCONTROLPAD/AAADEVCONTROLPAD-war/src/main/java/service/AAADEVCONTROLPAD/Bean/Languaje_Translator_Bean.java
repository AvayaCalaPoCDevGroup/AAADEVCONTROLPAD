package service.AAADEVCONTROLPAD.Bean;

/**
 *
 * @author umansilla
 * Modelo para usar información modelId como objeto en Java
 */
public class Languaje_Translator_Bean {
    private String modelId;

    public Languaje_Translator_Bean() {
    }

    public Languaje_Translator_Bean(String modelId) {
        this.modelId = modelId;
    }
    
    /**
     * @return the modelId
     */
    public String getModelId() {
        return modelId;
    }

    /**
     * @param modelId the modelId to set
     */
    public void setModelId(String modelId) {
        this.modelId = modelId;
    }

    @Override
    public String toString() {
        return "Languaje_Translator_Bean{" + "modelId=" + modelId + '}';
    }
    
}
