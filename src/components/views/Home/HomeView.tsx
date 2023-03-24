import React from "react";
import "./home.scss";
import PageWrapper from "../../common/PageWrapper/PageWrapper";
import useTitle from "../../../hooks/useTitle";
import Typography from "@mui/material/Typography";
import config from "../../../config";

const HomeView = () => {
	useTitle("Home Page");
	return (
		<PageWrapper>
			<Typography className={"home-page"} variant={"h3"} fontWeight={"500"}>
				Добро пожаловать в {config.SITE_NAME}
			</Typography>
		</PageWrapper>
	);
};

export default HomeView;
