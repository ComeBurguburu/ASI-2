package ejb;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.ObjectMessage;
import javax.jms.Topic;

import common.UserModel;

@Stateless
@LocalBean
public class MessageSender implements MessageSenderLocal {
	@Inject
	JMSContext context;
	@Resource(mappedName = "java:/jms/watcherAuthJMS")
	Topic topic;

	public void sendMessage(String message) {
		context.createProducer().send(topic, message);
	}

	public void sendMessage(UserModel user) {
		try {
			ObjectMessage message = context.createObjectMessage();
			message.setObject(user);
			context.createProducer().send(topic, user);
		} catch (JMSException e) {
			e.printStackTrace();
		}
	}
}