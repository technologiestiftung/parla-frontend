import { useEffect, useRef } from "react";

const showSplashScreenKey = 'show-splash-screen'
export function useShowSplashScreenFromLocalStorage() {
	const showSplashScreenRef= useRef<boolean>(false);

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(showSplashScreenKey);

			const parsedItem = item ?  JSON.parse(item) : true;

			if (!parsedItem) {
				return;
			}

			showSplashScreenRef.current = parsedItem;
			window.localStorage.setItem(showSplashScreenKey, JSON.stringify(false));
		} catch (error) {
			console.error(error);
			showSplashScreenRef.current = true;
			window.localStorage.setItem(showSplashScreenKey, JSON.stringify(false));
		}
	}, []);

	return { showSplashScreenRef };
}