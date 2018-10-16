package service.AAADEVCONTROLPAD.Bean;


/**
 *
 * @author umansilla
 * Modelo para usar las credenciales inicializadas como objeto en Java
 */
public class Watson_Assistant_Bean {
    private String currentVersion;
    private String userName;
    private String password;
    private String workSpaceId;

    public Watson_Assistant_Bean() {
    }

    public Watson_Assistant_Bean(String currentVersion, String userName, String password, String workSpaceId) {
        this.currentVersion = currentVersion;
        this.userName = userName;
        this.password = password;
        this.workSpaceId = workSpaceId;
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

    /**
     * @return the workSpaceId
     */
    public String getWorkSpaceId() {
        return workSpaceId;
    }

    /**
     * @param workSpaceId the workSpaceId to set
     */
    public void setWorkSpaceId(String workSpaceId) {
        this.workSpaceId = workSpaceId;
    }

    @Override
    public String toString() {
        return "Watson_Assistant_Bean{" + "currentVersion=" + currentVersion + ", userName=" + userName + ", password=" + password + ", workSpaceId=" + workSpaceId + '}';
    }
}
