import React, { Component } from "react";

class Login extends Component {
	render() {
		return (
			<>
				<h2>Please log in</h2>
				<form>
					<label>
						<p>Username</p>
						<input type="text" />
					</label>
					<label>
						<p>Password</p>
						<input type="password" />
					</label>
					<div>
						<button type="submit">Submit</button>
					</div>
				</form>
			</>
		);
	}
}

export default Login;
