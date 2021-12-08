import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

// importing custom components
import Controls from "../../Components/reuse";

// importing styles
import useStyles from "./InOutStyles";

// Logout component
export const Logout = ({ click }) => {
	const classes = useStyles();

	return (
		<>
			<Grid container spacing={1}>
				<Grid item>
					<Link
						style={{ color: "white" }}
						onClick={click}
						to="/signup"
					>
						<Controls.Button>Signup</Controls.Button>
					</Link>
				</Grid>
				<Grid item>
					<Link
						style={{ color: "white" }}
						onClick={click}
						to="/login"
					>
						<Controls.Button className={classes.btn}>
							login
						</Controls.Button>
					</Link>
				</Grid>
			</Grid>
		</>
	);
};

export default Logout;
