export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  config: object;
  role_id: number;
}
