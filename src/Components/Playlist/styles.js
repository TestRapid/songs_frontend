import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	newList: {
		display: "flex",
		marginTop: "-10px",
		marginBottom: "5px"
	},
	addit: {
		fontSize: "2em",
		fontWeight: "2em",
		padding: "0",
		flexGrow: 1,
		borderRadius: "10px"
	}
}));
export default useStyles;
