import { AxiosError, AxiosInstance } from 'axios';

class RoutineClient {
	routineClient;
	constructor(httpClient: AxiosInstance) {
		this.routineClient = httpClient;
	}
	async getRoutines() {
		try {
			const response = await this.routineClient.get('routines');
			if (response.data.success) {
				return response.data;
			}
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}

	async getRoutinesByDate(date?: string) {
		try {
			const response = await this.routineClient.get('routines/' + date);
			if (response.data.success) {
				return response.data;
			}
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}

	async addRoutine(title: string, content: string, date: string) {
		try {
			const response = await this.routineClient.post('routines', {
				title,
				content,
				date,
			});
			if (response.data.success) {
				return response.data;
			}
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}

	async editRoutine(id: number, title: string, content: string, date: string) {
		try {
			const response = await this.routineClient.patch('routines/' + id, {
				title,
				content,
				date,
			});

			if (response.data.success) {
				return response.data;
			}
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}

	async removeRoutine(id: number) {
		try {
			const response = await this.routineClient.delete('routines/' + id);

			if (response.data.success) {
				return response.data;
			}
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}
}

export default RoutineClient;
