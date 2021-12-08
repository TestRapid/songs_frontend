import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	imgCo: {
		height: theme.spacing(36)
	},
	image: {
		width: "100%",
		height: "100%",
		maxHeight: "100%",
		maxWidth: "100%",
		objectFit: "cover"
	},
	desc: {
		textIndent: theme.spacing(5),
		fontFamily: "google sans"
	},
	views: {
		color: "grey",
		marginRight: theme.spacing(16),
		[theme.breakpoints.down("md")]: {
			marginRight: theme.spacing(1)
		}
	},
	ht: {
		height: theme.spacing(38)
	},
	user: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		fontFamily: "quicksand"
	},
	btn: {
		color: "white",
		width: "100%",
		background: `linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)`
	},
	btnM: {
		margin: "10px 10px auto 10px"
	}
}));
export default useStyles;
