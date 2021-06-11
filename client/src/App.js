import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Navbar from "./components/navbar/Navbar";

import { userContext } from "./context/userContext";

import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {},
		};
	}

	setUser = (user) => {
		this.setState((prevState) => ({ user }));
	};

	componentDidMount() {
		return;
	}

	render() {
		const { user } = this.state;
		const { setUser } = this;
		return (
			<userContext.Provider value={{ user, setUser }}>
				<BrowserRouter>
					<Navbar />
					<div id="page">
						<Route exact path="/">
							<Login />
						</Route>
						<Route exact path="/login" component={Login} />
						<Route exact path="/home" component={Home} />
						<Route exact path="/register" component={Register} />
					</div>
				</BrowserRouter>
			</userContext.Provider>
		);
	}
}

export default App;
