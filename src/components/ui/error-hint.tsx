import { InfoCircledIcon, ReloadIcon } from "@radix-ui/react-icons";

interface ErrorHintProps {
	message: string;
	reloadHandler: () => void;
}

const ErrorHint: React.FC<ErrorHintProps> = ({ message, reloadHandler }) => {
	return (
		<div className="relative w-full max-w-xl mx-auto flex items-center bg-red-100 p-2 rounded-md mb-2 justify-between">
			<div className="flex items-center text-sm">
				<InfoCircledIcon className="mr-2" />
				<span>{message}</span>
			</div>

			<button className="btn ml-2" onClick={reloadHandler}>
				<ReloadIcon></ReloadIcon>
			</button>
		</div>
	);
};

export default ErrorHint;
