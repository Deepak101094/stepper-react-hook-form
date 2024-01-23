import React from "react";
import MUIButton from "@mui/material/Button";

interface ButtonProps {
	label: string;
	color?: "primary" | "secondary" | "success" | "warning";
	variant?: "contained" | "outlined";
	disabled?: boolean;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	size?: "small" | "medium" | "large";
	type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({
	label,
	color,
	variant,
	disabled,
	onClick,
	size,
	type,
}) => {
	return (
		<MUIButton
			color={color ? color : "primary"}
			variant={variant ? variant : "contained"}
			disabled={disabled}
			onClick={onClick}
			size={size}
			type={type ? type : "button"}
		>
			{label}
		</MUIButton>
	);
};

export default Button;
