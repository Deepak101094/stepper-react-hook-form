import React from "react";
import {
	Container,
	Stepper,
	Step,
	StepLabel,
	Paper,
	Box,
	Grid,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStepForm } from "../hook/useStepForm";
import { validationSchema } from "../utils/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "../store/formSlice";
import type { RootState } from "../store/store";
import { FormValues } from "../utils/formInterface";
import UserDetails from "./UserDetails";
import ReactDataTables from "../components/FormDataTable";
import AddressForm from "./Address";

const STEPS = ["User Details", "Address"];

const initialData: FormValues = {
	name: "",
	dateOfBirth: "",
	sex: "",
	mobile: null,
	govtIdType: "",
	govtId: "",
	address: "",
	state: "",
	city: "",
	country: "",
	pincode: "",
};

const columns = [
	{ data: "name", title: "Name" },
	{ data: "dateOfBirth", title: "dataOfBirth" },
	{ data: "sex", title: "sex" },
	{ data: "mobile", title: "mobile" },
	{ data: "govtIdType", title: "govtIdType" },
	{ data: "govtId", title: "govtId" },
	{ data: "address", title: "address" },
	{ data: "state", title: "state" },
	{ data: "city", title: "city" },
	{ data: "country", title: "country" },
	{ data: "pincode", title: "pincode" },
];

const FormContainer: React.FC = () => {
	const { next, back, currentStep } = useStepForm(STEPS.length);
	const storeData = useSelector((state: RootState) => state.form.formDataList);
	const dispatch = useDispatch();
	console.log(storeData, "STORE DATA");

	const { control, reset, handleSubmit, formState } = useForm<FormValues>({
		defaultValues: initialData,
		resolver: yupResolver(validationSchema) as any,
		mode: "onBlur" || "onChange",
	});

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		dispatch(addFormData(data));
		reset();
	};

	const steps = [
		<UserDetails
			next={next}
			back={back}
			currentStep={currentStep}
			STEPS={STEPS}
			control={control}
			formState={formState}
		/>,
		<AddressForm
			next={next}
			back={back}
			currentStep={currentStep}
			STEPS={STEPS}
			control={control}
			formState={formState}
		/>,
	];

	return (
		<Container>
			<Grid container className='formContainer'>
				<Grid item xs={12} sm={7}></Grid>
				<Paper component={Box} p={2}>
					<Stepper activeStep={currentStep} alternativeLabel>
						{STEPS.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<form onSubmit={handleSubmit(onSubmit)}>{steps[currentStep]}</form>
				</Paper>
				<Paper className='tableContainer'>
					<ReactDataTables data={storeData} columns={columns} />
				</Paper>
			</Grid>
		</Container>
	);
};

export default FormContainer;
