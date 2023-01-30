import { INewExam, IUpdateExam } from 'api/exam/examInterface';
import axiosBase from 'api/axios';
import { AxiosInstance } from 'axios';

export const getAllExamsService = async (axiosPrivate: AxiosInstance) => {
  return (await axiosPrivate.get('/exams')).data;
};

export function getExamDetailService(id: number) {
  return axiosBase.get('/exams/' + id);
}

export function getExamSeriesService() {
  return axiosBase.get('/examSeries');
}

export function createExamService(data: INewExam) {
  return axiosBase.post('/exams/create', data);
}

export function updateExamService(data: IUpdateExam) {
  return axiosBase.put('/exams/update/' + data.id, data);
}

export function deleteExamService(id: number) {
  return axiosBase.delete('/exams/delete/' + id);
}
