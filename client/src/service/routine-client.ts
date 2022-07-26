import { TimeStatus } from './../common/type/type';
import { AxiosError, AxiosInstance } from 'axios';
import { ActiveStatus } from '../common/type/type';

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
			const response = await this.routineClient.get('routines/date/' + date);
			if (response.data.success) {
				return response.data;
			}
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}

	async getRoutinesByDateFromTo(from?: string, to?: string) {
		try {
			const response = await this.routineClient.get('routines/date?from=' + from + '&to=' + to);
			if (response.data.success) {
				return response.data;
			}
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}

	async getRoutinesByCondition(activeStatus?: string, timeStatus?: string) {
		try {
			// condition?active=값&time=값
			const response = await this.routineClient.get(
				'routines/condition?active=' + activeStatus + '&time=' + timeStatus,
			);
			if (response.data.success) {
				return response.data;
			}
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}

	async getRoutinesByConditionTime(timeStatus: string) {
		try {
			const response = await this.routineClient.get('routines/condition?time=' + timeStatus);
			if (response.data.success) {
				return response.data;
			}
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}

	async addRoutine(
		title: string,
		content: string,
		date: string,
		activeStatus: ActiveStatus,
		timeStatus: TimeStatus,
	) {
		try {
			const response = await this.routineClient.post('routines', {
				title,
				content,
				date,
				activeStatus,
				timeStatus,
			});
			if (response.data.success) {
				return response.data;
			}
		} catch (error) {
			const err = error as AxiosError;
			throw new Error(err.message);
		}
	}

	async editRoutine(
		id: number,
		title: string,
		content: string,
		date: string,
		activeStatus: ActiveStatus,
		timeStatus: TimeStatus,
	) {
		try {
			const response = await this.routineClient.patch('routines/' + id, {
				title,
				content,
				date,
				activeStatus,
				timeStatus,
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
