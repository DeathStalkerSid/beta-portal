import { CONSTANTS } from '../constants';

export const fetchPatientDetailsApi = async () => await fetch(`${ CONSTANTS.url }patients`);

export const createPatientApi = async (data) => await fetch(`${ CONSTANTS.url }patients`, {
	method: 'POST',
	body: JSON.stringify(data),
	headers: {
		'Content-Type': 'application/json'
	}
});

export const editPatientApi = async (id, data) => await fetch(`${ CONSTANTS.url }patients/${ id }`, {
	method: 'PUT',
	body: JSON.stringify(data),
	headers: {
		'Content-Type': 'application/json'
	}
});

export const deletePatientApi = async (id) => await fetch(`${ CONSTANTS.url }patients/${ id }`, {
	method: 'DELETE',
});