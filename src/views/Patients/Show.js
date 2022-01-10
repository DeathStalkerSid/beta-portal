import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import DetailsForm from './DetailsForm';
import { Fragment, useEffect } from 'react';
import { deletePatient, editPatient } from '../../actions/patient.action';

const Show = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { Title } = Typography;

	const { id } = useParams();

	const patient = (useSelector(({ patient }) => patient.patients.filter((patient) => patient.id === id)))[0];

	useEffect(() => {
		if (!patient) {
			navigate('/doctor/patients');
		}
	}, [navigate, patient]);

	const patientEdit = (data) => dispatch(editPatient({ id, data }));

	const deletePatientHandler = () => dispatch(deletePatient({ id }));

	if (patient) {
		return <Fragment>
			<Title>
				Patient Details: <span style={ { color: 'blue' } }>{ patient.name }</span>
			</Title>

			<DetailsForm onFinish={ patientEdit } patientData={ patient } deleteHandler={ deletePatientHandler } />
		</Fragment>;
	} else {
		return <Fragment />;
	}
};

export default Show;