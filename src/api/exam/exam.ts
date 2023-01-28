import axiosBase from 'api/axios';
import { AxiosInstance } from 'axios';

export const getAllExamsService = async (axiosPrivate: AxiosInstance) => {
  return (await axiosPrivate.get('/exams')).data;
};

export function getExamDetailService(id: number) {
  return axiosBase.get('/exams/' + id);
}
