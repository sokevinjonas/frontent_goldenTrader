import { Users } from './users';

export interface Plublications {
  id: number;
  user: Users;
  content: string;
  image?: [];
  created_at: string;
  isFollowed?: boolean; // Ajout de isFollowed
}
