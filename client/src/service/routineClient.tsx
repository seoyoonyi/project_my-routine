import { message } from 'antd';
import { AxiosError, AxiosInstance } from 'axios';

class RoutineClient {
  routineAxios;
  constructor(httpClient: AxiosInstance) {
    this.routineAxios = httpClient;
  }
  async getRoutines() {
    try {
      const response = await this.routineAxios.get('routines');
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      throw new Error(err.message);
    }
    //   if (err.response) {
    //   console.error(error);
    // }
  }

  async addRoutine(title: string, content: string, date: string) {
    try {
      const response = await this.routineAxios.post('routines', {
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
}

export default RoutineClient;
