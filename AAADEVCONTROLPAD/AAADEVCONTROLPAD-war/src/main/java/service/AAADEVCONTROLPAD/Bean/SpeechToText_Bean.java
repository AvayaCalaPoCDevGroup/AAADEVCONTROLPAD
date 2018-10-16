package service.AAADEVCONTROLPAD.Bean;


/**
 *
 * @author umansilla
 * Modelo para usar las variables inicializadas como objeto en Java
 */
public class SpeechToText_Bean {

    private String key;
    private String languaje;

    public SpeechToText_Bean() {
    }

    public SpeechToText_Bean(String key, String languaje) {
        this.key = key;
        this.languaje = languaje;
    }

    
    
    
    /**
     * @return the key
     */
    public String getKey() {
        return key;
    }

    /**
     * @param key the key to set
     */
    public void setKey(String key) {
        this.key = key;
    }

    /**
     * @return the languaje
     */
    public String getLanguaje() {
        return languaje;
    }

    /**
     * @param languaje the languaje to set
     */
    public void setLanguaje(String languaje) {
        this.languaje = languaje;
    }

    @Override
    public String toString() {
        return "SpeechToText_Bean{" + "key=" + key + ", languaje=" + languaje + '}';
    }
    
    

}
