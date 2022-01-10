import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../logo.jpg';
import { Layout, Menu } from 'antd';
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { patientActions } from '../store/patient-slice';
import { Fragment } from 'react';

import classes from './Layout.module.css';
import { clearUserDetails } from '../actions/authentication.action';

const { Header } = Layout;

const LayoutHeader = () => {
	const dispatch = useDispatch();
	let { pathname } = useLocation();
	const navigate = useNavigate();
	const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
	const isDoctor = useSelector(({ auth }) => auth.isDoctor);

	if (pathname.includes('/doctor/patients')) {
		pathname = '/doctor/patients';
	}

	let activeItem;
	switch (pathname) {
		case '/login':
			activeItem = 'login';
			break;

		case '/doctor/patients':
			activeItem = 'patients';
			break;

		case '/patient/profile':
		case '/patient/profile/edit':
			activeItem = 'patient-profile';
			break;

		default:
			activeItem = null;
	}

	const logoutHandler = () => {
		if (isDoctor) {
			dispatch(patientActions.clearPatients(null));
		}
		dispatch(clearUserDetails({})).then(() => navigate('/'));
	};

	return <Header>
		<Link to={ '/' }>
			<img className={ classes.logo } src={ logo } alt={ 'Logo' } />
		</Link>
		<Menu theme="dark" mode="horizontal" selectedKeys={ [activeItem] } style={ { justifyContent: 'end' } }>
			{ isAuthenticated && isDoctor && <Menu.Item key="patients" icon={ <UserOutlined /> }>
				<Link to={ '/doctor/patients' }>
					Patients
				</Link>
			</Menu.Item> }
			{ isAuthenticated && !isDoctor && <Menu.Item key="patient-profile" icon={ <UserOutlined /> }>
				<Link to={ '/patient/profile' }>
					Profile
				</Link>
			</Menu.Item> }
			{ isAuthenticated &&
				<Menu.Item key="logout" icon={ <LogoutOutlined /> } onClick={ logoutHandler }>
					Logout
				</Menu.Item> }
			{ !isAuthenticated &&
				<Fragment>
					<Menu.Item key="login" icon={ <LoginOutlined /> }>
						<Link to={ '/login' }>
							Login
						</Link>
					</Menu.Item>
				</Fragment> }
		</Menu>
	</Header>;
};

export default LayoutHeader;