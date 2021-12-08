import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	Typography
} from "@material-ui/core";

// importing custom component
import Song from "../../Components/Song/Song";

// importing styles
import useStyles from "./styles";

let bclist = [];

// playlist component
export const Playlist = () => {
	const [songs, setSongs] = useState([]);
	const classes = useStyles();
	const params = useParams();
	const [custom, setCustom] = useState({
		title: true,
		movie: false,
		description: true,
		singer: false
	});

	const handleCustomization = ({ target: { name } }) => {
		setCustom((s) => ({ ...s, [name]: !s[name] }));
	};

	const [list, playlist] = useSelector(
		({
			auth: {
				user: { playlist }
			},
			songs: { list }
		}) => [list, playlist[params.id]]
	);

	useEffect(() => {
		setTimeout(() => {
			bclist = list.filter(({ id }) => playlist.includes(id));
			setSongs(bclist);
		}, 500);
		return () => {};
	}, [list, playlist]);

	const handleFilter = ({ target: { value } }) => {
		setSongs(
			value === ""
				? bclist
				: bclist
						.filter(({ id }) => playlist.includes(id))
						.filter(
							(s) =>
								s.movie
									.toUpperCase()
									.includes(value.toUpperCase()) ||
								s.title
									.toUpperCase()
									.includes(value.toUpperCase()) ||
								s.singer
									.toUpperCase()
									.includes(value.toUpperCase())
						)
		);
	};

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={4}>
					<Typography variant="h4">{params.id}</Typography>
				</Grid>
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
					songs.map((s) => (
						<Grid item key={s.id} xs={6} md={4} lg={3} xl={2}>
							<Song song={s} pid={params.id} custom={custom} />
						</Grid>
					))
				)}
			</Grid>
		</>
	);
};

export default Playlist;
