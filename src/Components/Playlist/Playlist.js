import {
	Button,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField
} from "@material-ui/core";
import { PlaylistAdd, PlaylistPlay, Queue } from "@material-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";

// importing action
import { add_to_list } from "../../Store/actions/auth";

const initState = { check: false, text: "", error: "" };

export const Playlist = ({ user, songId, popup }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [addText, setAddText] = useState(initState);

	const handleChangeText = ({ target: { value } }) => {
		setAddText((s) => ({ ...s, text: value, error: "" }));
	};

	const addToList = (lid) => {
		dispatch(add_to_list(user, songId, lid));
		popup(false);
	};

	const Add_New = () => {
		if (addText.text === "") return;
		else if (!!user.playlist[addText.text]) {
			setAddText((s) => ({ ...s, error: "Already exist.." }));
			return;
		}
		addToList(addText.text);
		setAddText(initState);
	};

	return addText.check ? (
		<>
			<div className={classes.newList}>
				<TextField
					label="new playlist"
					onChange={handleChangeText}
					className={classes.field}
					value={addText.text}
					error={addText.error !== ""}
					helperText={addText.error}
				/>
				<Button onClick={Add_New} className={classes.addit}>
					+
				</Button>
			</div>
			<Button
				color="secondary"
				size="small"
				variant="outlined"
				style={{ marginTop: "5px" }}
				onClick={() => setAddText(initState)}
			>
				back
			</Button>
		</>
	) : (
		<>
			<ListItem>
				<Button
					color="primary"
					variant="contained"
					startIcon={<PlaylistAdd />}
					onClick={() => setAddText((s) => ({ ...s, check: true }))}
					size="large"
					style={{ marginTop: "-10px", marginBottom: "5px" }}
				>
					AddNew
				</Button>
			</ListItem>
			{Object.entries(user?.playlist).map(([key, val], i) => (
				<ListItem key={i} button onClick={() => addToList(key)}>
					<ListItemIcon>
						{key === "MyPlaylist" ? <Queue /> : <PlaylistPlay />}
					</ListItemIcon>
					<ListItemText primary={key} />
				</ListItem>
			))}
		</>
	);
};

export default Playlist;
