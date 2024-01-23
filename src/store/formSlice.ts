import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FormValues } from "../utils/formInterface";

interface FormSliceState {
	formDataList: FormValues[];
}

const initialState: FormSliceState = {
	formDataList: [],
};

const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		addFormData: (state, action: PayloadAction<FormValues>) => {
			state.formDataList.push(action.payload);
		},
	},
});

export const { addFormData } = formSlice.actions;
export const selectFormData = (state: any) => state.form.formDataList;
export default formSlice.reducer;
