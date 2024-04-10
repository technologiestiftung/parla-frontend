import { DocumentSearchResponse } from "./../common";
import { useEffect, useState } from "react";

export function useLocalStorage<ValueType>(
	key: string,
	initialValue: ValueType,
): [
	ValueType,
	(value: ValueType | ((oldValue: ValueType) => ValueType)) => void,
	boolean,
] {
	const [stateIsLoading, setStateIsLoading] = useState(true);

	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState<ValueType>(initialValue);

	useEffect(() => {
		try {
			setStateIsLoading(true);
			const item = window.localStorage.getItem(key);
			const parsedItem = item ? JSON.parse(item) : null;
			const isValid =
				typeof parsedItem === typeof initialValue &&
				Array.isArray(parsedItem) &&
				parsedItem.every(
					(item) =>
						"query" in item &&
						"id" in item &&
						"searchResponse" in item &&
						"answerResponse" in item,
				);

			if (!isValid) {
				window.localStorage.removeItem(key);
				return;
			}
			// Parse stored json or if none return initialValue
			setStoredValue(item ? (parsedItem as ValueType) : initialValue);
		} catch (error) {
			// If error also return initialValue
			console.error(error);
			setStoredValue(storedValue);
		} finally {
			setStateIsLoading(false);
		}
	}, []);

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (
		value: ValueType | ((oldValue: ValueType) => ValueType),
	) => {
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

	return [storedValue, setValue, stateIsLoading];
}
