import React from "react";
import { MenuItem, FormControl, TextField, Box, Grid } from "@mui/material";
import { Controller, Control, FormState } from "react-hook-form"; // Import Control directly
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Button from "../components/Button";
import { Title } from "../components/Title";
import { FormValues } from "../utils/formInterface";

interface UserDetailsProps {
	control: Control<FormValues>; // Use Control directly
	STEPS: string[];
	next: () => void;
	back: () => void;
	currentStep: number;
	formState: FormState<FormValues>;
}

const gender = [
	{
		label: "Male",
		value: "male",
	},
	{
		label: "Female",
		value: "female",
	},
	{
		label: "Other",
		value: "other",
	},
];

const govtIdType = [
	{
		value: "pan",
		label: "PAN",
	},
	{
		value: "adhar",
		label: "Adhar",
	},
];

const UserDetails: React.FC<UserDetailsProps> = ({
	control,
	next,
	back,
	currentStep,
	formState,
}) => {
	const nameError = formState.errors?.name?.message;
	const dobError = formState.errors?.dateOfBirth?.message;
	const sexError = formState.errors?.sex?.message;
	const mobileError = formState.errors?.mobile?.message;
	const govtIdTypeError = formState.errors?.govtIdType?.message;
	const govtIdError = formState.errors?.govtId?.message;

	return (
		<div style={{ padding: "24px" }}>
			<Box mb={2} mt={2}>
				<Title label='User Details' />
			</Box>

			<Grid container spacing={2} style={{ marginTop: "20px" }}>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<Controller
							name='name'
							control={control}
							render={({ field }) => (
								<TextField {...field} label='Name' size='medium' fullWidth />
							)}
						/>
					</FormControl>
					{nameError && <p style={{ color: "red" }}>{nameError}</p>}
				</Grid>
				<Grid item xs={12} sm={4}>
					<FormControl fullWidth>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<Controller
								name='dateOfBirth'
								control={control}
								defaultValue={dayjs().format("YYYY-MM-DD")}
								render={({ field }) => (
									<DatePicker
										{...field}
										label='Date of Birth'
										views={["year", "month", "day"]}
										onChange={(value) =>
											field.onChange(dayjs(value).format("YYYY-MM-DD"))
										}
										value={field.value ? dayjs(field.value) : null}
									/>
								)}
							/>
						</LocalizationProvider>
					</FormControl>
					{dobError && <p style={{ color: "red" }}>{dobError}</p>}
				</Grid>
				<Grid item xs={12} sm={2}>
					<FormControl fullWidth>
						<Controller
							name='sex'
							control={control}
							render={({ field }) => (
								<TextField select label='Gender' fullWidth {...field}>
									{gender.map(({ label, value }) => (
										<MenuItem key={label} value={value}>
											{label}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
					</FormControl>

					{sexError && <p style={{ color: "red" }}>{sexError}</p>}
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<Controller
							name='mobile'
							control={control}
							render={({ field }) => (
								<TextField label='Mobile' type='text' {...field} />
							)}
						/>
					</FormControl>
					{mobileError && <p style={{ color: "red" }}>{mobileError}</p>}
				</Grid>

				<Grid item xs={12} sm={2}>
					<FormControl fullWidth>
						<Controller
							name='govtIdType'
							control={control}
							render={({ field }) => (
								<TextField select label='Govt Issued ID' fullWidth {...field}>
									{govtIdType.map(({ label, value }) => (
										<MenuItem key={label} value={value}>
											{label}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
					</FormControl>
					{govtIdTypeError && <p style={{ color: "red" }}>{govtIdTypeError}</p>}
				</Grid>
				<Grid item xs={12} sm={4}>
					<FormControl fullWidth>
						<Controller
							name='govtId'
							control={control}
							render={({ field }) => (
								<TextField label='Govt Id' type='text' {...field} />
							)}
						/>
					</FormControl>
					{govtIdError && <p style={{ color: "red" }}>{govtIdError}</p>}
				</Grid>
			</Grid>

			<div className='button_wrapper'>
				<Button disabled={currentStep === 0} onClick={back} label='Back' />
				<Button
					label='Next'
					onClick={next}
					variant='contained'
					color='primary'
				/>
			</div>
		</div>
	);
};

export default UserDetails;
