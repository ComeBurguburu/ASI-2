package ejb;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;

/**
 * Session Bean implementation class MessageReceiverSync
 */
@Stateless
@LocalBean
public class MessageReceiverSync implements MessageReceiverSyncLocal {

    /**
     * Default constructor. 
     */
    public MessageReceiverSync() {
        // TODO Auto-generated constructor stub
    }

}
