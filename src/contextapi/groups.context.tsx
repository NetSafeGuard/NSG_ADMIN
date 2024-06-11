import { createContext, useState } from "react";
import type { Group, EditData, CreateData, CreateGroup } from "@/@types/Group";
import { api } from "@/services/api";
import { toast } from "sonner";

interface GroupsContextType {
  groups: Group[];
  setGroups: (value: Group[]) => void;
  Create: (data: CreateGroup) => Promise<any>;
  Del: (data: Group) => Promise<any>;
  editGroup: (old_name: string, new_name: string) => Promise<any>;
  isLoading: boolean;
  addStudent: (data: CreateData, groupname: string) => Promise<any>;
  Update: (data: EditData[], email: string) => Promise<any>;
  DeleteStudent: (email: string) => Promise<any>;
  isLoading2: boolean;
}

export const GroupsContext = createContext({} as GroupsContextType);

export const GroupsProvider = ({ children }: any) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoading2, setLoading2] = useState(false);

  const Create = async (data: CreateGroup) => {
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
              `O grupo ${data.name} foi criado com sucesso.`,
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
              `O Grupo ${data.name} foi apagado com sucesso.`,
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

  const editGroup = async (old_name: string, new_name: string) => {
    return new Promise((resolve, reject) => {
      if (isLoading) return;
      setLoading(true);

      if(old_name === new_name) return toast("Problemas ao editar", {
        description:
          "O nome do grupo não pode ser igual ao nome antigo.",
        duration: 5000,
      });

      api
        .put("/group/", {
          old_name,
          new_name
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Grupo editado", {
            description:
              `O Grupo ${old_name} foi editado para ${new_name} com sucesso.`,
            duration: 2000,
          });
          resolve(response);
        })
        .catch((error) => {
          if (!error.response)
            return toast("Problemas ao editar", {
              description:
                "Parece que houve um problema ao editar, tente novamente mais tarde.",
              duration: 5000,
            });
          toast("Problemas ao editar", {
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


  const addStudent = async (data: CreateData, groupname: string) => {
    return new Promise((resolve, reject) => {
      if (isLoading) return;
      setLoading(true);

      api
        .post("/group/student", {
          groupname: groupname,
          name: data.name,
          email: data.email,
          studentid: data.studentid,
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Estudante adicionado", {
            description:
              `O estudante ${data.name} foi adicionado com sucesso.`,
            duration: 2000,
          });
          resolve(response);
        })
        .catch((error) => {
          if (!error.response)
            return toast("Problemas ao adicionar", {
              description:
                "Parece que houve um problema ao adicionar, tente novamente mais tarde.",
              duration: 5000,
            });
          toast("Problemas ao adicionar", {
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

  const Update = async (data: EditData[], email: string) => {
    return new Promise((resolve, reject) => {
      if (isLoading) return;
      setLoading(true);

      api
        .put("/group/student", {
          editedInputs: data,
          email
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Estudante adicionado", {
            description:
              `O estudante de email ${email} foi editado com sucesso.`,
            duration: 2000,
          });
          resolve(response);
        })
        .catch((error) => {
          if (!error.response)
            return toast("Problemas ao editar", {
              description:
                "Parece que houve um problema ao editar, tente novamente mais tarde.",
              duration: 5000,
            });
          toast("Problemas ao adicionar", {
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

  const DeleteStudent = async (email: string) => {
    return new Promise((resolve, reject) => {
      if (isLoading2) return;
      setLoading2(true);

      api
        .delete("/group/student", {
          data: {
            email
          }
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Estudante apagado", {
            description:
              `O estudante de email ${email} foi apagado com sucesso.`,
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
          toast("Problemas ao apagar", {
            description:
              error.response.data.message.length > 0
                ? error.response.data.message
                : "Contacte um administrador",
            duration: 5000,
          });
          reject(error);
        }).finally(() => {
          setLoading2(false);
        });
    });
  }

  return (
    <GroupsContext.Provider value={{ groups, setGroups, Create, isLoading, Del, editGroup, addStudent, Update, DeleteStudent, isLoading2 }}>
      {children}
    </GroupsContext.Provider>
  );
};
