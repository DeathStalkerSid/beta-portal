import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
	isDoctor: false,
	userId: null,
	userData: null
};

const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		login(state, action) {
			state.isAuthenticated = true;
			state.isDoctor = action.payload.isDoctor;
			state.userId = action.payload.userData.id;
			state.userData = action.payload.userData;

			localStorage.setItem('isDoctor', action.payload.isDoctor === true ? '1' : '0');
			localStorage.setItem('authId', action.payload.userData.uuid);
		},
		logout(state) {
			state.isAuthenticated = false;
			state.isDoctor = false;
			state.userId = null;
			state.userData = null;

			localStorage.removeItem('isDoctor');
			localStorage.removeItem('authId');
		},
		setProfile(state, action) {
			state.userData = action.payload.userData;
		}
	}
});

export const authenticationActions = authenticationSlice.actions;

export default authenticationSlice.reducer;