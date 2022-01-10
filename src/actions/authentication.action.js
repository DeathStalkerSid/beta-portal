import { editProfileApi, fetchUserDetailsApi, refreshUserDetailsApi } from '../api/authentication.api';
import { authenticationActions } from '../store/authentication-slice';
import { message } from 'antd';
import { history } from '../constants';

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

export const refreshUserDetails = (payload) => async (dispatch) => {
	try {
		const response = await refreshUserDetailsApi(payload);

		const data = await response.json();

		if (data.length) {
			dispatch(authenticationActions.login({
				isDoctor: payload.role === 'doctors',
				userData: data.find((item, index) => index === 0)
			}));
		} else {
			dispatch(authenticationActions.logout({}));
			history.replace('/');
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

export const editProfile = (id, data) => async (dispatch) => {
	try {
		const response = await editProfileApi(id, data);

		const userData = await response.json();

		if (typeof userData === 'object') {
			dispatch(authenticationActions.setProfile({
				userData
			}));

			message.success('Update successful!');
		} else {
			message.error('User not found!');
		}
	} catch (error) {
		message.error('Something went wrong!');
		console.log(`CATCH: ${ error }`);
	}
};