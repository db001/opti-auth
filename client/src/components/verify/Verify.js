import React, { Component } from "react";
import axios from "axios";

export class Verify extends Component {
	constructor() {
		super();

		this.state = {
			userIsVerified: false,
			verificationCode: "",
			codeExists: true,
		};
	}

	getQueryString = () => {
		const qs = this.props.location.search.replace("?", "");
		return qs;
	};

	verifyUser = async () => {
		const verifyString = this.getQueryString();
		this.setState({ verificationCode: verifyString });
		if (!verifyString) {
			this.setState({ codeExists: false });
		}
		const response = await axios.get(`/user/verify/${verifyString}`);
		console.log(response.data);
	};

	componentDidMount() {
		this.verifyUser();
	}

	render() {
		return (
			<div>
				<h1>Verify</h1>
				{!this.state.codeExists && (
					<p>
						Sorry, ther's been an issue with verifying your email. Please click here to{" "}
						<a href="/">to resend your verification email</a>
					</p>
				)}
				<p>Thanks for verifying</p>
			</div>
		);
	}
}

export default Verify;
