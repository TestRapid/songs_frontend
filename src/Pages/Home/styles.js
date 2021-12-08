import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	container: {
		margin: "10px auto 10px -12px",
		height: "80vh",
		overflowY: "auto",
		overflowX: "hidden"
	},
	svg: {
		width: "100%",
		height: "400px",
		[theme.breakpoints.down("sm")]: {
			display: "none"
		}
	}
}));

export default useStyles;
