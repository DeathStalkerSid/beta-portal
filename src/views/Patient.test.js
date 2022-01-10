import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { createPatient, deletePatient, editPatient, fetchPatientList } from '../actions/patient.action';
import Create from './Patients/Create';
import Show from './Patients/Show';
import { PATIENTS_OBJECT, TEST_AUTH_ID, USER_OBJECT } from '../test-constants';
import Index from './Patients';
import Profile from './Patients/Profile';
import Doctor from './Doctor';
import Patient from './Patient';

describe('patient test suite', () => {
	const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
	const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
	jest.mock('react-dom', () => ({ render: jest.fn() }));
	beforeEach(() => {
		useSelectorMock.mockClear();
		useDispatchMock.mockClear();
		localStorage.clear();
	});

	window.matchMedia = window.matchMedia || function () {
		return {
			matches: false,
			addListener: function () {
			},
			removeListener: function () {
			}
		};
	};

	test('fetch patient list', async () => {
		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: true,
				userId: 1,
				userData: {}
			},
			patient: {
				patients: PATIENTS_OBJECT
			}
		}));
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => PATIENTS_OBJECT
		});

		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<BrowserRouter><Index /></BrowserRouter>);

		const dispatch = jest.fn();
		const thunk = fetchPatientList();
		await thunk(dispatch, () => ({}), undefined);

		const { calls } = dispatch.mock;

		await waitFor(() => expect(typeof calls[0][0].payload.patients).toBe('object'));
	});

	test('fail fetch patient list', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			object: async () => PATIENTS_OBJECT
		});

		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<BrowserRouter><Index /></BrowserRouter>);

		const dispatch = jest.fn();
		const thunk = fetchPatientList();
		await thunk(dispatch, () => ({}), undefined);

		const { calls } = dispatch.mock;

		await waitFor(() => expect(calls).toHaveLength(0));
	});

	test('patient profile page', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => USER_OBJECT
		});

		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: true,
				userId: 1,
				userData: USER_OBJECT
			}
		}));

		const fetchPatientsFn = await jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(fetchPatientsFn);

		render(<BrowserRouter><Profile /></BrowserRouter>);

		const element = await screen.findByText('Name', {});
		expect(element).toBeInTheDocument();
	});

	test('create patient', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => USER_OBJECT
		});

		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<BrowserRouter><Create /></BrowserRouter>);

		const dispatch = jest.fn();
		const thunk = createPatient({
			name: 'Test Patient',
			email: 'test@patient.com',
			phone: '1231231234',
			pincode: '234245'
		});
		await thunk(dispatch, () => ({}), undefined);

		const { calls } = dispatch.mock;

		await waitFor(() => expect(typeof calls[0][0].payload.patient).toBe('object'));
	});

	test('fail create patient', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			object: async () => USER_OBJECT
		});

		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<BrowserRouter><Create /></BrowserRouter>);

		const dispatch = jest.fn();
		const thunk = createPatient({
			name: 'Test Patient',
			email: 'test@patient.com',
			phone: '1231231234',
			pincode: '234245'
		});
		await thunk(dispatch, () => ({}), undefined);

		const { calls } = dispatch.mock;

		await waitFor(() => expect(calls).toHaveLength(0));
	});

	test('edit patient', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => USER_OBJECT
		});

		jest.mock('react-router-dom', () => ({
			...jest.requireActual('react-router-dom'),
			useParams: () => ({
				id: '1'
			}),
		}));

		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: true,
				userId: 1,
				userData: {}
			},
			patient: {
				patients: PATIENTS_OBJECT
			}
		}));

		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<MemoryRouter initialEntries={ ['/doctor/patients/1'] }><Show /></MemoryRouter>);

		const dispatch = jest.fn();
		const thunk = editPatient({
			id: 1,
			data: {
				name: 'Test Patients'
			}
		});
		await thunk(dispatch, () => ({}), undefined);

		const { calls } = dispatch.mock;

		await waitFor(() => expect(typeof calls[0][0].payload.patient).toBe('object'));
	});

	test('fail edit patient', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			object: async () => USER_OBJECT
		});

		jest.mock('react-router-dom', () => ({
			...jest.requireActual('react-router-dom'),
			useParams: () => ({
				id: '1'
			}),
		}));

		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: true,
				userId: 1,
				userData: {}
			},
			patient: {
				patients: PATIENTS_OBJECT
			}
		}));

		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<MemoryRouter initialEntries={ ['/doctor/patients/1'] }><Show /></MemoryRouter>);

		const dispatch = jest.fn();
		const thunk = editPatient({
			id: 1,
			data: {
				name: 'Test Patients 2'
			}
		});
		await thunk(dispatch, () => ({}), undefined);

		const { calls } = dispatch.mock;
		await waitFor(() => expect(calls).toHaveLength(0));
	});

	test('delete patient', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => USER_OBJECT
		});

		jest.mock('react-router-dom', () => ({
			...jest.requireActual('react-router-dom'),
			useParams: () => ({
				id: '1'
			}),
		}));

		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: true,
				userId: 1,
				userData: {}
			},
			patient: {
				patients: PATIENTS_OBJECT
			}
		}));

		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<MemoryRouter initialEntries={ ['/doctor/patients/1'] }><Show /></MemoryRouter>);

		const dispatch = jest.fn();
		const thunk = deletePatient({
			id: 1
		});
		await thunk(dispatch, () => ({}), undefined);

		const { calls } = dispatch.mock;
		await waitFor(() => expect(calls[0][0].payload.id).toEqual(1));
	});

	test('fail delete patient', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			object: async () => PATIENTS_OBJECT
		});

		jest.mock('react-router-dom', () => ({
			...jest.requireActual('react-router-dom'),
			useParams: () => ({
				id: '1'
			}),
		}));

		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: true,
				userId: 1,
				userData: {}
			},
			patient: {
				patients: PATIENTS_OBJECT
			}
		}));

		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<MemoryRouter initialEntries={ ['/doctor/patients/1'] }><Show /></MemoryRouter>);

		const dispatch = jest.fn();
		const thunk = deletePatient({});
		await thunk(dispatch, () => ({}), undefined);

		const { calls } = dispatch.mock;
		await waitFor(() => expect(calls).toHaveLength(0));
	});

	test('doctor outlet passes', async () => {
		localStorage.setItem('isDoctor', '1');
		localStorage.setItem('authId', TEST_AUTH_ID);

		render(<BrowserRouter><Doctor /></BrowserRouter>);

		await waitFor(() => expect(window.location.pathname).toEqual('/'));
	});

	test('patient outlet passes', async () => {
		localStorage.setItem('isDoctor', '0');
		localStorage.setItem('authId', TEST_AUTH_ID);

		const fetchPatientList = await jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(fetchPatientList);

		render(<BrowserRouter><Patient /></BrowserRouter>);

		await waitFor(() => expect(window.location.pathname).toEqual('/'));
	});

	test('create patient dispatch', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => USER_OBJECT
		});

		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: true,
				userId: 1,
				userData: {}
			},
			patient: {
				patients: PATIENTS_OBJECT
			}
		}));

		const createPatientFn = await jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(createPatientFn);

		render(<BrowserRouter><Create /></BrowserRouter>);

		const nameInputEl = await screen.findByRole('textbox', { name: 'Full Name' });
		fireEvent.change(nameInputEl, { target: { value: 'Test Patients' } });

		const emailInputEl = await screen.findByRole('textbox', { name: 'Email' });
		fireEvent.change(emailInputEl, { target: { value: 'test_patient@hotmail.com' } });

		const phoneInputEl = await screen.findByRole('textbox', { name: 'Phone' });
		fireEvent.change(phoneInputEl, { target: { value: 1234567890 } });

		const pinCodeInputEl = await screen.findByRole('textbox', { name: 'Pin Code' });
		fireEvent.change(pinCodeInputEl, { target: { value: 123456 } });

		const diagnosesInputEl = await screen.findByRole('combobox', { name: 'Diagnoses' });
		fireEvent.select(diagnosesInputEl, { target: { value: ['High BP', 'Low BP'] } });

		const prescribedMedicationEl = await screen.findByRole('combobox', { name: 'Prescribed Medication' });
		fireEvent.select(prescribedMedicationEl, { target: { value: ['Aloe Vera'] } });

		const form = await screen.findByRole('form', {});
		fireEvent.submit(form);

		const dispatch = jest.fn();
		const thunk = createPatient({
			name: 'Test Patient',
			email: 'test_patient@hotmail.com',
			phone: 1234567890,
			pincode: 123456,
			diagnoses: ['High BP'],
			prescribedMedication: ['Aloe Vera']
		});
		await thunk(dispatch, () => (
			{
				isAuthenticated: true,
				isDoctor: true,
				userId: '1',
				userData: {}
			}
		), undefined);

		const { calls } = dispatch.mock;
		await waitFor(() => expect(calls[0][0].payload.patient).toBe(USER_OBJECT));
	});

	test('create patient invalid data length', async () => {
		render(<BrowserRouter><Create /></BrowserRouter>);

		const phoneInputEl = await screen.findByRole('textbox', { name: 'Phone' });
		fireEvent.change(phoneInputEl, { target: { value: 123456789 } });

		const pinCodeInputEl = await screen.findByRole('textbox', { name: 'Pin Code' });
		fireEvent.change(pinCodeInputEl, { target: { value: 12345 } });

		const form = await screen.findByRole('form', {});
		fireEvent.submit(form);
	});

	test('create patient invalid data type', async () => {
		render(<BrowserRouter><Create /></BrowserRouter>);

		const phoneInputEl = await screen.findByRole('textbox', { name: 'Phone' });
		fireEvent.change(phoneInputEl, { target: { value: 'abcd' } });

		const pinCodeInputEl = await screen.findByRole('textbox', { name: 'Pin Code' });
		fireEvent.change(pinCodeInputEl, { target: { value: 'abcd' } });

		const form = await screen.findByRole('form', {});
		fireEvent.submit(form);
	});

	test('render patient show from doctor', async () => {
		jest.mock('react-router-dom', () => ({
			...jest.requireActual('react-router-dom'),
			useParams: () => ({
				id: '2'
			}),
		}));

		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: true,
				userId: 1,
				userData: {}
			},
			patient: {
				patients: PATIENTS_OBJECT
			}
		}));

		render(<MemoryRouter initialEntries={ ['/doctor/patients/2'] }><Show /></MemoryRouter>);
		await waitFor(() => expect(window.location.pathname).toEqual('/doctor/patients'));
	});
});