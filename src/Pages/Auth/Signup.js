import { Paper, Grid, CircularProgress, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Lock } from "@material-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

// input
import Control from "../../Components/reuse";

// importing auth api
import * as API from "../../Store/apis/auth";

// importing action
import { login } from "../../Store/actions/auth";

// importing useStyles
import useStyles from "./styles";

const initState = {
	firstName: "",
	lastName: "",
	mail: "",
	password: "",
	gender: "",
	mobile: "",
	location: ""
};

// login page
export const Signup = () => {
	const classes = useStyles();
	const history = useHistory();
	const auth = useSelector((s) => s.auth);
	const location = useLocation();
	const dispatch = useDispatch();
	const [error, setError] = useState({});
	const [isloading, setIsloading] = useState(false);
	const [validity, setValidity] = useState(false);

	const formit = useFormik({
		initialValues: initState,
		validationSchema: Yup.object({
			firstName: Yup.string().required(`* required`).min(4),
			lastName: Yup.string().required(`* reqiured`).min(4),
			mail: Yup.string().required(`* reqiured`).min(4),
			password: Yup.string().required(`* reqiured`).min(4),
			gender: Yup.string().required(`* required`),
			location: Yup.string().required(`* requried`)
		}),
		validateOnChange: validity,
		validateOnBlur: validity,
		onSubmit: (values, actions) => {
			setValidity(true);
			actions.setSubmitting(false);
			check(values, actions.setSubmitting);
		}
	});

	useEffect(() => {
		setError(formit.errors);
	}, [formit.errors]);

	const check = async (values, cb) => {
		setIsloading(true);
		try {
			await API.getUser(values.mail);
			setError((s) => ({
				...s,
				mail: "mail already exist"
			}));
		} catch (err) {
			try {
				values.id = values.mail;
				values.added = Date.now();
				delete values.mail;
				values.playlist = { MyPlaylist: [] };
				const { data } = await API.addUser(values);
				dispatch(login(data));
				swal({
					timer: 1000,
					title: "Signup success",
					buttons: false,
					icon: "success"
				});
			} catch (err) {
				console.log(err.message);
			}
		}
		setIsloading(false);
		cb(true);
	};

	const { from } = location.state || { from: { pathname: "/" } };

	useEffect(() => {
		!!auth && history.replace(from);
		return;
	}, [auth, from, history]);

	return (
		<Grid container>
			<Grid item xs={12} md={6} className={classes.marginAuto}>
				<Paper className={classes.paper}>
					<Grid
						container
						className={classes.ico}
						justifyContent="center"
					>
						<Grid item>
							<Lock className={classes.icon} />
							<Typography variant="h5">Signup</Typography>
						</Grid>
					</Grid>
					<form onSubmit={formit.handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<Control.Input
									type="text"
									name="firstName"
									label="First Name"
									value={formit.values.firstName}
									onChange={formit.handleChange}
									required
									error={!!error.firstName}
									helperText={error.firstName}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Control.Input
									type="text"
									name="lastName"
									label="First Name"
									value={formit.values.lastName}
									onChange={formit.handleChange}
									required
									error={!!error.lastName}
									helperText={error.lastName}
								/>
							</Grid>
							<Grid item xs={12}>
								<Control.RadioGrp
									label="Gender"
									value={formit.values.gender}
									name="gender"
									grp={[
										{ label: "Male", val: "male" },
										{ label: "Female", val: "female" }
									]}
									onChange={formit.handleChange}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Control.Input
									type="text"
									name="location"
									label="Place"
									value={formit.values.location}
									onChange={formit.handleChange}
									required
									error={!!error.location}
									helperText={error.location}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Control.Input
									type="tel"
									name="mobile"
									label="Mobile"
									value={formit.values.mobile}
									onChange={formit.handleChange}
									required
									error={!!error.mobile}
									helperText={error.mobile}
								/>
							</Grid>
							<Grid item xs={12}>
								<Control.Input
									type="email"
									name="mail"
									label="E-mail"
									value={formit.values.mail}
									onChange={formit.handleChange}
									required
									error={!!error.mail}
									helperText={error.mail}
								/>
							</Grid>
							<Grid item xs={12}>
								<Control.Input
									type="password"
									name="password"
									label="Password"
									value={formit.values.password}
									onChange={formit.handleChange}
									required
									error={!!error.password}
									helperText={error.password}
								/>
							</Grid>
							<Grid item xs={12}>
								<Control.Button
									disabled={isloading}
									type="submit"
									color="primary"
									fullWidth
									startIcon={
										isloading && (
											<CircularProgress size={25} />
										)
									}
								>
									Sign-Up
								</Control.Button>
							</Grid>
						</Grid>
					</form>
					<Grid container className={classes.toggle} spacing={2}>
						<Grid item>
							<Link to="/login">
								<Control.Button color="default">
									Already have an account? login
								</Control.Button>
							</Link>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};
export default Signup;
