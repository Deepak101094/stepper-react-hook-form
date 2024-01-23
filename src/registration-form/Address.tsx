import React from "react";
import {
	TextField,
	FormControl,
	Box,
	Grid,
	MenuItem,
	MenuList,
} from "@mui/material";
import { Controller, Control, FormState } from "react-hook-form"; // Import Control directly

import { Title } from "../components/Title";
import Button from "../components/Button";
import useCountrySearch from "../hook/useCountriesList";
import { FormValues } from "../utils/formInterface";

interface AddressFormProps {
	control: Control<FormValues>; // Use Control directly
	STEPS: string[];
	next: () => void;
	back: () => void;
	currentStep: number;
	formState: FormState<FormValues>;
}

const states = [
	{ value: "UP", label: "U.P" },
	{ value: "delhi", label: "Delhi" },
	{ value: "other", label: "Other" },
];

const cities = [
	{ value: "delhi", label: "Delhi" },
	{ value: "haryana", label: "Haryana" },
	{ value: "up", label: "UP" },
];

const AddressForm: React.FC<AddressFormProps> = ({
	control,
	STEPS,
	next,
	back,
	currentStep,
}) => {
	const { query, setQuery, countriesList, handleCountrySelection } =
		useCountrySearch();

	return (
		<div style={{ padding: "24px" }}>
			<Box mb={2} mt={2}>
				<Title label='Address' />
			</Box>
			<Grid container spacing={2} style={{ marginTop: "20px" }}>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<Controller
							name='address'
							control={control}
							render={({ field }) => (
								<TextField {...field} label='Address' size='medium' fullWidth />
							)}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={3}>
					<FormControl fullWidth>
						<Controller
							name='state'
							control={control}
							render={({ field }) => (
								<TextField select label='State' fullWidth {...field}>
									{states.map(({ label, value }) => (
										<MenuItem key={label} value={value}>
											{label}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={3}>
					<FormControl fullWidth>
						<Controller
							name='city'
							control={control}
							render={({ field }) => (
								<TextField select label='City' fullWidth {...field}>
									{cities.map(({ label, value }) => (
										<MenuItem key={label} value={value}>
											{label}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<Controller
							name='country'
							control={control}
							render={({ field }) => (
								<TextField
									label='Country'
									fullWidth
									{...field}
									value={query}
									onChange={(e) => {
										field.onChange(e);
										setQuery(e.target.value);
									}}
								/>
							)}
						/>
						{/* Display country suggestions */}
						<MenuList>
							{countriesList.map((country) => (
								<MenuItem
									key={country}
									value={country}
									onClick={() => handleCountrySelection(country)}
								>
									{country}
								</MenuItem>
							))}
						</MenuList>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<Controller
							name='pincode'
							control={control}
							render={({ field }) => <TextField label='Pincode' {...field} />}
						/>
					</FormControl>
				</Grid>
			</Grid>

			<div className='button_wrapper'>
				<Button disabled={currentStep === 0} onClick={back} label='Back' />
				<Button
					label={currentStep === STEPS.length - 1 ? "Submit" : "Next"}
					onClick={next}
					variant='contained'
					color='primary'
					type='submit'
				/>
			</div>
		</div>
	);
};

export default AddressForm;
