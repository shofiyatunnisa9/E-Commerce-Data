export interface User {
  id: Number | string;
  email: String;
  password?: String;
  name: string;
  role: "customer" | "admin";
}
export interface PackageData {
  id: string;
  name: string;
  price: number;
  quota: string;
  active: string;
}

export interface TransactionData {
  id: string;
  userId: string;
  packageId: string;
  date: string;
  status: string;
}
export interface UserData {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
