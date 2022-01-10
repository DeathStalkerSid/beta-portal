import { CONSTANTS } from '../constants';

export const fetchUserDetailsApi = async ({
											  role,
											  email,
											  password
										  }) => await fetch(`${ CONSTANTS.url }${ role }?email=${ email }&password=${ password }`);

export const refreshUserDetailsApi = async ({
												role,
												authId
											}) => await fetch(`${ CONSTANTS.url }${ role }?uuid=${ authId }`);

export const editProfileApi = async (id, data) => await fetch(`${ CONSTANTS.url }patients/${ id }`, {
	method: 'PUT',
	body: JSON.stringify(data),
	headers: {
		'Content-Type': 'application/json'
	}
});