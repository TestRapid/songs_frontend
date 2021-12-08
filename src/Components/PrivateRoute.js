import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// private route
export const PrivateRoute = ({ children, ...rest }) => {
	const auth = useSelector((s) => s.auth);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				!!auth ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
