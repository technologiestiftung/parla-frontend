import { FC } from "react";
import { ReloadIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface ErrorAlertProps {
	callback: () => void;
	error: string;
}

export const ErrorAlert: FC<ErrorAlertProps> = ({ callback, error }) => {
	return (
		<div
			className="max-w-3xl mx-auto bg-orange-200 rounded-md p-3 text-sm mt-2 flex justify-between"
			data-testid="error-alert"
		>
			<div className="flex gap-1 items-center text-orange-700">
				<ExclamationTriangleIcon></ExclamationTriangleIcon>
				{error}
			</div>
			<button
				onClick={callback}
				data-testid="reload-icon"
				className="text-orange-700"
			>
				<ReloadIcon></ReloadIcon>
			</button>
		</div>
	);
};
