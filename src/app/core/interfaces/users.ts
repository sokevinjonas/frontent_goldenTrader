export interface Users {
  id: number;
  email: string;
  name: string;
  bio?: string;
  role: string;
  avatar?: string;
  first_connexion?: number;
  created_at: string;
}
