import { Badge, IconButton, Menu, MenuItem } from "@material-ui/core";
import { Delete, People } from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";

// importing styles
import useStyles from "./InOutStyles";

// importing actions
import { logout, remove_list } from "../../Store/actions/auth";

// Login component
export const Login = ({ click }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const songs = useSelector((state) => state);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		click();
	};

	const log_out = () => {
		dispatch(logout());
		handleClose();
	};

	const handleDelete = (e, key) => {
		e.stopPropagation();
		handleClose();
		swal({
			title: "Are you sure?",
			text: "Once song is deleted, you will not be able to recover it",
			icon: "warning",
			buttons: true,
			dangerMode: true
		}).then((res) => {
			if (res) {
				dispatch(remove_list(key, songs.auth.user));
				swal({
					title: "Deleted",
					icon: "success",
					timer: 2000
				});
			}
		});
	};

	return (
		<>
			<IconButton
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={handleClick}
				className={classes.icon}
			>
				<People />
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
				<Link to="/profile" onClick={handleClose}>
					<MenuItem>Profile</MenuItem>
				</Link>
				<Link to="/addsong" onClick={handleClose}>
					<MenuItem>Add Song</MenuItem>
				</Link>
				<Link to="/mysongs" onClick={handleClose}>
					<MenuItem style={{ paddingTop: "10px" }}>
						<Badge
							badgeContent={
								songs.songs.list.filter(
									(l) => l.userId === songs.auth.user.id
								).length
							}
							color="error"
							showZero
							max={20}
						>
							My songs
						</Badge>
					</MenuItem>
				</Link>
				{Object.entries(songs.auth.user.playlist).map(
					([key, val], i) => (
						<MenuItem
							key={i}
							className={classes.liItem}
							style={{ paddingTop: "10px" }}
						>
							<Link
								className={classes.liItemLink}
								to={`/playlist/${key}`}
								onClick={handleClose}
							>
								<Badge
									badgeContent={val.length}
									color="error"
									showZero
									max={20}
								>
									{key}
								</Badge>
							</Link>
							{key !== "MyPlaylist" && (
								<IconButton
									className={classes.liItemDelete}
									onClick={(e) => handleDelete(e, key)}
								>
									<Delete />
								</IconButton>
							)}
						</MenuItem>
					)
				)}
				<hr></hr>
				<MenuItem className={classes.logout} onClick={log_out}>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
};

export default Login;
