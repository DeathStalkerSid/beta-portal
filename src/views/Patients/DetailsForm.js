import { Button, Form, Input, Select } from 'antd';

const DetailsForm = (props) => {
	const { Option } = Select;

	return <Form
		name="patient-edit-form"
		labelCol={ {
			span: 7,
		} }
		wrapperCol={ {
			span: 16,
		} }
		initialValues={ props.patientData }
		onFinish={ props.onFinish }
		autoComplete="off"
		style={ { maxWidth: '600px', margin: '0 auto' } }
		validateTrigger={ 'onBlur' }
		role={ 'form' }
	>
		<Form.Item
			label="Full Name"
			name="name"
			rules={ [
				{
					required: true,
					message: 'Please enter the full name!',
				}
			] }
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Email"
			name="email"
			rules={ [
				{
					required: true,
					message: 'Please enter the email!',
				},
				{
					type: 'email',
					message: 'Should be a valid email!'
				}
			] }
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Phone"
			name="phone"
			rules={ [
				{
					required: true,
					message: 'Please enter the phone!'

				},
				() => ({
					validator(_, value) {
						if (isNaN(value)) {
							return Promise.reject('Phone has to be a number!');
						}
						if (value.length !== 10) {
							return Promise.reject('Phone has to 10 digits long!');
						}
						return Promise.resolve();
					}
				}),
			] }
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Address"
			name="address"
			rules={ [
				{
					type: 'string',
					message: 'Address has invalid characters!',
				}
			] }
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="City"
			name="city"
			rules={ [
				{
					type: 'string',
					message: 'City has invalid characters!',
				}
			] }
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="State"
			name="state"
			rules={ [
				{
					type: 'string',
					message: 'State has invalid characters!',
				}
			] }
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Country"
			name="country"
			rules={ [
				{
					type: 'string',
					message: 'Country has invalid characters!',
				}
			] }
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Pin Code"
			name="pincode"
			rules={ [
				{
					required: true,
					message: 'Please enter the pin code!'
				},
				() => ({
					validator(_, value) {
						if (isNaN(value)) {
							return Promise.reject('Pin Code has to be a number!');
						}
						if (value.length !== 6) {
							return Promise.reject('Pin Code has to 6 digits long!');
						}
						return Promise.resolve();
					}
				}),
			] }
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Diagnoses"
			name="diagnoses"
			rules={ [
				{
					type: 'array',
					message: 'Invalid Data!'
				}
			] }
		>
			<Select
				mode="tags"
				style={ { width: '100%' } }
				placeholder="Select"
				options={ [
					{
						label: 'Diabetes',
						value: 'Diabetes'
					},
					{
						label: 'High BP',
						value: 'High BP'
					}
				] }
			>
				<Option key={ 'High BP' } value={ 'High BP' }>{ 'High BP' }</Option>
				<Option key={ 'Diabetes' } value={ 'Diabetes' }>{ 'Diabetes' }</Option>
			</Select>
		</Form.Item>
		<Form.Item
			label="Prescribed Medication"
			name="prescribedMedication"
			rules={ [
				{
					type: 'array',
					message: 'Invalid Data!'
				}
			] }
		>
			<Select
				mode="tags"
				style={ { width: '100%' } }
				placeholder="Select"
			>
				<Option key={ 'Aloe Vera' } value={ 'Aloe Vera' }>{ 'Aloe Vera' }</Option>
				<Option key={ 'Paracetamol' } value={ 'Paracetamol' }>{ 'Paracetamol' }</Option>
			</Select>
		</Form.Item>
		<Form.Item
			wrapperCol={ {
				span: props.deleteHandler ? 24 : 17,
				offset: props.deleteHandler ? 0 : 7
			} }
		>
			<Button type="primary" htmlType="submit" style={ { marginRight: '10px' } }>
				Submit
			</Button>
			{
				props.deleteHandler && <Button type="primary" htmlType="button" danger onClick={ props.deleteHandler }>
					Delete
				</Button>
			}
		</Form.Item>
	</Form>;
};

export default DetailsForm;