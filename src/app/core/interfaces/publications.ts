import { Users } from './users';

export interface Plublications {
  isFollowed: boolean;
  id: number;
  user: Users;
  content: string;
  image?: string[];
  created_at: string;
}

export interface Posts {
  content: string;
  images: File[];
}
