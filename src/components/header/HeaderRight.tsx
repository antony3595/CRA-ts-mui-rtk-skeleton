import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/auth/authSlice";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { LOGIN } from "../../urls";
import strings from "../../constants/strings";
import HeaderUser from "./HeaderUser/HeaderUser";

const HeaderRight = () => {
	const { loggedIn } = useAppSelector(selectAuth);

	return (
		<div>
			{loggedIn ? (
				<HeaderUser />
			) : (
				<Button variant={"outlined"} component={Link} to={LOGIN} color="inherit">
					{strings.sign_in}
				</Button>
			)}
		</div>
	);
};

export default HeaderRight;
