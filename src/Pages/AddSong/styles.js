import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(3)
	},
	img: {
		width: "100%",
		[theme.breakpoints.down("md")]: {
			display: "none"
		}
	}
}));

export default useStyles;
