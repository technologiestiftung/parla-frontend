import { useEffect, useState } from "react";
import { ResponseDetail } from "../common";

export function useLocalStorage(key: string, initialValue: ResponseDetail[]) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] =
		useState<ResponseDetail[]>(initialValue);

	useEffect(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			setStoredValue(item ? JSON.parse(item) : initialValue);
		} catch (error) {
			// If error also return initialValue
			console.error(error);
			setStoredValue(storedValue);
		}
	}, []);

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value: ResponseDetail[]) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			// Save state
			//
			setStoredValue(valueToStore);
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.error(error);
		}
	};

	return { resultHistory: storedValue, setResultHistory: setValue };
}
