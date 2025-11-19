export interface User {
  id: Number | string;
  email: String;
  password?: String;
  name: string;
  role: "customer" | "admin";
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
