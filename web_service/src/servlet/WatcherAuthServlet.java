package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.UserModel;

import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

/**
 * Servlet implementation class WatcherAuthServlet
 */
@WebServlet("/WatcherAuth")
public class WatcherAuthServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public WatcherAuthServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String auth=request.getParameter("auth");
		if(auth==null){
			response.getWriter().write("no param");
			return;
		}
		
		try{
		JSONObject obj= (JSONObject) JSONValue.parse(auth);
		String login = (String) obj.get("login");
		String pwd = (String) obj.get("pwd");
		UserModel user = new UserModel();
		user.setLogin(login);
		user.setPwd(pwd);
		
		JSONObject resp= new JSONObject();
		resp.put("login", user.getLogin());
		resp.put("validAuth",true);
		resp.put("role","ADMIN");
		response.getWriter().write(resp.toString());
		
		
		}catch(Exception e){
			e.printStackTrace();
		}			
	}

}
