import { createContext, useState } from "react";
import { Group } from "@/@types/Group";

interface GroupsContextType {
  groups: Group[];
  setGroups: (value: Group[]) => void;
}

export const GroupsContext = createContext({} as GroupsContextType);

export const GroupsProvider = ({ children }: any) => {
  const [groups, setGroups] = useState<Group[]>([]);

  return (
    <GroupsContext.Provider value={{ groups, setGroups }}>
      {children}
    </GroupsContext.Provider>
  );
};
