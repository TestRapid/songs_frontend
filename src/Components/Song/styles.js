import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	card: {},
	imgCover: {
		height: "175px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		"& img": {
			width: "100%",
			height: "100%",
			objectFit: "cover"
		}
	},
	conti: {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis"
	},
	actions: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	views: {
		color: "grey"
	},
	bold: {
		fontWeight: "bold"
	},
	field: {
		flexGrow: 9
	}
}));

export default useStyles;
