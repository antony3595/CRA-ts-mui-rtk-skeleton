import React from "react";
import { Breadcrumbs, Link } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { matchRouteDefinitions } from "../../../utils/breadcrumbs";
import { routes } from "../../../constants/routes";

interface MyBreadcrumbsProps {
	title?: string;
}

const MyBreadcrumbs = ({ title }: MyBreadcrumbsProps) => {
	const { pathname } = useLocation();
	const matches = matchRouteDefinitions(routes, pathname);
	return (
		<Breadcrumbs sx={{ ol: { flexWrap: "nowrap" } }} aria-label={"breadcrumbs"}>
			{matches.map(([match, route], index) =>
				index !== matches.length - 1 ? (
					<Link
						key={match.pathname}
						sx={{ whiteSpace: "nowrap" }}
						component={RouterLink}
						underline="hover"
						color="inherit"
						to={match.pathname}
					>
						{route.title}
					</Link>
				) : (
					<Typography
						sx={{
							wordBreak: "break-word",
							overflow: "hidden",
							textOverflow: "ellipsis",
							display: "-webkit-box",
							WebkitLineClamp: 1,
							WebkitBoxOrient: "vertical",
							maxWidth: "500px",
						}}
						key={match.pathname}
						color="text.primary"
					>
						{title}
					</Typography>
				)
			)}
		</Breadcrumbs>
	);
};

export default MyBreadcrumbs;
