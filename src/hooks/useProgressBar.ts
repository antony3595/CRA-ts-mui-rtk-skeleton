import { useOutletContext } from "react-router-dom";
import { AppDrawerContext } from "../components/header/AppDrawer";
import { useEffect } from "react";

const useProgressBar = (): [boolean, (visible: boolean) => void] => {
	const { setProgressVisible, progressVisible } = useOutletContext<AppDrawerContext>();
	return [progressVisible, setProgressVisible];
};

export const useLoadingBar = (isLoading: boolean) => {
	const { setProgressVisible } = useOutletContext<AppDrawerContext>();
	useEffect(() => {
		setProgressVisible(isLoading);
	}, [isLoading]);
};

export default useProgressBar;
