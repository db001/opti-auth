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
		const response = await axios.get(`/user/verify/code/${verifyString}`);
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
						Sorry, there's been an issue with verifying your email. Please click here&nbsp;
						<a href="/verify/resend">to resend your verification email</a>
					</p>
				)}
				{this.state.userIsVerified && <p>Thanks for verifying</p>}
			</div>
		);
	}
}

export default Verify;
