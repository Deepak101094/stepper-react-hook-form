import React from "react";
import { Typography } from "@mui/material";

interface TitleProps {
	label: string;
	color?: string;
	align?: "inherit" | "left" | "center" | "right" | "justify";
	variant?: "h1" | "h2" | "h3" | "h4";
}

export const Title: React.FC<TitleProps> = ({
	label,
	color,
	align,
	variant,
}) => {
	return (
		<Typography
			color={color ? color : "primary"}
			align={align ? align : "center"}
			variant={variant ? variant : "h5"}
		>
			{label}
		</Typography>
	);
};
