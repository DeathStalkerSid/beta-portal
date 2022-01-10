import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../App';
import LayoutHeader from './LayoutHeader';
import { clearUserDetails, editProfile, refreshUserDetails } from '../actions/authentication.action';
import Edit from '../views/Patients/Edit';
import { TEST_AUTH_ID, USER_OBJECT } from '../test-constants';

describe('layout test suite', () => {
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

	test('footer renders', async () => {
		render(<MemoryRouter initialEntries={ ['/'] }><App /></MemoryRouter>);

		await waitFor(() => {
			const footerElement = screen.getByRole('contentinfo', { name: '' });
			expect(footerElement).toBeInTheDocument();
		});
	});

	test('successful refresh user login', async () => {
		localStorage.setItem('authId', TEST_AUTH_ID);
		localStorage.setItem('isDoctor', '1');

		const refreshLoginFn = await jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(refreshLoginFn);

		render(<BrowserRouter><LayoutHeader /></BrowserRouter>);

		const dispatch = jest.fn();
		const thunk = refreshUserDetails({
			role: 'doctors',
			authId: TEST_AUTH_ID
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

		await waitFor(() => expect(calls[0][0].payload.isDoctor).toEqual(true));

		await waitFor(() => expect(refreshLoginFn).toHaveBeenCalled());
	});

	test('unsuccessful refresh user login', async () => {
		render(<BrowserRouter><LayoutHeader /></BrowserRouter>);

		localStorage.setItem('authId', 'wrong');
		localStorage.setItem('isDoctor', '1');

		const dispatch = jest.fn();
		const thunk = refreshUserDetails({
			role: 'doctors',
			authId: 'wrong'
		});
		await thunk(dispatch, () => (
			{
				isAuthenticated: false,
				isDoctor: false,
				userId: null,
				userData: null
			}
		), undefined);

		const { calls } = dispatch.mock;

		await waitFor(() => expect(calls[0][0].payload).toMatchObject({}));
	});

	test('invalid data user login refresh', async () => {
		render(<BrowserRouter><LayoutHeader /></BrowserRouter>);

		localStorage.setItem('authId', 'wrong');

		const dispatch = jest.fn();
		const thunk = refreshUserDetails({
			authId: 'wrong'
		});
		await thunk(dispatch, () => (
			{
				isAuthenticated: false,
				isDoctor: false,
				userId: null,
				userData: null
			}
		), undefined);

		const { calls } = dispatch.mock;

		await waitFor(() => expect(calls).toHaveLength(0));
	});

	test('check active link "patients" pathname', async () => {
		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: true,
				userId: 1,
				userData: {}
			}
		}));
		render(<MemoryRouter initialEntries={ ['/doctor/patients'] }><LayoutHeader /></MemoryRouter>);

		await waitFor(() => {
			const menuItemActive = screen.getByRole('menuitem', { name: 'user Patients' });
			expect(menuItemActive).toHaveClass('ant-menu-item-selected');
		});
	});

	test('check active link "login" pathname', async () => {
		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: false,
				isDoctor: false,
				userId: null,
				userData: null
			}
		}));

		render(<MemoryRouter initialEntries={ ['/login'] }><LayoutHeader /></MemoryRouter>);

		await waitFor(() => {
			const menuItemActive = screen.getByRole('menuitem', { name: 'login Login' });
			expect(menuItemActive).toHaveClass('ant-menu-item-selected');
		});
	});

	test('check active link "patient profile" pathname', async () => {
		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: false,
				userId: '1',
				userData: USER_OBJECT
			}
		}));
		render(<MemoryRouter initialEntries={ ['/patient/profile'] }><LayoutHeader /></MemoryRouter>);

		await waitFor(() => {
			const menuItemActive = screen.getByRole('menuitem', { name: 'user Profile' });
			expect(menuItemActive).toHaveClass('ant-menu-item-selected');
		});
	});

	test('check active link "patient profile edit" pathname', async () => {
		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: false,
				userId: '1',
				userData: USER_OBJECT
			}
		}));
		render(<MemoryRouter initialEntries={ ['/patient/profile/edit'] }><LayoutHeader /></MemoryRouter>);

		await waitFor(() => {
			const menuItemActive = screen.getByRole('menuitem', { name: 'user Profile' });
			expect(menuItemActive).toHaveClass('ant-menu-item-selected');
		});
	});

	test('logout click', async () => {
		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: true,
				userId: 1,
				userData: {}
			}
		}));
		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);

		render(<BrowserRouter><LayoutHeader /></BrowserRouter>);

		const logoutBtn = screen.getByRole('menuitem', { name: 'logout Logout' });
		fireEvent.click(logoutBtn);

		const dispatch = jest.fn();
		const thunk = clearUserDetails({});
		await thunk(dispatch, () => (
			{
				isAuthenticated: false,
				isDoctor: false,
				userId: null,
				userData: null
			}
		), undefined);

		const { calls } = dispatch.mock;

		await waitFor(() => expect(calls[0][0].payload).toMatchObject({}));
	});

	test('successful edit user', async () => {
		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: true,
				userId: 1,
				userData: {}
			}
		}));

		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => USER_OBJECT
		});

		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<BrowserRouter><Edit /></BrowserRouter>);

		const passwordInputEl = await screen.findByLabelText('Password', { selector: 'input' });
		fireEvent.change(passwordInputEl, { target: { value: 'Password' } });

		const confirmPasswordInputEl = await screen.findByLabelText('Confirm Password', { selector: 'input' });
		fireEvent.change(confirmPasswordInputEl, { target: { value: 'Password' } });

		const form = await screen.findByRole('form', {});
		fireEvent.submit(form);

		const dispatch = jest.fn();
		const thunk = editProfile(USER_OBJECT.id, { password: 'Password', confirmPassword: 'Password' });
		await thunk(dispatch, () => (
			{
				isAuthenticated: true,
				isDoctor: false,
				userId: USER_OBJECT.id,
				userData: {}
			}
		), undefined);
		const { calls } = dispatch.mock;

		await waitFor(() => expect(calls[0][0].payload.userData.id).toBe(USER_OBJECT.id));
	});

	test('fail non-matching passswords', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => USER_OBJECT
		});

		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<BrowserRouter><Edit /></BrowserRouter>);

		const passwordInputEl = await screen.findByLabelText('Password', { selector: 'input' });
		fireEvent.change(passwordInputEl, { target: { value: 'Password' } });

		const confirmPasswordInputEl = await screen.findByLabelText('Confirm Password', { selector: 'input' });
		fireEvent.change(confirmPasswordInputEl, { target: { value: 'SomethingElse' } });

		const form = await screen.findByRole('form', {});
		fireEvent.submit(form);

		const message = await screen.findByText('Passwords do not match!');

		await waitFor(() => expect(message).toBeInTheDocument());
	});

	test('edit unknown user', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => {
			}
		});

		const dispatch = jest.fn();
		const thunk = editProfile(0, { password: 'Password', confirmPassword: 'Password' });
		await thunk(dispatch, () => (
			{
				isAuthenticated: true,
				isDoctor: false,
				userId: '0',
				userData: {}
			}
		), undefined);

		const { calls } = dispatch.mock;

		await waitFor(() => expect(calls).toHaveLength(0));
	});

	test('fail edit user', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			object: async () => {
			}
		});

		const dispatch = jest.fn();
		const thunk = editProfile(0, { password: 'Password', confirmPassword: 'Password' });
		await thunk(dispatch, () => (
			{
				isAuthenticated: true,
				isDoctor: false,
				userId: '0',
				userData: {}
			}
		), undefined);

		const { calls } = dispatch.mock;

		await waitFor(() => expect(calls).toHaveLength(0));
	});

	test('renders 404', async () => {
		useSelectorMock.mockImplementation((callback) => callback({
			auth: {
				isAuthenticated: true,
				isDoctor: true,
				userId: 1,
				userData: {}
			}
		}));
		render(<MemoryRouter initialEntries={ ['/doctor/create'] }><App /></MemoryRouter>);

		await waitFor(() => {
			const notFoundText = screen.getByText('404', {});
			expect(notFoundText).toBeInTheDocument();
		});
	});
});