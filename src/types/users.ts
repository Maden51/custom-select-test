export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  job?: string;
}

export type UserMeta = {
  from: number; 
  to: number;
  total: number;
}

export default interface UserData {
  data: User[];
  meta: UserMeta;
}