import {
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Typography
} from "@material-ui/core";

// Popup component
export const Popup = ({ children, open, title, setOpen, styles }) => {
	return (
		<Dialog open={open}>
			<DialogTitle style={{ paddingBottom: "0", marginBottom: "0" }}>
				<Grid
					container
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography variant="h6" component="div">
						{title}
					</Typography>
					<IconButton
						style={{
							fontSize: "2em",
							fontWeight: "1em",
							color: "red"
						}}
						onClick={setOpen}
					>
						&times;
					</IconButton>
				</Grid>
			</DialogTitle>
			<DialogContent style={styles}>{children}</DialogContent>
		</Dialog>
	);
};

export default Popup;
