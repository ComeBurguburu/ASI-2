package common;

import java.io.Serializable;

public class UserModel implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8334287002071733789L;
	private String login;
	private String password;
	
	public UserModel() {
		// TODO Auto-generated constructor stub
	}
	public String toString() {
	      StringBuffer sb =  new StringBuffer() ;
	       return sb.append(login).append(" ").append(password).toString() ;
	   }

}
