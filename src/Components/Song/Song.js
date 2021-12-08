import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
	Grid,
	Grow,
	IconButton,
	Menu,
	MenuItem
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";

// importing custom popup component
import Popup from "../Popup";
import Playlist from "../Playlist/Playlist";

// importing
import useStyles from "./styles";

// importing actions
import { remove_song } from "../../Store/actions/songs";
import { remove_from_playlist } from "../../Store/actions/auth";

const IMG =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX-H93gCVZ3NnLQ0ME5KiSHAsxR-cawBm4zQ&usqp=CAU";

// Songs component
export const Song = ({ song, pid, edit, custom }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const auth = useSelector((s) => s.auth);
	const [openPop, setOpenPop] = useState(false);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = () => {
		handleClose();
		swal({
			title: "Are you sure?",
			text: "Once song is deleted, you will not be able to recover it",
			icon: "warning",
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				dispatch(remove_song(song.id));
				swal("Song deleted!", {
					title: "success",
					icon: "success",
					timer: 2000
				});
			}
		});
	};

	const removeSong = () => {
		handleClose();
		swal({
			title: "Are you sure?",
			text: "Want to remove song from playlist",
			icon: "warning",
			buttons: true,
			dangerMode: true
		}).then((res) => {
			if (res) {
				dispatch(remove_from_playlist(pid, song.id, auth.user));
			}
		});
	};

	return (
		<>
			<Grow in>
				<Card className={classes.card}>
					<div className={classes.imgCover}>
						<img src={song?.imgUrl || IMG} alt={song.title} />
					</div>
					{!custom ? (
						<CardContent>
							<Typography
								variant="h5"
								component="h6"
								className={classes.conti}
							>
								{song.title}
							</Typography>
							<Typography
								variant="body2"
								component="p"
								className={classes.conti}
							>
								{song.description}
							</Typography>
						</CardContent>
					) : (
						<CardContent>
							{custom.title && (
								<Typography
									variant="h5"
									component="h6"
									className={classes.conti}
								>
									{song.title}
								</Typography>
							)}
							{custom.movie && (
								<Typography
									variant="h6"
									component="h6"
									className={classes.conti}
								>
									{song.movie}
								</Typography>
							)}
							{custom.singer && (
								<Typography
									variant="h6"
									component="h6"
									className={classes.conti}
								>
									{song.singer}
								</Typography>
							)}
							{custom.description && (
								<Typography
									variant="body2"
									component="p"
									className={classes.conti}
								>
									{song.description}
								</Typography>
							)}
						</CardContent>
					)}
					<CardActions className={classes.actions}>
						<Grid
							container
							justifyContent="space-between"
							alignItems="center"
						>
							<Grid item>
								<Link to={`/songs/${song.id}`}>
									<Button
										variant="contained"
										color="primary"
										size="small"
									>
										view
									</Button>
								</Link>
							</Grid>
							<Grid item>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										marginRight: "-1em"
									}}
								>
									<Typography
										variant="caption"
										component="p"
										className={classes.views}
									>
										{song.views} views
									</Typography>
									{!!auth && (
										<div>
											<IconButton
												aria-label="more"
												aria-controls="long-menu"
												aria-haspopup="true"
												onClick={handleClick}
											>
												<MoreVert />
											</IconButton>
											<Menu
												id="long-menu"
												anchorEl={anchorEl}
												keepMounted
												open={open}
												onClose={handleClose}
												PaperProps={{
													style: {
														width: "20ch"
													}
												}}
											>
												{!pid && (
													<MenuItem
														onClick={() => {
															setOpenPop(true);
															handleClose();
														}}
													>
														Add to playlist
													</MenuItem>
												)}
												{!!pid && (
													<MenuItem
														onClick={removeSong}
													>
														Remove from List
													</MenuItem>
												)}
												{edit &&
													song.userId ===
														auth?.user.id && (
														<div>
															<Link
																to={`/editsong/${song.id}`}
															>
																<MenuItem
																	onClick={
																		handleClose
																	}
																>
																	Edit
																</MenuItem>
															</Link>
															<MenuItem
																onClick={
																	handleDelete
																}
															>
																Delete
															</MenuItem>
														</div>
													)}
											</Menu>
										</div>
									)}
								</div>
							</Grid>
						</Grid>
					</CardActions>
				</Card>
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
