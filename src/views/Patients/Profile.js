import { Button, Descriptions, Tag, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { CONSTANTS } from '../../constants';
import { Link } from 'react-router-dom';
import { authenticationActions } from '../../store/authentication-slice';

const Profile = () => {
	const { Title } = Typography;
	const [userData, setUserData] = useState(null);
	let userId = useSelector(({ auth }) => auth.userData?.id);
	const dispatch = useDispatch();
	useEffect(() => {
		if (userId) {
			fetch(`${ CONSTANTS.url }patients/${ userId }`)
				.then((response) => response.json())
				.then((data) => {
					setUserData({
						name: data.name,
						email: data.email,
						phone: data.phone,
						address: data.address,
						city: data.city,
						state: data.state,
						pincode: data.pincode,
						country: data.country,
						diagnoses: data.diagnoses,
						prescribedMedication: data.prescribedMedication
					});

					dispatch(authenticationActions.setProfile({
						userData: data
					}));
				});
		}
	}, [dispatch, userId]);

	return <Fragment>
		<Title>Profile</Title>
		{ userData &&
			<Descriptions
				bordered
				size={ 'middle' }
				extra={ <Button type="primary"><Link to={ '/patient/profile/edit' }>Edit</Link></Button> }
			>
				<Descriptions.Item label="Name">{ userData.name }</Descriptions.Item>
				<Descriptions.Item label="Email">{ userData.email }</Descriptions.Item>
				<Descriptions.Item label="Phone">{ userData.phone }</Descriptions.Item>
				<Descriptions.Item label="Address">{ userData.address }</Descriptions.Item>
				<Descriptions.Item label="City">{ userData.city }</Descriptions.Item>
				<Descriptions.Item label="State">{ userData.state }</Descriptions.Item>
				<Descriptions.Item label="Pin Code">{ userData.pincode }</Descriptions.Item>
				<Descriptions.Item label="Country">{ userData.country }</Descriptions.Item>
				<br />
				<Descriptions.Item label="Diagnoses">
					{ userData.diagnoses.map((item, index) => <Tag color={ 'red' } key={ index }>{ item }</Tag>) }
				</Descriptions.Item>
				<Descriptions.Item label="Prescribed Medications">
					{ userData.prescribedMedication.map((item, index) => <Tag color={ 'green' }
																			  key={ index }>{ item }</Tag>) }
				</Descriptions.Item>
			</Descriptions> }
	</Fragment>;
};

export default Profile;