package model;

import common.Role;
import common.UserModel;

public class DataContainer {

	public DataContainer() {
		// TODO Auto-generated constructor stub
	}

	public Role checkUser(UserModel user) {
		return user.getRole();
	}

	

}
