import React, { Component } from "react";
import { Link } from "react-router-dom";

import { userContext } from "../../context/userContext";

import "./Navbar.css";

class Navbar extends Component {
	static contextType = userContext;

	state = {
		user: {},
	};

	handleLogout = () => {
		return;
	};

	componentDidMount() {
		const { user } = this.context;
		this.setState({ user });
	}

	renderContent() {
		switch (this.state.user) {
			case null:
				return;
			case false:
				return [
					<li key="registerLink">
						<Link to="/register">Register</Link>
					</li>,
					<li key="loginLink">
						<Link to="/login">Login</Link>
					</li>,
				];
			default:
				return [
					<li key="homeLink">
						<Link to="/home">Home</Link>
					</li>,
					<li key="wikiLink">Wiki</li>,
					<li key="ideasLink">Ideas Form</li>,
					<li key="codeLink">Code Snippets</li>,
					<li key="logoutLink">
						<button>Logout</button>
					</li>,
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
