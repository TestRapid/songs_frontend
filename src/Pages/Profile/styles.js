import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: "hsl(160, 100%, 95%)",
		padding: "15px 30px",
		boxShadow: "1px 3px 50px #cccccc",
		borderRadius: "10px",
		[theme.breakpoints.down("md")]: {
			padding: "2px"
		}
	},
	card: {
		display: "flex",
		[theme.breakpoints.down("md")]: {
			justifyContent: "center"
		},
		"& img": {
			width: theme.spacing(15),
			[theme.breakpoints.down("md")]: {
				width: theme.spacing(10)
			}
		}
	},
	paper: {
		marginTop: "15px",
		width: "100%",
		maxWidth: "250px",
		padding: "10px",
		borderRadius: "5px",
		backgroundColor: theme.palette.background.paper,
		boxShadow: "1px 3px 10px #999"
	},
	sp: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	},
	more: {
		minHeight: "40px",
		height: "100%",
		backgroundColor: theme.palette.background.paper,
		borderRadius: "10px",
		color: "black",
		"&:hover": {
			color: "white"
		}
	},
	list: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		padding: "10px 18px",
		[theme.breakpoints.down("sm")]: {
			alignItems: "center"
		}
	},
	chart: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		[theme.breakpoints.down("md")]: {
			display: "none"
		}
	}
}));
export default useStyles;
