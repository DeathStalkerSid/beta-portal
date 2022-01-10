import { Button, Form, Input, Radio, Typography } from 'antd';
import { Fragment } from 'react';
import { fetchUserDetails } from '../actions/authentication.action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const { Title } = Typography;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onFinish = (data) => dispatch(fetchUserDetails(data)).then((response) => response && navigate('/'));

	return <Fragment>
		<Title style={ { textAlign: 'center' } }>{ 'Login' }</Title>

		<Form
			name="login-form"
			labelCol={ {
				span: 5,
			} }
			wrapperCol={ {
				span: 16,
			} }
			initialValues={ {
				role: 'doctors',
			} }
			onFinish={ onFinish }
			autoComplete="off"
			style={ { maxWidth: '600px', margin: '0 auto' } }
			validateTrigger={ 'onBlur' }
		>
			<Form.Item
				label="Role"
				name="role"
				id="role"
				rules={
					[
						{
							required: true,
							message: 'Please select a role!',
						}
					]
				}>
				<Radio.Group>
					<Radio value={ 'doctors' }>Doctor</Radio>
					<Radio value={ 'patients' }>Patient</Radio>
				</Radio.Group>
			</Form.Item>

			<Form.Item
				label="Email"
				name="email"
				id={ 'email' }
				rules={ [
					{
						required: true,
						message: 'Please enter your email!',
					},
					{
						type: 'email',
						message: 'Should be a valid email!'
					}
				] }
				role={ 'form' }
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				id={ 'password' }
				rules={ [
					{
						required: true,
						message: 'Please enter your password!',
					}
				] }
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				wrapperCol={ {
					span: 24,
				} }
			>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	</Fragment>;
};

export default Login;