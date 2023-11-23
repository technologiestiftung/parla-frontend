import { useEffect, useRef } from "react";

const showSplashScreenKey = 'show-splash-screen'
export function useShowSplashScreenFromLocalStorage() {
	const showSplashScreenRef= useRef<boolean>(false);

	useEffect(() => {
		try {
			const item = window.sessionStorage.getItem(showSplashScreenKey);

			const parsedItem = item ?  JSON.parse(item) : true;

			if (!parsedItem) {
				return;
			}

			showSplashScreenRef.current = parsedItem;
			window.sessionStorage.setItem(showSplashScreenKey, JSON.stringify(false));
		} catch (error) {
			console.error(error);
			showSplashScreenRef.current = true;
			window.sessionStorage.setItem(showSplashScreenKey, JSON.stringify(false));
		}
	}, []);

	return { showSplashScreenRef };
}