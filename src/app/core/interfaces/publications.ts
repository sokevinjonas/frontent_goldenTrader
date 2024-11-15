import { PostImages } from './postimage';
import { Users } from './users';

export interface Publications {
  isFollowed: boolean;
  id: number;
  user: Users;
  content: string;
  images: string | PostImages[];
  created_at: string;
}

export interface Posts {
  content: string;
  images: File[];
}
