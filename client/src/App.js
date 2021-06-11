import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import axios from "axios";

import ProtectedRoute from "./components/utilities/ProtectedRoute";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Navbar from "./components/navbar/Navbar";
import Wiki from "./components/wiki/Wiki";
import Ideas from "./components/ideas/Ideas";
import Snippets from "./components/snippets/Snippets";

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
						<ProtectedRoute exact path="/home" user={this.state.user} component={Home} redirect={"/login"} />

						<Route exact path="/register">
							{isEmptyObject(this.state.user) ? <Register /> : <Redirect to="home" />}
						</Route>

						<ProtectedRoute exact path="/wiki" user={this.state.user} component={Wiki} redirect={"/login"} />
						<ProtectedRoute exact path="/ideas" user={this.state.user} component={Ideas} redirect={"/login"} />
						<ProtectedRoute exact path="/snippets" user={this.state.user} component={Snippets} redirect={"/login"} />
					</div>
				</BrowserRouter>
			</userContext.Provider>
		);
	}
}

export default App;
