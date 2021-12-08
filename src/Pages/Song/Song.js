import { useState, useEffect } from "react";
import {
	Grid,
	Grow,
	CircularProgress,
	Button,
	Typography,
	Card
} from "@material-ui/core";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ArrowBackIos } from "@material-ui/icons";
import swal from "sweetalert";

// custome component
import Popup from "../../Components/Popup";
import Playlist from "../../Components/Playlist/Playlist";

// importing styles
import useStyles from "./styles";

// importing actions
import { view, remove_song } from "../../Store/actions/songs";

// default image
const IMG =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX-H93gCVZ3NnLQ0ME5KiSHAsxR-cawBm4zQ&usqp=CAU";

// Song Component
export const Song = () => {
	const classes = useStyles();
	const params = useParams();
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const [openPop, setOpenPop] = useState(false);

	const song = useSelector(
		(state) => state.songs.list.filter((s) => s.id === params.id)[0]
	);
	const auth = useSelector((s) => s.auth);

	useEffect(() => {
		if (!!song) {
			setIsLoading(false);
		}
	}, [song]);

	useEffect(() => {
		dispatch(view(song));
	});

	const handleClick = () => {
		history.goBack();
	};

	const onDeleteSong = () => {
		swal({
			title: "Are you sure!",
			text: "if you delete,it will be permanently deleted.",
			icon: "warning",
			dangerMode: true,
			buttons: true
		}).then((res) => {
			if (res) {
				dispatch(remove_song(params.id));
				swal({
					title: "success",
					icon: "success",
					timer: 1500
				});
				history.goBack();
			}
		});
	};

	return (
		<>
			<Grow in>
				{isLoading ? (
					<CircularProgress />
				) : (
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Button
								type="button"
								onClick={handleClick}
								startIcon={<ArrowBackIos />}
							>
								back
							</Button>
						</Grid>
						<Grid item sm={5} className={classes.ht}>
							<Card className={classes.imgCo}>
								<img
									src={song.imgUrl || IMG}
									alt={song.title}
									className={classes.image}
								/>
							</Card>
						</Grid>
						<Grid item sm={6}>
							<Grid
								container
								spacing={5}
								justifyContent="space-between"
							>
								<Grid item>
									<Typography variant="h4">
										{song.title}
									</Typography>
									<Typography variant="h6">
										{song.movie}
									</Typography>
									<Typography variant="body1">
										singer: {song.singer}
									</Typography>
								</Grid>
								<Grid item>
									<div className={classes.user}>
										<p className={classes.views}>
											{song.views} views
										</p>
										{!!auth && (
											<Button
												color="primary"
												variant="contained"
												className={classes.btnM}
												onClick={() => setOpenPop(true)}
											>
												Add to Playlist
											</Button>
										)}
										{!!(auth?.user.id === song.userId) && (
											<>
												<Link
													to={`/editsong/${song.id}`}
													className={classes.btnM}
												>
													<Button
														variant="contained"
														className={classes.btn}
														disableElevation
														size="small"
													>
														Edit
													</Button>
												</Link>
												<Button
													variant="contained"
													size="small"
													disableElevation
													color="secondary"
													onClick={onDeleteSong}
													className={classes.btnM}
												>
													Delete
												</Button>
											</>
										)}
										{!!(auth?.user.id !== song.userId) && (
											<Typography variant="h6">
												<span
													style={{
														fontSize: "0.8em",
														color: "grey",
														marginRight: "10px"
													}}
												>
													-added by
												</span>
												{song.name}
											</Typography>
										)}
									</div>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="caption">
										{new Date(song.created).toDateString()}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Typography
								className={classes.desc}
								variant="body2"
								component="p"
							>
								{song.description}
							</Typography>
						</Grid>
					</Grid>
				)}
			</Grow>
			{!!auth && (
				<Popup
					open={openPop}
					setOpen={() => {
						setOpenPop(false);
					}}
					styles={{ width: "15em", paddingBottom: "1.7em" }}
					title="Playlist"
				>
					<Playlist
						user={auth.user}
						songId={song.id}
						popup={setOpenPop}
					/>
				</Popup>
			)}
		</>
	);
};

export default Song;
