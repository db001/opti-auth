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
				<li key="loginLink">
					<Link to="/login">Login</Link>
				</li>,
				<li key="registerLink">
					<Link to="/register">Register</Link>
				</li>,
			];
		} else {
			return [
				<li key="homeLink">
					<Link to="/home">Home</Link>
				</li>,
				<li key="wikiLink">
					<Link to="/wiki">Wiki</Link>
				</li>,
				<li key="ideasLink">
					<Link to="/ideas">Idea Form</Link>
				</li>,
				<li key="codeLink">
					<Link to="/snippets">Code Snippets</Link>
				</li>,
				<li key="logoutLink">
					<button onClick={handleLogout}>Logout</button>
				</li>,
			];
		}
	};

	return (
		<nav>
			<p>Optimisation Wiki</p>
			<span style={{ marginRight: "auto", marginLeft: "1rem" }}>User is verified = {`${user.email_is_verified}`}</span>
			<ul>{renderContent()}</ul>
		</nav>
	);
};

export default Navbar;
