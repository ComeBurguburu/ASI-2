package ejb;

import common.UserModel;

public interface MessageSenderQueueLocal {

	void sendMessage(UserModel user);

}
