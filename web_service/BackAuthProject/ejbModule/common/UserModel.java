package common;

public class UserModel {
	private String login;
	private String password;
	private Role role;

	public String getLogin() {
		return login;
	}

	public String getPwd() {
		return password;
	}

	public void setRole(Role currentTestRole) {
		role = currentTestRole;
		
	}

	public Role getRole() {
		return role;
	}

}
