import { useEffect, useState } from "react";
import {
	Checkbox,
	FormControlLabel,
	Grid,
	TextField,
	Typography
} from "@material-ui/core";
import { useSelector } from "react-redux";
import Song from "../../Components/Song/Song";

// importing svg
import music from "../../asset/svgs/music.svg";

// import styles
import useStyles from "./styles";

const sorted = ({ songs: { list } }) =>
	[...list.sort((a, b) => b.views - a.views)].splice(0, 6);

// Home component
export const Home = () => {
	const classes = useStyles();
	const [songs, setSongs] = useState([]);
	const list = useSelector(sorted);

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
	}, [list]);

	const handleFilter = ({ target: { value } }) => {
		if (value === "") {
			setSongs(list);
		} else {
			setSongs(
				list.filter(
					(s) =>
						s.movie.toUpperCase().includes(value.toUpperCase()) ||
						s.title.toUpperCase().includes(value.toUpperCase()) ||
						s.singer.toUpperCase().includes(value.toUpperCase())
				)
			);
		}
	};

	return (
		<Grid container spacing={2}>
			<Grid item md={4}>
				<img className={classes.svg} src={music} alt="music" />
			</Grid>
			<Grid item xs={12} md={8}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={4}>
						<Typography variant="h5">Top viewed...</Typography>
					</Grid>
					<Grid item xs={12} sm={8}>
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
				<Grid container spacing={3} className={classes.container}>
					{songs.length === 0 ? (
						<Grid item xs={12}>
							<Typography variant="body1" component="h6">
								No songs...
							</Typography>
						</Grid>
					) : (
						songs.map((s) => (
							<Grid item key={s.id} xs={6} md={4}>
								<Song song={s} custom={custom} />
							</Grid>
						))
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Home;
