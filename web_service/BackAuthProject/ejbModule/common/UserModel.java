package common;

public class UserModel {
	private String login;
	private String password;
	private Role role;

	public String getLogin() {
		return login;
	}

	public String getPwd() {
		return getPassword();
	}

	public void setRole(Role currentTestRole) {
		role = currentTestRole;
		
	}

	public Role getRole() {
		return role;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
