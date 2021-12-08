import { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, Typography } from "@material-ui/core";
import { Close, Menu } from "@material-ui/icons";
import { useSelector } from "react-redux";

import Logout from "./Logout";
import Login from "./Login";

// importing styles
import useStyles from "./NavStyles";

// navbar component
export const Nav = () => {
	const classes = useStyles();
	const auth = useSelector((s) => s.auth);
	const [mobile, setMobile] = useState(false);

	const handleClick = () => {
		setMobile((s) => !s);
	};

	return (
		<nav className={classes.navbar}>
			<Link to="/">
				<Typography className={classes.navbarLogo}>Feelu</Typography>
			</Link>
			<IconButton className={classes.navbarToggle} onClick={handleClick}>
				{mobile ? <Close /> : <Menu />}
			</IconButton>
			<div
				className={`${classes.list} ${!!mobile && classes.listActive}`}
			>
				<Link
					to="/songs"
					className={classes.listLinks}
					onClick={handleClick}
				>
					Songs
				</Link>
				<Link
					to="/about"
					className={classes.listLinks}
					onClick={handleClick}
				>
					About
				</Link>
				<div className={classes.listItem}>
					{!auth ? (
						<Logout click={() => setMobile(false)} />
					) : (
						<Login click={() => setMobile(false)} />
					)}
				</div>
			</div>
		</nav>
	);
};

export default Nav;
