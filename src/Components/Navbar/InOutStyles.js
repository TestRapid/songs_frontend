import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	icon: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
		color: "#ffffff"
	},
	logout: {
		color: "#ffffff",
		margin: "0.2em auto",
		backgroundColor: "red",
		"&:hover": {
			backgroundColor: "#cc0000"
		}
	},
	btn: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
		border: 0,
		borderRadius: 3,
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		color: "white"
	},
	liItem: {
		display: "flex",
		justifyContent: "space-between"
	},
	liItemLink: {
		flex: "8"
	},
	liItemDelete: {
		flex: "2"
	}
}));
export default useStyles;
