import { render, screen, waitFor } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('app test suite', () => {
	const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
	const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

	beforeEach(() => {
		useSelectorMock.mockClear();
		useDispatchMock.mockClear();
	});

	test('renders learn react link', async () => {
		render(<BrowserRouter><App /></BrowserRouter>);

		await waitFor(() => {
			const linkElement = screen.getByText('Welcome to Beta Portal!', {});
			expect(linkElement).toBeInTheDocument();
		});
	});
});
