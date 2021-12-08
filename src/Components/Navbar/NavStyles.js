import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	navbar: {
		background: `linear-gradient(90deg,	rgba(110, 94, 254) 0%, rgba(73, 63, 252, 1) 100%)`,
		height: "70px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		fontSize: "1.2em",
		padding: "0.5em 2em",
		position: "relative",
		width: "100%",
		zIndex: "10"
	},
	navbarLogo: {
		color: "#ffffff",
		cursor: "pointer",
		justifySelf: "start",
		marginLeft: "20px"
	},
	navbarToggle: {
		display: "none",
		color: "#ffffff",
		fontSize: "1.2em",
		[theme.breakpoints.down("md")]: {
			display: "block"
		}
	},
	list: {
		display: "flex",
		padding: "0.7rem 1.5rem",
		justifyContent: "center",
		alignItems: "center",
		[theme.breakpoints.down("md")]: {
			position: "absolute",
			flexDirection: "column",
			justifyContent: "start",
			alignItems: "center",
			gap: "1em",
			width: "100%",
			height: "90vh",
			backgroundColor: "#6668f4",
			top: "70px",
			left: "-100%",
			transition: "all 0.3s ease-in-out"
		},
		zIndex: "9"
	},
	listActive: {
		left: "0%"
	},
	listItem: {
		color: "#ffffff",
		padding: "0.5rem 1.5rem",
		cursor: "pointer"
	},
	listLinks: {
		color: "#ffffff",
		padding: "0.7rem 1.5rem",
		cursor: "pointer",
		textDecoration: "none",
		"&:hover": {
			backgroundColor: "#6d76f7",
			borderRadius: "4px",
			transition: "all 0.2s ease-in-out",
			[theme.breakpoints.down("md")]: {
				width: "100%",
				textAlign: "center",
				borderRadius: "0",
				backgroundColor: "#7577fa"
			}
		}
	}
}));

export default useStyles;
