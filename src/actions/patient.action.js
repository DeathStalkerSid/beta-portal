import { createPatientApi, deletePatientApi, editPatientApi, fetchPatientDetailsApi } from '../api/patient.api';
import { message } from 'antd';
import { patientActions } from '../store/patient-slice';

export const fetchPatientList = () => async (dispatch) => {
	try {
		const response = await fetchPatientDetailsApi();

		const patients = await response.json();

		dispatch(patientActions.setPatients({
			patients
		}));
	} catch (error) {
		message.error('Something went wrong!');
		console.log(`CATCH: ${ error }`);
	}
};

export const createPatient = (payload) => async (dispatch) => {
	try {
		const response = await createPatientApi(payload);

		const patient = await response.json();

		dispatch(patientActions.addPatient({
			patient
		}));

		message.success('Patients created successfully!');
	} catch (error) {
		message.error('Something went wrong!');
		console.log(`CATCH: ${ error }`);
	}
};

export const editPatient = ({ id, data }) => async (dispatch) => {
	try {
		const response = await editPatientApi(id, data);

		const patient = await response.json();

		dispatch(patientActions.editPatient({
			patient
		}));

		message.success('Patient updated successfully!');
	} catch (error) {
		message.error('Something went wrong!');
		console.log(`CATCH: ${ error }`);
	}
};

export const deletePatient = ({ id }) => async (dispatch) => {
	try {
		const response = await deletePatientApi(id);

		await response.json();

		dispatch(patientActions.deletePatient({
			id
		}));

		message.success('Patients deleted successfully!');
	} catch (error) {
		message.error('Something went wrong!');
		console.log(`CATCH: ${ error }`);
	}
};