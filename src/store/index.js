import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from './authentication-slice';
import patientReducer from './patient-slice';

const store = configureStore({
	reducer: {
		auth: authenticationReducer,
		patient: patientReducer
	}
});

export default store;