import { InfoCircledIcon, ReloadIcon } from "@radix-ui/react-icons";

interface ErrorHintProps {
	message: string;
	reloadHandler: () => void;
}

const ErrorHint: React.FC<ErrorHintProps> = ({ message, reloadHandler }) => {
	return (
		<div className="flex items-center justify-between bg-red-100 p-2 rounded-md mb-2">
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
