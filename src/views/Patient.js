import { Fragment } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Patient = () => {
	if (localStorage.getItem('isDoctor') === '0' && localStorage.getItem('authId')) {
		return <Fragment>
			<Outlet />
		</Fragment>;
	} else {
		return <Navigate to={ 'login' } />;
	}
};

export default Patient;