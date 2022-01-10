import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { fetchUserDetails } from '../actions/authentication.action';

describe('login test suite', () => {
	const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
	const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
	jest.mock('react-dom', () => ({ render: jest.fn() }));
	beforeEach(() => {
		useSelectorMock.mockClear();
		useDispatchMock.mockClear();
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

	test('renders email input on doctor login form', async () => {
		render(<BrowserRouter><Login /></BrowserRouter>);

		await waitFor(async () => {
			const emailElement = await screen.findByRole('textbox', { name: 'Email' });
			expect(emailElement).toBeInTheDocument();
		});
	});

	test('renders password input on doctor login form', async () => {
		render(<BrowserRouter><Login /></BrowserRouter>);

		await waitFor(async () => {
			const passwordElement = await screen.findByLabelText('Password', { selector: 'input' });
			expect(passwordElement).toBeInTheDocument();
		});
	});

	test('successful login', async () => {
		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<BrowserRouter><Login /></BrowserRouter>);

		const emailInputEl = await screen.findByRole('textbox', { name: 'Email' });
		fireEvent.change(emailInputEl, { target: { value: 'doctor@hotmail.com' } });

		const passwordInputEl = await screen.findByLabelText('Password', { selector: 'input' });
		fireEvent.change(passwordInputEl, { target: { value: 'password' } });

		const form = await screen.findByRole('form', {});
		fireEvent.submit(form);

		const dispatch = jest.fn();
		const thunk = fetchUserDetails({
			email: 'doctor@hotmail.com',
			password: 'password',
			role: 'doctors'
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
	});

	test('invalid credentials', async () => {
		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<BrowserRouter><Login /></BrowserRouter>);

		const emailInputEl = await screen.findByRole('textbox', { name: 'Email' });
		fireEvent.change(emailInputEl, { target: { value: 'doctor@hotmail.com' } });

		const passwordInputEl = await screen.findByLabelText('Password', { selector: 'input' });
		fireEvent.change(passwordInputEl, { target: { value: 'password' } });

		const form = await screen.findByRole('form', {});
		fireEvent.submit(form);

		const dispatch = jest.fn();
		const thunk = fetchUserDetails({
			email: 'admin@hotmail.com',
			password: 'wrong',
			role: 'doctors'
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

	test('invalid credentials with correct email', async () => {
		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<BrowserRouter><Login /></BrowserRouter>);

		const emailInputEl = await screen.findByRole('textbox', { name: 'Email' });
		fireEvent.change(emailInputEl, { target: { value: 'doctor@hotmail.com' } });

		const passwordInputEl = await screen.findByLabelText('Password', { selector: 'input' });
		fireEvent.change(passwordInputEl, { target: { value: 'password' } });

		const form = await screen.findByRole('form', {});
		fireEvent.submit(form);

		const dispatch = jest.fn();
		const thunk = fetchUserDetails({
			email: 'doctor@hotmail.com',
			password: 'wrong',
			role: 'doctors'
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

	test('invalid data', async () => {
		const mockDispatch = jest.fn(() => Promise.resolve());
		useDispatchMock.mockReturnValue(mockDispatch);
		render(<BrowserRouter><Login /></BrowserRouter>);

		const emailInputEl = await screen.findByRole('textbox', { name: 'Email' });
		fireEvent.change(emailInputEl, { target: { value: 'doctor@hotmail.com' } });

		const passwordInputEl = await screen.findByLabelText('Password', { selector: 'input' });
		fireEvent.change(passwordInputEl, { target: { value: 'password' } });

		const form = await screen.findByRole('form', {});
		fireEvent.submit(form);

		const dispatch = jest.fn();
		const thunk = fetchUserDetails({
			email: 'admin@hotmail.com',
			password: 'wrong'
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
});
