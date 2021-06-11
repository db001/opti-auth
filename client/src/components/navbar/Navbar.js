import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

class Navbar extends Component {
	state = {
		auth: false,
	};

	renderContent() {
		switch (this.state.auth) {
			case null:
				return;
			case false:
				return [
					<li>
						<Link to="/register">Register</Link>
					</li>,
					<li>
						<Link to="/login">Login</Link>
					</li>,
				];
			default:
				return [
					<li>
						<Link to="/home">Home</Link>
					</li>,
					<li>Wiki</li>,
					<li>Ideas Form</li>,
					<li>Code Snippets</li>,
				];
		}
	}

	render() {
		return (
			<nav>
				<p>Optimisation Wiki</p>
				<ul>{this.renderContent()}</ul>
			</nav>
		);
	}
}

export default Navbar;
