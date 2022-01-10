import { Button, Table, Tag, Typography } from 'antd';
import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientList } from '../../actions/patient.action';

const Index = () => {
	const dispatch = useDispatch();
	const patients = useSelector(({ patient }) => {
		return patient.patients.map((patient, index) => {
			return {
				...patient,
				diagnoses: patient.diagnoses.map((diagnosis, index) => ({
					diagnosis, key: index
				})),
				prescribedMedication: patient.prescribedMedication.map((item, index) => ({
					prescribedMedication: item, key: index
				})),
				key: index
			};
		});
	});

	useEffect(() => dispatch(fetchPatientList()), [dispatch]);

	const { Title } = Typography;

	const columns = [
		{
			title: 'ID',
			key: 'id',
			render: (value, item, index) => index + 1
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			render: (email) => <a href={ `mailto:${ email }` } target={ '_blank' } rel={ 'noreferrer' }>{ email }</a>,
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
			render: (phone) => <a href={ `tel:${ phone }` } target={ '_blank' } rel={ 'noreferrer' }>{ phone }</a>,
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'City',
			dataIndex: 'city',
			key: 'city',
		},
		{
			title: 'State',
			dataIndex: 'state',
			key: 'state',
		},
		{
			title: 'Country',
			dataIndex: 'country',
			key: 'country',
		},
		{
			title: 'Pin Code',
			dataIndex: 'pincode',
			key: 'pincode',
		},
		{
			title: 'Diagnoses',
			dataIndex: 'diagnoses',
			key: 'diagnoses',
			render: (diagnoses) => (
				<Fragment>
					{
						diagnoses.map((diagnosis) => <Tag color={ 'red' } key={ diagnosis.index }>
							{ diagnosis.diagnosis.toUpperCase() }
						</Tag>)
					}
				</Fragment>
			)
		},
		{
			title: 'Prescribed Medication',
			dataIndex: 'prescribedMedication',
			key: 'prescribedMedication',
			render: (prescribedMedication) => (
				<Fragment>
					{
						prescribedMedication.map((item) => <Tag color={ 'green' } key={ item.index }>
							{ item.prescribedMedication.toUpperCase() }
						</Tag>)
					}
				</Fragment>
			)
		},
		{
			title: 'Actions',
			dataIndex: 'id',
			key: 'key',
			render: (id) => <Link to={ `/doctor/patients/${ id }` }>View</Link>
		}
	];

	return <Fragment>
		<Title>Patients</Title>

		<Table columns={ columns } dataSource={ patients } pagination={ false } scroll={ { x: 400 } } bordered />

		<Link to={ '/doctor/patients/create' }>
			<Button type="primary" style={ { marginTop: '3rem' } } size={ 'large' }>Create</Button>
		</Link>
	</Fragment>;
};

export default Index;