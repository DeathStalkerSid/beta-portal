import { fetchUserDetailsApi } from '../api/authentication.api';
import { authenticationActions } from '../store/authentication-slice';
import { message } from 'antd';

export const fetchUserDetails = (payload) => async (dispatch) => {
	try {
		const response = await fetchUserDetailsApi(payload);

		const data = await response.json();

		if (data.length) {
			const userData = data.filter((userData) => userData.email === payload.email && userData.password === payload.password)[0];
			if (userData) {
				dispatch(authenticationActions.login({
					isDoctor: payload.role === 'doctors',
					userData
				}));
			}

			message.success('Login successful!');
		} else {
			message.error('Invalid credentials!');
		}
	} catch (error) {
		message.error('Something went wrong!');
		console.log(`CATCH: ${ error }`);
	}
};

export const clearUserDetails = () => async (dispatch) => {
	try {
		dispatch(authenticationActions.logout({}));

		message.success('Logout successful!');
	} catch (error) {
		message.error('Something went wrong!');
		console.log(`CATCH: ${ error }`);
	}
};