package service.AAADEVCONTROLPAD.Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.json.JSONObject;

/**
 *
 * @author umansilla
 */
public class RestartTimeSession {
    private final HttpServletRequest request;

    public RestartTimeSession(HttpServletRequest request) {
        this.request = request;
    }
    
    public JSONObject restartTime (){
        HttpSession userSession = (HttpSession) request.getSession();
        userSession.setMaxInactiveInterval(15 * 60);
        return new JSONObject().put("status", "ok");
    }
}
