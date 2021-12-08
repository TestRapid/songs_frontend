import { Paper, Grid, CircularProgress, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Lock } from "@material-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

// input
import Control from "../../Components/reuse";

// api for authentication
import * as API from "../../Store/apis/auth";

// importing action
import { login } from "../../Store/actions/auth";

// importing useStyles
import useStyles from "./styles";

const initState = {
	mail: "",
	password: ""
};

// login page
export const Login = () => {
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
			mail: Yup.string().required(`* required`).min(4),
			password: Yup.string().required(`* reqiured`).min(4)
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
			const { data } = await API.getUser(values.mail);
			dispatch(login(data));
			swal({
				timer: 1000,
				title: "login success",
				buttons: false,
				icon: "success"
			});
		} catch (err) {
			setError((s) => ({
				...s,
				mail: "user not found..."
			}));
		}
		cb(true);
	};

	const { from } = location.state || { from: { pathname: "/" } };

	useEffect(() => {
		!!auth && history.replace(from);
		return () => {
			setIsloading(false);
		};
	}, [auth, from, history]);

	return (
		<Grid container>
			<Grid item xs={12} md={6} className={classes.marginAuto}>
				<Paper className={classes.paper}>
					<Grid container className={classes.ico}>
						<Grid item>
							<Lock className={classes.icon} />
							<Typography variant="h5">Login</Typography>
						</Grid>
					</Grid>
					<form onSubmit={formit.handleSubmit}>
						<Grid container spacing={2}>
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
									fullWidth
									type="submit"
									color="primary"
									startIcon={
										isloading && (
											<CircularProgress size={25} />
										)
									}
								>
									Login
								</Control.Button>
							</Grid>
						</Grid>
					</form>
					<Grid container className={classes.toggle} spacing={2}>
						<Grid item>
							<Link to="/signup">
								<Control.Button color="default">
									Create new account...
								</Control.Button>
							</Link>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};
export default Login;
