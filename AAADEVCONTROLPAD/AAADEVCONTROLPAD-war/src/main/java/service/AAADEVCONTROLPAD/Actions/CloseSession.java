package service.AAADEVCONTROLPAD.Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.json.JSONObject;

/**
 *
 * @author umansilla
 */
public class CloseSession {
    private final HttpServletRequest request;

    public CloseSession(HttpServletRequest request) {
        this.request = request;
    }
    
    public JSONObject closeSession(){
        
         HttpSession userSession = (HttpSession) request.getSession();
         userSession.removeAttribute("userActive");
         userSession.removeAttribute("Registros");
         userSession.removeAttribute("Usuario");
         
         return new JSONObject().put("status", "ok");
    }
}
