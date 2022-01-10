import authenticationReducer, { authenticationActions } from './authentication-slice';
import patientReducer, { patientActions } from './patient-slice';
import indexReducer from './index';
import {
	INITIAL_AUTHENTICATION_STATE,
	INITIAL_PATIENT_STATE,
	POST_AUTHENTICATION_STATE,
	POST_PATIENT_STATE
} from '../test-constants';

describe('store test suite', () => {
	test('should return the initial state', () => {
		expect(authenticationReducer(undefined, {})).toEqual(INITIAL_AUTHENTICATION_STATE);
	});

	test('should login doctor', () => {
		expect(authenticationReducer(INITIAL_AUTHENTICATION_STATE, authenticationActions.login({
			isAuthenticated: true,
			isDoctor: true,
			userId: 1,
			userData: {
				id: 1,
				name: 'Test Doctor'
			}
		}))).toEqual({
			isAuthenticated: true,
			isDoctor: true,
			userId: 1,
			userData: {
				id: 1,
				name: 'Test Doctor'
			}
		});
	});

	test('should login patient', () => {
		expect(authenticationReducer(INITIAL_AUTHENTICATION_STATE, authenticationActions.login({
			isAuthenticated: true,
			isDoctor: false,
			userId: 1,
			userData: {
				id: 1,
				name: 'Test Patients'
			}
		}))).toEqual({
			isAuthenticated: true,
			isDoctor: false,
			userId: 1,
			userData: {
				id: 1,
				name: 'Test Patients'
			}
		});
	});

	test('should logout doctor/patient', () => {
		expect(authenticationReducer(POST_AUTHENTICATION_STATE, authenticationActions.logout({
			isAuthenticated: false,
			isDoctor: false,
			userId: null,
			userData: null
		}))).toEqual({
			isAuthenticated: false,
			isDoctor: false,
			userId: null,
			userData: null
		});
	});

	test('should set profile data', () => {
		expect(authenticationReducer(POST_AUTHENTICATION_STATE, authenticationActions.setProfile({
			isAuthenticated: true,
			isDoctor: true,
			userId: 1,
			userData: {
				id: 1
			}
		}))).toEqual({
			isAuthenticated: true,
			isDoctor: true,
			userId: 1,
			userData: {
				id: 1
			}
		});
	});
});

describe('patient store', () => {
	test('should set patients data', () => {
		expect(patientReducer(INITIAL_PATIENT_STATE, patientActions.setPatients({
			patients: [
				{
					id: 1,
					name: 'John Doe'
				}
			]
		}))).toEqual({
			patients: [
				{
					id: 1,
					name: 'John Doe',
					key: 1
				}
			]
		});
	});

	test('should edit patients data', () => {
		expect(patientReducer(POST_PATIENT_STATE, patientActions.editPatient({
			patient: {
				id: 1,
				name: 'John Doe Changed',
			}
		}))).toEqual({
			patients: [
				{
					id: 1,
					name: 'John Doe Changed'
				},
				{
					id: 2,
					name: 'Jane Doe'
				}
			]
		});
	});

	test('should delete patient data', () => {
		expect(patientReducer(POST_PATIENT_STATE, patientActions.deletePatient({
			id: 1
		}))).toEqual({
			patients: [
				{
					id: 2,
					name: 'Jane Doe',
				}
			]
		});
	});

	test('should clear patients data', () => {
		expect(patientReducer(POST_PATIENT_STATE, patientActions.clearPatients({}))).toEqual({
			patients: []
		});
	});

	test('should add patients data', () => {
		expect(patientReducer(INITIAL_PATIENT_STATE, patientActions.addPatient({
			patient: {
				id: 1,
				name: 'John Doe'
			}
		}))).toEqual({
			patients: [
				{
					id: 1,
					name: 'John Doe',
					key: 1
				}
			]
		});
	});
});

describe('test index store', () => {
	expect(indexReducer.getState()).toEqual({
		auth: INITIAL_AUTHENTICATION_STATE,
		patient: INITIAL_PATIENT_STATE
	});
});