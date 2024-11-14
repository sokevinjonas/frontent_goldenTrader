export interface Users {
  id: number;
  email: string;
  name: string;
  bio?: string;
  role: string;
  avatar?: string;
  created_at: string;
  isFollowed?: boolean; // Ajout de isFollowed
}
