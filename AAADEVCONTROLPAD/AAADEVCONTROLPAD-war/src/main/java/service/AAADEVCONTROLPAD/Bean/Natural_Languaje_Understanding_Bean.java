package service.AAADEVCONTROLPAD.Bean;


/**
 *
 * @author umansilla
 * Modelo para usar las credenciales inicializadas como objeto en Java
 */
public class Natural_Languaje_Understanding_Bean {
    private String currentVersion;
    private String userName;
    private String password;

    Natural_Languaje_Understanding_Bean() {

    }

    public Natural_Languaje_Understanding_Bean(String currentVersion, String userName, String password) {
        this.currentVersion = currentVersion;
        this.userName = userName;
        this.password = password;
    }

    /**
     * @return the currentVersion
     */
    public String getCurrentVersion() {
        return currentVersion;
    }

    /**
     * @param currentVersion the currentVersion to set
     */
    public void setCurrentVersion(String currentVersion) {
        this.currentVersion = currentVersion;
    }

    /**
     * @return the userName
     */
    public String getUserName() {
        return userName;
    }

    /**
     * @param userName the userName to set
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Natural_Languaje_Understanding_Bean{" + "currentVersion=" + currentVersion + ", userName=" + userName + ", password=" + password + '}';
    }
}
