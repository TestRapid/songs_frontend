import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	marginAuto: {
		marginLeft: "auto",
		marginRight: "auto"
	},
	paper: {
		margin: "auto",
		padding: theme.spacing(5),
		[theme.breakpoints.down("md")]: {
			margin: "unset"
		}
	},
	ico: {
		marginBottom: theme.spacing(4),
		marginTop: theme.spacing(0.5),
		textAlign: "center",
		justifyContent: "center"
	},
	icon: {
		margin: `auto`,
		backgroundColor: "#ee3366",
		color: "#ffffff",
		padding: `10px`,
		fontSize: theme.spacing(6),
		borderRadius: `50%`
	},
	toggle: {
		padding: "10px 0"
	}
}));

export default useStyles;
