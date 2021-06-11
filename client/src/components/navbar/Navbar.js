import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { userContext } from "../../context/userContext";

import { isEmptyObject } from "../../helpers";

import "./Navbar.css";

const Navbar = () => {
	const { user, setUser } = useContext(userContext);

	const [userState, setUserState] = useState(user);

	const handleLogout = async () => {
		const logout = await axios.get("/api/auth/logout");
		if (logout.status === 200) {
			setUser({});
			setUserState({});
		}
	};

	useEffect(() => {
		if (!isEmptyObject(user)) {
			setUserState(user);
		}
	}, [user]);

	const renderContent = () => {
		if (isEmptyObject(userState)) {
			return [
				<li key="registerLink">
					<Link to="/register">Register</Link>
				</li>,
				<li key="loginLink">
					<Link to="/login">Login</Link>
				</li>,
			];
		} else {
			return [
				<li key="homeLink">
					<Link to="/home">Home</Link>
				</li>,
				<li key="wikiLink">Wiki</li>,
				<li key="ideasLink">Ideas Form</li>,
				<li key="codeLink">Code Snippets</li>,
				<li key="logoutLink">
					<button onClick={handleLogout}>Logout</button>
				</li>,
			];
		}
	};

	return (
		<nav>
			<p>Optimisation Wiki</p>
			<ul>{renderContent()}</ul>
		</nav>
	);
};

export default Navbar;
