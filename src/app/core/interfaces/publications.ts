import { Users } from './users';

export interface Plublications {
  isFollowed: boolean;
  id: number;
  user: Users;
  content: string;
  image?: [];
  created_at: string;
}
