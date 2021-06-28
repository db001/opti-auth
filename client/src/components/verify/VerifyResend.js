import React, { Component } from "react";
import axios from "axios";
import { isEmptyObject } from "../../helpers";

export class VerifyResend extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			submitConfirmed: false,
		};
	}

	onChangeHandler = (e) => {
		const id = e.target.id;

		this.setState({
			[id]: e.target.value,
			userAlreadyExists: false,
		});
	};

	requstVerifyEmail = async (creds) => {
		const res = await axios.post("/user/verify/resend", creds);
		return res;
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { email } = this.state;
		const response = await this.requstVerifyEmail({ email });
		console.log(response);

		if (response.status === 200 && response.statusText === "OK") {
			this.setState({
				submitConfirmed: true,
			});
		}
		// if (response.userExists) {
		// 	this.setState({
		// 		userAlreadyExists: true,
		// 	});
		// 	return;
		// }
		// if (!isEmptyObject(response.user)) {
		// 	setUser(response.user);
		// }
	};

	render() {
		return (
			<>
				<h2>Please enter your email</h2>
				<form onSubmit={this.handleSubmit}>
					<label>
						<p>Email</p>
						<input type="email" id="email" onChange={this.onChangeHandler} />
					</label>
					<div>
						<button type="submit">Submit</button>
					</div>
				</form>
				{this.state.submitConfirmed && (
					<p>An email containing a verification link has been sent to {this.state.email} if it exists</p>
				)}
			</>
		);
	}
}

export default VerifyResend;
