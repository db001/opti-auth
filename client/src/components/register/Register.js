import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

import { userContext } from "../../context/userContext";

import { isEmptyObject } from "../../helpers";

class Register extends Component {
	static contextType = userContext;

	constructor(props) {
		super(props);

		this.state = {
			user: {},
			email: "",
			password: "",
			userAlreadyExists: false,
		};
	}

	loginUser = async (creds) => {
		const res = await axios.post("/api/auth/register", creds);
		return res.data;
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { setUser } = this.context;
		const { email, password } = this.state;
		const response = await this.loginUser({ email, password });
		console.log(response.user);
		if (response.userExists) {
			this.setState({
				userAlreadyExists: true,
			});
			return;
		}
		if (!isEmptyObject(response.user)) {
			setUser(response.user);
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
			userAlreadyExists: false,
		});
	};

	render() {
		if (!isEmptyObject(this.state.user)) {
			return <Redirect to="/home" />;
		}
		return (
			<>
				<h2>Please register</h2>
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
				{this.state.userAlreadyExists && (
					<p>
						User already exists, <Link to="/login">login here</Link> or&nbsp;
						<Link to="/password-reset">reset your password</Link>
					</p>
				)}
			</>
		);
	}
}

export default Register;
