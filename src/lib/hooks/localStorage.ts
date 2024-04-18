import { create } from "zustand";
import { HistoryEntryType } from "../common";
import { persist } from "zustand/middleware";

interface HistoryStore {
	resultHistory: HistoryEntryType[];
	setResultHistory: (history: HistoryEntryType[]) => void;
}

export const useHistoryStore = create(
	persist<HistoryStore>(
		(set) => ({
			// For backwards compatibility with old localStorage history, we initially load the parly-history
			resultHistory: [],
			setResultHistory: (resultHistory: HistoryEntryType[]) =>
				set({ resultHistory }),
		}),
		{
			name: "parla-store",
		},
	),
);
