import {
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	Typography
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// importing songs component
import Song from "../../Components/Song/Song";

// importing styles
import useStyles from "./styles";

// all_songs components
export const All_songs = () => {
	const [songs, setSongs] = useState([]);
	const [custom, setCustom] = useState({
		title: true,
		movie: false,
		description: true,
		singer: false
	});
	const classes = useStyles();
	const list = useSelector(({ songs: { list } }) =>
		list.sort((a, b) => b.created - a.created)
	);

	useEffect(() => {
		setSongs(list);
		return () => {};
	}, [list]);

	const handleCustomization = ({ target: { name } }) => {
		setCustom((s) => ({ ...s, [name]: !s[name] }));
	};

	const handleFilter = ({ target: { value } }) => {
		setSongs(
			value === ""
				? list
				: list.filter(
						(s) =>
							s.title
								.toUpperCase()
								.includes(value.toUpperCase()) ||
							s.movie
								.toUpperCase()
								.includes(value.toUpperCase()) ||
							s.singer.toUpperCase().includes(value.toUpperCase())
				  )
		);
	};

	return (
		<>
			<Grid container spacing={2} style={{ marginBottom: "10px" }}>
				<Grid item xs={12} sm={6}>
					<Typography variant="h4" component="h4">
						All Songs
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						name="search"
						variant="outlined"
						label="Search"
						onChange={handleFilter}
						placeholder="search by title, movie or singer..."
						fullWidth
					/>
				</Grid>
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
			<Grid container spacing={2} className={classes.container}>
				{songs.length === 0 ? (
					<Grid item xs={12}>
						<Typography variant="h6" component="h6">
							No songs...
						</Typography>
					</Grid>
				) : (
					songs.map((song) => (
						<Grid key={song.id} item xs={6} md={4} lg={3} xl={2}>
							<Song song={song} custom={custom} />
						</Grid>
					))
				)}
			</Grid>
		</>
	);
};
export default All_songs;
