import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	Typography
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Delete, Close } from "@material-ui/icons";
import swal from "sweetalert";

// importing song component
import Song from "../../Components/Song/Song";

// importing styles
import useStyles from "./styles";

// importing actions
import { delete_multiple } from "../../Store/actions/songs";

const sorted = ({
	auth: {
		user: { id }
	},
	songs: { list }
}) => {
	return list
		.filter((s) => s.userId === id)
		.sort((a, b) => b.created - a.created)
		.map((s) => ({ ...s, checked: false }));
};

// Mysong compoment
export const MySongs = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [songs, setSongs] = useState([]);
	const list = useSelector(sorted);
	const [deleteList, setDeleteList] = useState([]);

	const [custom, setCustom] = useState({
		title: true,
		movie: false,
		description: true,
		singer: false
	});

	const handleCustomization = ({ target: { name } }) => {
		setCustom((s) => ({ ...s, [name]: !s[name] }));
	};

	useEffect(() => {
		setTimeout(() => {
			setSongs(list);
		}, 500);
		return () => {};
	}, [list]);

	const handleFilter = ({ target: { value } }) => {
		setSongs(
			value === ""
				? list
				: list.filter(
						(s) =>
							s.movie
								.toUpperCase()
								.includes(value.toUpperCase()) ||
							s.title
								.toUpperCase()
								.includes(value.toUpperCase()) ||
							s.singer.toUpperCase().includes(value.toUpperCase())
				  )
		);
	};

	const addToDeleteList = (id) => {
		if (deleteList.includes(id)) {
			setDeleteList((d) => d.filter((s) => s !== id));
			setSongs((l) =>
				l.map((s) => (s.id === id ? { ...s, checked: false } : s))
			);
		} else {
			setDeleteList((s) => [...s, id]);
			setSongs((l) =>
				l.map((s) => (s.id === id ? { ...s, checked: true } : s))
			);
		}
	};

	const onDeleteList = () => {
		swal({
			title: "Are you sure!",
			text: `On delete, ${deleteList.length} songs will be permanently deleted...`,
			icon: "warning",
			dangerMode: true,
			buttons: true
		}).then((res) => {
			if (res) {
				swal({
					title: "success",
					text: `${deleteList.length} songs successfully deleted`,
					timer: 2300,
					icon: "success"
				});
				dispatch(delete_multiple(deleteList));
			}
			onCancel();
		});
	};

	const onCancel = () => {
		setSongs((s) => s.map((s) => ({ ...s, checked: false })));
		setDeleteList([]);
	};

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={4}>
					<Typography variant="h4">My Songs</Typography>
				</Grid>
				{deleteList.length === 0 ? (
					<Grid item xs={12} sm={6}>
						<TextField
							name="search"
							variant="outlined"
							label="Search"
							placeholder="search by title, movie or singer..."
							onChange={handleFilter}
							fullWidth
						/>
					</Grid>
				) : (
					<Grid item xs={12} sm={6}>
						<div className={classes.dc}>
							<Button
								size="large"
								color="secondary"
								variant="contained"
								onClick={onDeleteList}
								startIcon={<Delete />}
							>
								Delete selected
							</Button>
							<Button
								size="small"
								variant="outlined"
								color="secondary"
								onClick={onCancel}
								startIcon={<Close />}
								style={{ marginRight: "-30px" }}
							>
								Cancel operation
							</Button>
						</div>
					</Grid>
				)}
			</Grid>
			<Grid container>
				<Grid item>
					<FormControlLabel
						control={
							<Checkbox
								checked={custom.title}
								onChange={handleCustomization}
								name="title"
							/>
						}
						label="Title"
					/>
				</Grid>
				<Grid item>
					<FormControlLabel
						control={
							<Checkbox
								checked={custom.movie}
								onChange={handleCustomization}
								name="movie"
							/>
						}
						label="Movie"
					/>
				</Grid>
				<Grid item>
					<FormControlLabel
						control={
							<Checkbox
								checked={custom.singer}
								onChange={handleCustomization}
								name="singer"
							/>
						}
						label="Singer"
					/>
				</Grid>
				<Grid item>
					<FormControlLabel
						control={
							<Checkbox
								checked={custom.description}
								onChange={handleCustomization}
								name="description"
							/>
						}
						label="Description"
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3} className={classes.container}>
				{songs?.length === 0 ? (
					<Grid item xs={12}>
						<Typography variant="h6" component="h6">
							No songs...
						</Typography>
					</Grid>
				) : (
					<>
						{songs.map((song) => (
							<Grid
								item
								key={song.id}
								className={classes.list}
								xs={6}
								md={4}
								lg={3}
								xl={2}
							>
								<div className={classes.checkbox}>
									<Checkbox
										onChange={() =>
											addToDeleteList(song.id)
										}
										checked={!!song.checked}
									/>
								</div>
								<Song song={song} custom={custom} edit />
							</Grid>
						))}
					</>
				)}
			</Grid>
		</>
	);
};

export default MySongs;
