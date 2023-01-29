import axiosBase from 'api/axios';

export function getUsersService() {
  return axiosBase.get('/users');
}
