import { createContext, useState } from "react";
import { User } from "@/@types/User";

interface UsersContextType {
  users: User[];
  loaded: boolean;
  setUsers: (value: User[]) => void;
  setLoaded: (value: boolean) => void;
}

export const UsersContext = createContext({} as UsersContextType);

export const UsersProvider = ({ children }: any) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loaded, setLoaded] = useState(false);

  return (
    <UsersContext.Provider value={{ users, loaded, setUsers, setLoaded }}>
      {children}
    </UsersContext.Provider>
  );
};
