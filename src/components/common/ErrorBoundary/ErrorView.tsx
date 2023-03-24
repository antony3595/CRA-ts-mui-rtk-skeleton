import React from "react";
import "../../../stylesheets/_main.scss";
import "./styles.scss";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import * as urls from "../../../urls";
import PageWrapper from "../PageWrapper/PageWrapper";
import strings from "../../../constants/strings";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorView: React.FC<{ message: string; text: string }> = ({ message, text }) => {
	return (
		<PageWrapper>
			<div className="error-block">
				<div className="icon-block">
					<ErrorOutlineIcon />
				</div>
				<div className="text-block">
					<Typography variant="h5">{text}</Typography>
					<Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
						{message}
					</Typography>
				</div>
				<a href={urls.HOME} className="link">
					<Button size="large" variant="contained" color="warning">
						{strings.go_back_home}
					</Button>
				</a>
			</div>
		</PageWrapper>
	);
};

export default ErrorView;
