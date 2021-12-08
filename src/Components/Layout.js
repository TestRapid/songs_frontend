import { useEffect } from "react";
import { makeStyles, Container, CircularProgress } from "@material-ui/core";
import Navbar from "./Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";

// import actions
import { fetch_songs } from "../Store/actions/songs";

const useStyles = makeStyles((theme) => ({
	paper: {
		minHeight: theme.spacing(50),
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4)
	},
	loader: {
		width: "90vw",
		height: "90vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
}));

export const Layout = ({ children }) => {
	const dispatch = useDispatch();
	const isLoading = useSelector(({ songs: { isLoading } }) => isLoading);

	useEffect(() => {
		dispatch(fetch_songs());
	}, [dispatch]);

	const classes = useStyles();
	return !!isLoading ? (
		<div className={classes.loader}>
			<CircularProgress size="10rem" />
		</div>
	) : (
		<>
			<Navbar />
			<Container>
				<div className={classes.paper}>{children}</div>
			</Container>
		</>
	);
};

export default Layout;
