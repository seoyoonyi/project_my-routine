import { AxiosError, AxiosInstance } from 'axios';

class UserClient {
	userClient;
	constructor(httpClient: AxiosInstance) {
		this.userClient = httpClient;
	}
	async getUserId(id: number) {
		try {
			const response = await this.userClient.get('users/' + id);
			if (response.data.success) {
				return response.data;
			}
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}

	async signUpUser(name: string, email: string, password: string) {
		try {
			const response = await this.userClient.post('users/signup', {
				name,
				email,
				password,
			});
			if (response.data.success) {
				return response.data;
			}
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}
}

export default UserClient;
