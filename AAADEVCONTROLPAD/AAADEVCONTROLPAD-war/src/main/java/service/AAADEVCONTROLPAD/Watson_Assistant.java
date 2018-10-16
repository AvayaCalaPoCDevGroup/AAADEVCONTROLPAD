package service.AAADEVCONTROLPAD;

import com.ibm.watson.developer_cloud.assistant.v1.Assistant;
import com.ibm.watson.developer_cloud.assistant.v1.model.InputData;
import com.ibm.watson.developer_cloud.assistant.v1.model.MessageOptions;
import com.ibm.watson.developer_cloud.assistant.v1.model.MessageResponse;
import com.ibm.watson.developer_cloud.assistant.v1.model.RuntimeIntent;

import java.util.List;

import service.AAADEVCONTROLPAD.Servlets.WA;

/**
 *
 * @author umansilla
 */
public class Watson_Assistant {
    /**
     * @param args the command line arguments
     * @return 
     * El método statico main de la clase Watson_Assistant recibe un String con el téxto que desea que sea analizado por
     * Watson Assistant, el métdo regresa la Intención como String.
     * Las credenciales se obtienen con la variable statica myBeanObj_WA, la cual se inicializa con un POST
     * al servlet WA con la información necesaria en formato json
     */
    @SuppressWarnings("static-access")
	public static String main(String args) {
        
        WA myObj = new WA();
        Assistant service = new Assistant(myObj.myBeanObj_WA.getCurrentVersion());
        service.setUsernameAndPassword(myObj.myBeanObj_WA.getUserName(), myObj.myBeanObj_WA.getPassword());

        String workspaceId = myObj.myBeanObj_WA.getWorkSpaceId();

        InputData input = new InputData.Builder(args).build();
        System.out.println(input.toString());
        MessageOptions options = new MessageOptions.Builder(workspaceId)
          .input(input)
          .build();

        MessageResponse response = service.message(options).execute();
        
        List<RuntimeIntent> intents = response.getIntents();
        String intent2 = intents.get(0).getIntent();
    
        return intent2;
    }
}
