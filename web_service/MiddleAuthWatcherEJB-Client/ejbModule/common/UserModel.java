package common;

import java.io.Serializable;

public class UserModel implements Serializable {
	private String login;
	private String password;
	
	public UserModel() {
		// TODO Auto-generated constructor stub
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

}
