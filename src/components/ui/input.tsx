import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";

import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLTextAreaElement> {}

const Input = React.forwardRef<HTMLTextAreaElement, InputProps>(
	({ className, value, placeholder, name, id, onChange }, ref) => {
		return (
			<TextareaAutosize
				className={cn(
					"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
					"text-base ring-offset-background file:border-0 file:bg-transparent",
					"file:text-base file:font-medium placeholder:text-muted-foreground",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
					"focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				autoFocus
				minRows={1}
				maxRows={4}
				value={value}
				ref={ref}
				placeholder={placeholder}
				name={name}
				id={id}
				onChange={onChange}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
