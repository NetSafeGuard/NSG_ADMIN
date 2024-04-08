import { createContext, useState } from "react";
import { Group } from "@/@types/Group";
import { api } from "@/services/api";
import { toast } from "sonner";

interface GroupsContextType {
  groups: Group[];
  setGroups: (value: Group[]) => void;
  Create: (data: Group) => Promise<any>
  Del: (data: Group) => Promise<any>
  isLoading: boolean;
}

export const GroupsContext = createContext({} as GroupsContextType);

export const GroupsProvider = ({ children }: any) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setLoading] = useState(false);

  const Create = async (data: Group) => {
    return new Promise((resolve, reject) => {
      if (isLoading) return;
      setLoading(true);

      api
        .post("/group/", {
          name: data.name,
        })
        .then((response) => {
          toast.dismiss();

          toast.success("Grupo criado", {
            description:
              "O grupo " + data.name + " foi criado com sucesso.",
            duration: 2000,
          });

          resolve(response);
        })
        .catch((error) => {
          if (!error.response)
            return toast("Problemas na criação", {
              description:
                "Parece que houve um problema na criação, tente novamente mais tarde.",
              duration: 2000,
            });

          toast("Problemas na criação", {
            description:
              error.response.data.message.length > 0
                ? error.response.data.message
                : "Contacte um administrador",
            duration: 5000,
          });
          reject(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }

  const Del = async (data: Group) => {
    return new Promise((resolve, reject) => {
      if (isLoading) return;
      setLoading(true);

      api
        .delete("/group/", {
          data: {
            name: data.name,
          },
        })
        .then((response) => {
          toast.dismiss();
          toast.info("Grupo apagado", {
            description:
              "O Grupo " + data.name + " foi apagado com sucesso.",
            duration: 2000,
          });
          resolve(response);
        })
        .catch((error) => {
          if (!error.response)
            return toast("Problemas ao apagar", {
              description:
                "Parece que houve um problema ao apagar, tente novamente mais tarde.",
              duration: 5000,
            });
          toast("Problemas ao aapagar", {
            description:
              error.response.data.message.length > 0
                ? error.response.data.message
                : "Contacte um administrador",
            duration: 5000,
          });
          reject(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <GroupsContext.Provider value={{ groups, setGroups, Create, isLoading, Del }}>
      {children}
    </GroupsContext.Provider>
  );
};
