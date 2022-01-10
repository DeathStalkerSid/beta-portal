export const USER_OBJECT = {
	name: 'Hazel Boehm',
	email: 'patient@hotmail.com',
	password: 'Password',
	phone: '411-214-9568',
	address: '0259 Bradtke Common',
	city: 'Buffalo',
	state: 'California',
	pincode: '28317-9496',
	diagnoses: [
		'High BP',
		'Low Sugar',
		'Diabetes'
	],
	prescribedMedication: [
		'Aloe Vera',
		'Paracetamol'
	],
	country: 'Switzerland',
	id: '2'
};

export const PATIENTS_OBJECT = [
	{
		name: 'Hazel Boehm',
		email: 'patient@hotmail.com',
		password: 'Password',
		phone: '411-214-9568',
		address: '0259 Bradtke Common',
		city: 'Buffalo',
		state: 'California',
		pincode: '28317-9496',
		diagnoses: [
			'High BP',
			'Low Sugar',
			'Diabetes'
		],
		prescribedMedication: [
			'Aloe Vera',
			'Paracetamol'
		],
		country: 'Switzerland',
		id: '2',
		key: '2',
		viewId: '2'
	},
	{
		name: 'Hazel Boehm',
		email: 'patient@hotmail.com',
		password: 'Password',
		phone: '411-214-9568',
		address: '0259 Bradtke Common',
		city: 'Buffalo',
		state: 'California',
		pincode: '28317-9496',
		diagnoses: [
			'High BP',
			'Low Sugar',
			'Diabetes'
		],
		prescribedMedication: [
			'Aloe Vera',
			'Paracetamol'
		],
		country: 'Switzerland',
		id: '3',
		key: '3',
		viewId: '3'
	}
];

export const INITIAL_AUTHENTICATION_STATE = {
	isAuthenticated: false,
	isDoctor: false,
	userId: null,
	userData: null
};

export const POST_AUTHENTICATION_STATE = {
	isAuthenticated: true,
	isDoctor: true,
	userId: 1,
	userData: {}
};

export const INITIAL_PATIENT_STATE = {
	patients: []
};

export const POST_PATIENT_STATE = {
	patients: [
		{
			id: 1,
			name: 'John Doe',
		},
		{
			id: 2,
			name: 'Jane Doe',
		}
	]
};

export const TEST_AUTH_ID = '6a809aac-2744-49c2-b5ac-cd351038f5ac';