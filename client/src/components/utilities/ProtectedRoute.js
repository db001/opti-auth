import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isEmptyObject } from "../../helpers";

const ProtectedRoutes = ({ component: Component, user, redirect, ...rest }) => {
	const isUser = !isEmptyObject(user);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isUser) {
					return <Component {...rest} {...props} />;
				} else {
					return <Redirect to={redirect} />;
				}
			}}
		/>
	);
};

export default ProtectedRoutes;
