import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import axios from "axios";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Navbar from "./components/navbar/Navbar";

import { userContext } from "./context/userContext";

import { isEmptyObject } from "./helpers";

import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {},
			setUser: (user) => {
				this.setState((prevState) => ({ user }));
			},
		};
	}

	componentDidMount() {
		this.getUser();
	}

	getUser = async () => {
		const user = await axios.get("/api/auth/current_user");
		if (!isEmptyObject(user.data.user) && user.data.user !== undefined) {
			this.setState({
				user: user.data.user,
			});
		} else {
			this.setState({
				user: {},
			});
		}
	};

	render() {
		// const { user } = this.state;
		// const { setUser } = this;
		return (
			<userContext.Provider value={this.state}>
				<BrowserRouter>
					<Navbar />
					<div id="page">
						<Route exact path="/">
							{isEmptyObject(this.state.user) ? <Login /> : <Redirect to="home" />}
						</Route>
						<Route exact path="/login">
							{isEmptyObject(this.state.user) ? <Login /> : <Redirect to="home" />}
						</Route>
						<Route exact path="/home">
							{isEmptyObject(this.state.user) ? <Redirect to="login" /> : <Home />}
						</Route>
						<Route exact path="/register">
							{isEmptyObject(this.state.user) ? <Register /> : <Redirect to="home" />}
						</Route>
					</div>
				</BrowserRouter>
			</userContext.Provider>
		);
	}
}

export default App;
