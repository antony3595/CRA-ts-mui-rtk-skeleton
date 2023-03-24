import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { AppDrawerContext } from "../components/header/AppDrawer";

const useTitle = (new_title: string) => {
	const { setTitle } = useOutletContext<AppDrawerContext>();
	useEffect(() => {
		setTitle(new_title);
	}, [new_title, setTitle]);
};

export default useTitle;
