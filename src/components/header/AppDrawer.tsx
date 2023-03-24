import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { LinearProgress } from "@mui/material";
import SidebarNavigation from "./SidebarNavigation/SidebarNavigation";
import SidebarToolbar from "./SidebarNavigation/SidebarToolbar";
import { Outlet, useLocation } from "react-router-dom";
import strings from "../../constants/strings";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import HeaderRight from "./HeaderRight";
import HeaderTitle from "./HeaderTitle";
import LoadingBackdrop from "../common/LoadingBackdrop";
import MyBreadcrumbs from "../common/Breadcrumbs/MyBreadcrumbs";

const drawerWidth = 240;

interface Props {
	window?: () => Window;
}

export interface AppDrawerContext {
	title: string;
	setTitle: (title: string) => void;
	progressVisible: boolean;
	setProgressVisible: (isVisible: boolean) => void;
}

const AppDrawer = (props: Props) => {
	const { pathname } = useLocation();

	const [title, setTitle] = useState<string>("");
	const [progressVisible, setProgressVisible] = useState<boolean>(false);

	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const drawerContext: AppDrawerContext = useMemo<AppDrawerContext>(
		() => ({
			progressVisible,
			setProgressVisible: (isVisible) => setProgressVisible(isVisible),
			title,
			setTitle: (title: string) => {
				setTitle(title);
			},
		}),
		[progressVisible, setProgressVisible, title, setTitle]
	);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	useEffect(() => {
		if (progressVisible) setProgressVisible(false);
	}, [pathname]);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar
				color={"secondary"}
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<HeaderTitle title={<MyBreadcrumbs title={title} />} />
					<HeaderRight />
				</Toolbar>
				<Box width={"100%"}>
					{progressVisible && (
						<LinearProgress
							variant={"query"}
							sx={(theme) => ({
								"& .MuiLinearProgress-barColorPrimary": {
									backgroundColor: theme.palette.primary.light,
								},
							})}
						/>
					)}
				</Box>
			</AppBar>
			<Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							backgroundColor: "secondary.main",
						},
					}}
				>
					<SidebarToolbar />
					<SidebarNavigation closeSidebar={() => setMobileOpen(false)} />
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							backgroundColor: "secondary.main",
							width: drawerWidth,
						},
					}}
					open
				>
					<SidebarToolbar />
					<SidebarNavigation closeSidebar={() => setMobileOpen(false)} />
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					position: "relative",
				}}
			>
				<Toolbar />
				<ErrorBoundary text={strings.page_error}>
					<React.Suspense fallback={<LoadingBackdrop open />}>
						<Outlet context={drawerContext} />
					</React.Suspense>
				</ErrorBoundary>
			</Box>
		</Box>
	);
};

export default AppDrawer;
