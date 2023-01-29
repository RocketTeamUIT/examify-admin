export interface IUser {
  id?: number;
  mail: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone_number: string;
  avt: string;
  banner: string;
  description: string;
  accumulated_point: number;
  rank_point: number;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export const initialUser: IUser = {
  id: -1,
  mail: '',
  first_name: '',
  last_name: '',
  date_of_birth: '',
  phone_number: '',
  avt: '',
  banner: '',
  description: '',
  accumulated_point: 0,
  rank_point: 0,
  created_at: '',
  updated_at: '',
  user_id: -1,
};
