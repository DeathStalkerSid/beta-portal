import { Button, Form, Input, message, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CONSTANTS } from '../../constants';
import { Fragment } from 'react';
import { editProfile } from '../../actions/authentication.action';

const Edit = () => {
	const { Title } = Typography;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const id = useSelector(({ auth }) => auth.userId);

	const onFinish = ({ password, password_confirm }) => {
		if (password !== password_confirm) {
			message.error('Passwords do not match!');
		} else {
			dispatch(editProfile(id, { password }))
				.then(() => navigate('/patient/profile'));
		}
	};

	return <Fragment>
		<Title style={ { marginLeft: '7rem' } }>Edit</Title>

		<Form
			name="patient-profile-edit-form"
			labelCol={ {
				span: 7,
			} }
			wrapperCol={ {
				span: 16,
			} }
			onFinish={ onFinish }
			autoComplete="off"
			style={ { maxWidth: '600px', margin: '0 auto' } }
			validateTrigger={ 'onBlur' }
			role={ 'form' }
		>
			<Form.Item
				label="Password"
				name="password"
				rules={ [
					{
						required: true,
						message: 'Please enter your password!',
					},
					{
						min: 8,
						message: 'Password must be at least 8 characters long!',
					},
					{
						pattern: CONSTANTS.passwordRegex,
						message: 'Password must have at least 1 UPPERCASE and 1 lowercase character!'
					}
				] }
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				label="Confirm Password"
				name="password_confirm"
				rules={ [
					{
						required: true,
						message: 'Please confirm your password!',
					}
				] }
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				wrapperCol={ {
					span: 24,
					offset: 5
				} }
			>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	</Fragment>;
};

export default Edit;