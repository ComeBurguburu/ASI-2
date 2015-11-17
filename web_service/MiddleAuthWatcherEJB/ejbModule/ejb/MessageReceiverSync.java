package ejb;
 
import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSConsumer;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Queue;
import javax.jms.TextMessage;

import common.UserModel;

@Stateless
@LocalBean
public class MessageReceiverSync implements MessageReceiverSyncLocal {
 
 //get jms context
	@Inject
	JMSContext context;
  
 //associate queue from "java:/jms/queue/watcherqueue"
	@Resource(mappedName = "java:/jms/queue/watcherqueue") 
	Queue queue;

 
  public UserModel receiveMessage() {
 
 //create a consumer
	  JMSConsumer consumer = context.createConsumer(queue);

 //Wait 1s incoming message (UserModel)
	  int count = 0;
	  Message m = null;
	  StringBuffer sb = new StringBuffer();
	  while (true) {
	      m = consumer.receive(1000); 
	      if (m != null) { 
	          if (m instanceof TextMessage) { 
	              try {
					sb.append(m.getBody(String.class));
				} catch (JMSException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	              count += 1; 
	          } else { 
	              break; 
	          } 
	      }
	  }
	 String message = sb.toString();
	return (UserModel)m;
  }
}
