import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	container: {
		margin: "10px auto 10px -12px",
		padding: "10px",
		height: "80vh",
		overflowY: "auto",
		overflowX: "hidden"
	},
	list: {
		position: "relative"
	},
	checkbox: {
		position: "absolute",
		top: `0px`,
		left: `0px`
	},
	dc: {
		width: "100%",
		display: "flex",
		gap: theme.spacing(2),
		justifyContent: "center",
		alignItems: "center"
	}
}));
export default useStyles;
