import axiosBase from 'api/axios';
import { ICourse } from './courseInterface';

export const getAllCoursesService = () => {
  return axiosBase.get('/courses');
};

export const getCourseDetailService = (courseId: string, depth = 4) => {
  return axiosBase.get(`/courses/${courseId}`, {
    params: {
      depth,
    },
  });
};

export const getChapterService = (chapterId: string, depth = 3) => {
  return axiosBase.get(`/chapters/${chapterId}`, {
    params: {
      depth,
    },
  });
};

export const searchCourseService = (searchValue: string) => {
  return axiosBase.get(`/courses/search`, {
    params: {
      q: searchValue,
    },
  });
};

export const createNewCourseService = (data: ICourse) => {
  return axiosBase.post('/courses', {
    ...data,
  });
};
