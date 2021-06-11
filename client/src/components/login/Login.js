import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

import { userContext } from "../../context/userContext";

import { isEmptyObject } from "../../helpers";

class Login extends Component {
	static contextType = userContext;

	constructor(props) {
		super(props);

		this.state = {
			user: {},
			email: "",
			password: "",
		};
	}

	loginUser = async (creds) => {
		const res = await axios.post("/api/auth/register_login", creds);
		return res.data.user;
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { setUser } = this.context;
		const { email, password } = this.state;
		const loggedInUser = await this.loginUser({ email, password });
		if (!isEmptyObject(loggedInUser)) {
			setUser(loggedInUser);
		}
	};

	componentDidMount() {
		this.setState({
			user: this.context.user,
		});
	}

	onChangeHandler = (e) => {
		const id = e.target.id;

		this.setState({
			[id]: e.target.value,
		});
	};

	render() {
		if (!isEmptyObject(this.state.user)) {
			return <Redirect to="/home" />;
		}
		return (
			<>
				<h2>Please log in</h2>
				<form onSubmit={this.handleSubmit}>
					<label>
						<p>Email</p>
						<input type="email" id="email" onChange={this.onChangeHandler} />
					</label>
					<label>
						<p>Password</p>
						<input type="password" id="password" onChange={this.onChangeHandler} />
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
