import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: "10px"
	},
	carousel: {
		width: "100%",
		margin: "10px 20px"
	},
	slide: {
		maxHeight: "80vh",
		[theme.breakpoints.down("md")]: {
			maxHeight: "60vh"
		}
	},
	text: {
		padding: "20px"
	}
}));
export default useStyles;
