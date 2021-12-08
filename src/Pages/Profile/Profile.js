import {
	Badge,
	Button,
	Collapse,
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography
} from "@material-ui/core";
import { ArrowRight, ExpandLess, ExpandMore } from "@material-ui/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";

// importing custom component
import Song from "../../Components/Song/Song";

// importing styles
import useStyles from "./styles";

const AMale = `https://www.w3schools.com/bootstrap4/img_avatar3.png`;
const AFemale = `https://www.w3schools.com/bootstrap4/img_avatar5.png`;
const AOther = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP5IU8GgSurLLlvDn7J82C_uQHCfNHaxEqP7aU2P8xSx5QfhTIZVqHYkT-g7bggRhu92w&usqp=CAU`;

// profile component
export const Profile = () => {
	const [user, list] = useSelector(({ auth: { user }, songs: { list } }) => [
		user,
		list
	]);
	const [open, setOpen] = useState(false);
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.sp}>
				<Grid container className={classes.card} spacing={2}>
					<Grid item>
						<img
							src={
								user.gender === "male"
									? AMale
									: user.gender === "female"
									? AFemale
									: AOther
							}
							alt="avatar"
						/>
					</Grid>
					<Grid item>
						<Typography variant="h6" component="h6">
							{user.firstName} {user.lastName}
						</Typography>
						<Typography variant="body1" component="div">
							{user.id}
						</Typography>
						<Typography variant="body2" component="p">
							{user.mobile}
						</Typography>
					</Grid>
				</Grid>
			</div>
			<hr></hr>
			<div className={classes.sp}>
				<Typography variant="h5" component="h5">
					My Songs
				</Typography>
				<Grid container spacing={2}>
					{list
						.filter((li) => li.userId === user.id)
						.splice(0, 2)
						.map((s, i) => (
							<Grid item key={s.id} xs={6} sm={3}>
								<Song song={s} edit />
							</Grid>
						))}
					<Grid item xs={12} sm={2}>
						<Button
							component={Link}
							to="/mysongs"
							color="default"
							variant="contained"
							className={classes.more}
							endIcon={<ArrowRight />}
						>
							More
						</Button>
					</Grid>
					<Grid item className={classes.chart}>
						<Typography variant="h6" component="h6">
							Your top viewed songs
						</Typography>
						<Doughnut
							data={{
								labels: list
									.filter((li) => li.userId === user.id)
									.sort((a, b) => b.views - a.views)
									.splice(0, 5)
									.map((s) => s.title),
								datasets: [
									{
										label: "My Songs Views",
										backgroundColor: [
											"#c0334D",
											"#d6618f",
											"#f3d4a0",
											"#f1931b",
											"#8f715b"
										],
										hoverBackgroundColor: [
											"hsl(180, 100%, 50%)"
										],
										data: list
											.filter(
												(li) => li.userId === user.id
											)
											.map((s) => s.views)
									}
								]
							}}
						/>
					</Grid>
				</Grid>
			</div>
			<hr></hr>
			<div className={`${classes.sp} ${classes.list}`}>
				<Typography variant="h5" component="h5">
					My Playlist
				</Typography>
				<div className={classes.paper}>
					<List>
						{Object.entries(user.playlist)
							.splice(0, 3)
							.map(([key, val]) => (
								<ListItem
									key={key}
									button
									component={Link}
									to={`/playlist/${key}`}
								>
									<Badge
										badgeContent={val.length}
										color="error"
									>
										{<ListItemText primary={key} />}
									</Badge>
								</ListItem>
							))}
						{Object.entries(user.playlist).splice(3).length !==
							0 && (
							<>
								<ListItem
									button
									onClick={() => setOpen((s) => !s)}
								>
									<ListItemText primary="More" />
									{open ? <ExpandLess /> : <ExpandMore />}
								</ListItem>
								<Collapse
									in={open}
									timeout="auto"
									unmountOnExit
								>
									<List component="div" disablePadding>
										{Object.entries(user.playlist)
											.splice(3)
											.map(([key, val]) => (
												<ListItem
													key={key}
													button
													component={Link}
													to={`/playlist/${key}`}
												>
													<Badge
														badgeContent={
															val.length
														}
														color="error"
													>
														{
															<ListItemText
																primary={key}
															/>
														}
													</Badge>
												</ListItem>
											))}
									</List>
								</Collapse>
							</>
						)}
					</List>
				</div>
			</div>
		</div>
	);
};

export default Profile;
