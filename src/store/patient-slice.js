import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	patients: []
};

const patientSlice = createSlice({
	name: 'patient',
	initialState,
	reducers: {
		setPatients(state, action) {
			state.patients = action.payload.patients.map((patient) => ({...patient, key: patient.id}));
		},
		editPatient(state, action) {
			const editedPatient = action.payload.patient;
			state.patients = state.patients.map((patient) => {
				if (patient.id === editedPatient.id) {
					patient = editedPatient;
				}

				return patient;
			});
		},
		deletePatient(state, action) {
			state.patients = state.patients.filter((patient) => patient.id !== action.payload.id);
		},
		clearPatients(state) {
			state.patients = [];
		},
		addPatient(state, action) {
			const patient = action.payload.patient;
			state.patients.push({
				...patient,
				key: patient.id
			});
		}
	}
});

export const patientActions = patientSlice.actions;

export default patientSlice.reducer;