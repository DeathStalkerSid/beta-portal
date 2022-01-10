import { CONSTANTS } from '../constants';

export const fetchUserDetailsApi = async ({
											  role,
											  email,
											  password
										  }) => await fetch(`${ CONSTANTS.url }${ role }?email=${ email }&password=${ password }`);