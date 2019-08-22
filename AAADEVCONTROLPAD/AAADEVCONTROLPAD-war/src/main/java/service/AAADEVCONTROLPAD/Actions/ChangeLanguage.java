package service.AAADEVCONTROLPAD.Actions;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import service.AAADEVCONTROLPAD.Bean.Usuario;
import service.AAADEVCONTROLPAD.Util.PartToString;


/**
 *
 * @author umansilla
 */
public class ChangeLanguage {
    private final HttpServletRequest request;

    public ChangeLanguage(HttpServletRequest request) {
        this.request = request;
    }
    
    public JSONObject changeLanguage() throws IOException, ServletException{
        String language = new PartToString().getStringValue(request.getPart("language"));
        HttpSession userSession = (HttpSession) request.getSession();
        
         Usuario usuario = (Usuario) userSession.getAttribute("userActive");
         usuario.setLanguage(language);
        return new JSONObject().put("status", "ok");
    }
}
