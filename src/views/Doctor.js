import { Fragment } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Doctor = () => {
	if (localStorage.getItem('isDoctor') === '1' && localStorage.getItem('authId')) {
		return <Fragment>
			<Outlet />
		</Fragment>;
	} else {
		return <Navigate to={ '/login' } />;
	}
};

export default Doctor;