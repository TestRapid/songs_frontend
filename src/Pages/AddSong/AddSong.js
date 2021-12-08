import { Typography, Grid, Paper } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Prompt } from "react-router-dom";
import * as yup from "yup";

// importing custom component
import Control from "../../Components/reuse";

// importing actions
import { add_song, update_song } from "../../Store/actions/songs";

// importing styles
import useStyles from "./styles";

const initState = {
	movie: "",
	title: "",
	length: "",
	singer: "",
	description: "",
	created: Date.now()
};

// Add Song component
export const Add_song = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const params = useParams();
	const [validity, setValidity] = useState(false);
	const [stopit, setStopit] = useState(true);
	const [error, setError] = useState({});
	const auth = useSelector((s) => s.auth);
	const song = useSelector(
		(s) => s.songs.list.filter((l) => l.id === params.id)[0]
	);

	const formit = useFormik({
		initialValues: !!params.id ? song : initState,
		validationSchema: yup.object({
			movie: yup.string().required("* movie name required"),
			title: yup.string().required("* title is required"),
			length: yup.string().required("* enter song length"),
			description: yup.string().required("* write some description"),
			singer: yup.string().required("* enter singer name")
		}),
		validateOnChange: validity,
		onSubmit: (values, actions) => {
			setValidity(true);
			actions.setSubmitting(true);
			if (!!params.id) dispatch(update_song(values, auth.user));
			else dispatch(add_song(values, auth.user));
			actions.resetForm();
			setTimeout(() => {
				setStopit(false);
				history.goBack();
			}, 750);
		}
	});

	const onClick = () => {
		history.goBack();
	};

	useEffect(() => {
		setError(formit.errors);
	}, [formit.errors]);

	return (
		<div>
			<Grid container>
				<Control.Button
					type="button"
					style={{ marginBottom: "1em", marginTop: "-2em" }}
					onClick={onClick}
					startIcon={<ArrowBackIos />}
				>
					back
				</Control.Button>
			</Grid>
			<Grid container spacing={0}>
				<Grid item md={4}>
					<img
						src="https://images.unsplash.com/photo-1525362081669-2b476bb628c3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fG11c2ljfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
						alt="img logo"
						className={classes.img}
					/>
				</Grid>
				<Grid item md={8}>
					<Paper className={classes.paper}>
						<Typography
							variant="h4"
							style={{ marginBottom: "20px" }}
						>
							{!!params.id ? "Edit" : "Add new"} Song
						</Typography>
						<form onSubmit={formit.handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Control.Input
										type="text"
										name="title"
										label="Title"
										onChange={formit.handleChange}
										value={formit.values.title}
										error={!!error.title}
										helperText={error.title}
									/>
								</Grid>
								<Grid item xs={12}>
									<Control.Input
										type="text"
										name="movie"
										label="Movie"
										onChange={formit.handleChange}
										value={formit.values.movie}
										error={!!error.movie}
										helperText={error.movie}
									/>
								</Grid>
								<Grid item xs={6}>
									<Control.Input
										type="text"
										name="length"
										label="Song length"
										onChange={formit.handleChange}
										value={formit.values.length}
										error={!!error.length}
										helperText={error.length}
									/>
								</Grid>
								<Grid item xs={12}>
									<Control.Input
										type="text"
										name="singer"
										label="Singer"
										onChange={formit.handleChange}
										value={formit.values.singer}
										error={!!error.singer}
										helperText={error.singer}
									/>
								</Grid>
								<Grid item xs={12}>
									<Control.Input
										type="text"
										name="description"
										label="Description"
										onChange={formit.handleChange}
										value={formit.values.description}
										error={!!error.description}
										helperText={error.description}
										multiline
										rows={3}
									/>
								</Grid>
								<Grid item xs={12}>
									<Control.Button
										type="submit"
										color="primary"
										size="large"
										fullWidth
									>
										Submit
									</Control.Button>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</Grid>
			</Grid>
			<Prompt when={stopit} message="Are you sure want to cancel..." />
		</div>
	);
};

export default Add_song;
