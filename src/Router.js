import { Route, Routes } from 'react-router';
import Doctor from './views/Doctor';
import Login from './components/Login';
import NotFound from './views/NotFound';
import Home from './views/Home';
import Patient from './views/Patient';
import Index from './views/Patients/Index';
import Create from './views/Patients/Create';
import Show from './views/Patients/Show';
import Profile from './views/Patients/Profile';
import Edit from './views/Patients/Edit';

const Router = () => {
	return <Routes>
		<Route path={ '/' } element={ <Home /> } />
		<Route path={ '/login' } element={ <Login /> } />
		<Route path={ 'doctor' } element={ <Doctor /> }>
			<Route path={ 'patients' } element={ <Index /> } />
			<Route path={ 'patients/create' } element={ <Create /> } />
			<Route path={ 'patients/:id' } element={ <Show /> } />
		</Route>
		<Route path={ 'patient' } element={ <Patient /> }>
			<Route path={ 'profile' } element={ <Profile /> } />
			<Route path={ 'profile/edit' } element={ <Edit /> } />
		</Route>
		<Route path={ '*' } element={ <NotFound /> } />
	</Routes>;
};

export default Router;