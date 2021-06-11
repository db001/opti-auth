import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Navbar from "./components/navbar/Navbar";

import "./App.css";

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<div id="page">
				<Route exact path="/" component={Login} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/home" component={Home} />
				<Route exact path="/register" component={Register} />
			</div>
		</BrowserRouter>
	);
};

export default App;
