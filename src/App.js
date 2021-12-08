import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CircularProgress, Typography } from "@material-ui/core";

// importing redux store
import Store from "./Store";

// custom components
import PrivateRoute from "./Components/PrivateRoute";
import Layout from "./Components/Layout";

// importing pages
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Profile from "./Pages/Profile/Profile";

// importing css
import "./App.css";

// lazy loaded components;
const AllSongs = lazy(() => import("./Pages/AllSongs/AllSongs"));
const About = lazy(() => import("./Pages/About/About"));
const AddSong = lazy(() => import("./Pages/AddSong/AddSong"));
const Song = lazy(() => import("./Pages/Song/Song"));
const MySongs = lazy(() => import("./Pages/Mysongs/MySongs"));
const Playlist = lazy(() => import("./Pages/Playlist/Playlist"));

export function App() {
	return (
		<Store>
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/signup">
							<Signup />
						</Route>
						<Route path={`/songs/:id`}>
							<Suspense fallback={<CircularProgress />}>
								<Song />
							</Suspense>
						</Route>
						<Route path="/songs">
							<Suspense fallback={<CircularProgress />}>
								<AllSongs />
							</Suspense>
						</Route>
						<Route path="/about">
							<Suspense fallback={<CircularProgress />}>
								<About />
							</Suspense>
						</Route>
						<PrivateRoute path="/profile">
							<Profile />
						</PrivateRoute>
						<PrivateRoute path="/editsong/:id">
							<Suspense fallback={<CircularProgress />}>
								<AddSong />
							</Suspense>
						</PrivateRoute>
						<PrivateRoute path="/addsong">
							<Suspense fallback={<CircularProgress />}>
								<AddSong />
							</Suspense>
						</PrivateRoute>
						<PrivateRoute path="/mysongs">
							<Suspense fallback={<CircularProgress />}>
								<MySongs />
							</Suspense>
						</PrivateRoute>
						<PrivateRoute path="/playlist/:id">
							<Suspense fallback={<CircularProgress />}>
								<Playlist />
							</Suspense>
						</PrivateRoute>
						<Route paht="*">
							<Typography variant="h5" component="h5">
								Page not found
							</Typography>
						</Route>
					</Switch>
				</Layout>
			</Router>
		</Store>
	);
}

export default App;
