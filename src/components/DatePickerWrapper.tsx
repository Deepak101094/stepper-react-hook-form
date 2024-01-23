import React from "react";
import {
	DatePickerProps,
	DatePicker as MuiDatePicker,
} from "@mui/x-date-pickers/DatePicker";
import { TextField, FormHelperText } from "@mui/material";
import {
	FieldValues,
	FieldPath,
	UseFormRegisterReturn,
	Control,
} from "react-hook-form";

interface DatePickerWrapperProps {
	control: Control<FieldValues>;
	name: FieldPath<FieldValues>;
	label: string;
}

const DatePickerWrapper: React.FC<DatePickerWrapperProps & DatePickerProps> = ({
	control,
	name,
	label,
}) => {
	const {
		field,
		fieldState: { invalid, error },
	} = control.register(name) as UseFormRegisterReturn;

	return (
		<React.Fragment>
			<MuiDatePicker
				value={field.value || null}
				onChange={(date) => {
					control.setValue(name, date?.toISOString() || "");
				}}
				onBlur={field.onBlur}
				renderInput={(props) => <TextField {...props} label={label} />}
			/>
			{invalid && <FormHelperText error>{error?.message}</FormHelperText>}
		</React.Fragment>
	);
};

export default DatePickerWrapper;
