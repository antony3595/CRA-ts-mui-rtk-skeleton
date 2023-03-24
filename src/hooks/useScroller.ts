import { useEffect } from "react";

export const scroll = (smooth = false, anchor: string | null = null) => {
	let topPos = 0;

	try {
		if (anchor) {
			const element: HTMLElement | null = document.getElementById(anchor);
			if (element) {
				topPos = element.offsetTop - 68;
			}
		}
		window.scroll({
			behavior: smooth ? "smooth" : "auto",
			top: topPos,
		});
	} catch (err) {
		if (err instanceof TypeError) {
			window.scroll(0, topPos);
		} else {
			throw err;
		}
	}
};

const useScroller = (location: string, smooth = false, anchor = null) => {
	useEffect(() => {
		scroll(smooth, anchor);
	}, [location, smooth]);
};
export default useScroller;
