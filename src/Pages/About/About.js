import { Grid, Paper, Typography } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import { Doughnut } from "react-chartjs-2";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from "react-redux";

// importing images
import home from "../../asset/shots/home.png";
import msongs from "../../asset/shots/msongs.png";
import profile from "../../asset/shots/profile.png";
import mprofile from "../../asset/shots/mprofile.png";
import login from "../../asset/shots/login.png";
import signup from "../../asset/shots/signup.png";
import addsong from "../../asset/shots/addsong.png";
import searching from "../../asset/shots/searching.png";
import mlist from "../../asset/shots/mlist.png";
import msong from "../../asset/shots/msong.png";
import multidelete from "../../asset/shots/multidelete.png";
import allsongs from "../../asset/shots/allsongs.png";
import { useState, useEffect } from "react";

// importing custom styles
import useStyles from "./styles";

const sorted = ({ songs: { list } }) =>
	[...list.sort((a, b) => b.views - a.views)].splice(0, 6);

// About component
export const About = () => {
	const classes = useStyles();
	const [songs, setSongs] = useState([]);
	const list = useSelector(sorted);

	useEffect(() => {
		setSongs(list);
	}, [list]);

	return (
		<>
			<Paper className={classes.text}>
				<Typography variant="h5" component="h5">
					About Page
				</Typography>
				<hr></hr>
				<Typography variant="body2" component="p">
					This is a front end Web app with authentication (like
					signup, login, route protection), curd (create, update,
					read, delete) operations on songs DB with material ui and
					Also responsive design.
				</Typography>
			</Paper>
			<Grid
				container
				className={classes.container}
				justifyContent="space-between"
				spacing={2}
			>
				<Grid item xs={12} sm={3}>
					<Typography variant="h5" component="h5">
						Top viewed
					</Typography>
					<Doughnut
						data={{
							labels: songs.map((l) => l.title),
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
									data: songs.map((l) => l.views)
								}
							]
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={8} className={classes.carousel}>
					<Carousel autoPlay infiniteLoop>
						<div className={classes.slide}>
							<img src={home} alt="home" />
							<p className="legend">home</p>
						</div>
						<div className={classes.slide}>
							<img src={profile} alt="profile" />
							<p className="legend">profile</p>
						</div>
						<div className={classes.slide}>
							<img src={allsongs} alt="allsongs" />
							<p className="legend">allsongs</p>
						</div>
						<div className={classes.slide}>
							<img src={multidelete} alt="multidelete" />
							<p className="legend">multidelete</p>
						</div>
						<div className={classes.slide}>
							<img src={login} alt="login" />
							<p className="legend">login</p>
						</div>
						<div className={classes.slide}>
							<img src={signup} alt="signup" />
							<p className="legend">signup</p>
						</div>
						<div className={classes.slide}>
							<img src={searching} alt="searching" />
							<p className="legend">searching</p>
						</div>
						<div className={classes.slide}>
							<img src={addsong} alt="addsong" />
							<p className="legend">addsong</p>
						</div>
						<div className={classes.slide}>
							<img src={mprofile} alt="mprofile" />
							<p className="legend">mprofile</p>
						</div>
						<div className={classes.slide}>
							<img src={mlist} alt="mlist" />
							<p className="legend">mlist</p>
						</div>
						<div className={classes.slide}>
							<img src={msong} alt="msong" />
							<p className="legend">msong</p>
						</div>
						<div className={classes.slide}>
							<img src={msongs} alt="msongs" />
							<p className="legend">all songs</p>
						</div>
					</Carousel>
				</Grid>
			</Grid>
		</>
	);
};

export default About;
