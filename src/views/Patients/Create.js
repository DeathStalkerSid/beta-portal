import { Typography } from 'antd';
import DetailsForm from './DetailsForm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { createPatient } from '../../actions/patient.action';

const Create = () => {
	const { Title } = Typography;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const patientCreate = (data) =>
		dispatch(createPatient({ ...data, password: 'healthcare' }))
			.then(() => navigate('/doctor/patients'));

	return <Fragment>
		<Title>Create</Title>

		<DetailsForm onFinish={ patientCreate } patientData={ null } deleteHandler={ null } />
	</Fragment>;
};

export default Create;