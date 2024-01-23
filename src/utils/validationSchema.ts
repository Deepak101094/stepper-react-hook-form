import * as yup from "yup";
export const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required("Name is required")
		.min(3, "Name must be at least 3 characters"),
	dateOfBirth: yup.string().required("Date of Birth is required"),
	sex: yup.string().test({
		name: "required",
		message: "Gender is required",
		test: (value) => value !== undefined && value !== "",
	}),
	mobile: yup
		.string()
		.required("Mobile is required")
		.matches(/^[6-9]\d{9}$/, "Invalid Indian Mobile Number"),
	govtId: yup
		.string()
		.required("Govt Id required")
		.test({
			name: "govtIdValidation",
			message: "Invalid Govt ID",
			test: function (value: any) {
				const govtIdType = this.parent.govtIdType;

				if (govtIdType === "adhar") {
					return /^[2-9]\d{11}$/.test(value);
				} else if (govtIdType === "pan") {
					return /^[a-zA-Z0-9]{10}$/.test(value);
				}

				// Return true if govtIdType is neither 'adhar' nor 'pan'
				return true;
			},
		}),

	address: yup.string(),
	state: yup.string(),
	city: yup.string(),
	country: yup.string(),
	pincode: yup.string(),
});
