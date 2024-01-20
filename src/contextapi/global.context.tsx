import {
  createContext,
  ReactNode,
  useState,
} from "react";
import { LoginData } from "../@types/LoginData";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { CreateData } from "@/@types/CreateData";
import { User } from "@/@types/User";
import { EditData } from "@/@types/EditData";
import { toast } from "sonner";

interface AuthContextType {
  Login: (data: LoginData) => void;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  Verify: () => void;
  isGlobalLoading: boolean;
  Logout: () => void;
  selected: string;
  setSelected: (value: string) => void;
  createUser: (data: CreateData) => Promise<any>;
  editUser: (old_data: User, data: EditData) => Promise<any>;
  deleteUser: (data: User) => Promise<any>;
  isLoading2: boolean;
}

type ProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const Logout = () => {
  localStorage.removeItem("nsg_token");
  window.location.href = "/";
};

export const AuthProvider = ({ children }: ProviderProps) => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [isLoading2, setLoading2] = useState(false);
  const [isGlobalLoading, setGlobalLoading] = useState(true);
  const [selected, setSelected] = useState("char");

  const Login = async (data: LoginData) => {
    if (isLoading) return;
    setLoading(true);

    api
      .post("/auth/login", {
        username: data.user,
        password: data.password,
      })
      .then((response) => {
        localStorage.setItem("nsg_token", response.data.data.token);
        setLoading(false);
        toast.dismiss();
        navigate("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        if (!error.response)
          return toast("Problemas na autenticação", {
            description:
              "Parece que houve um problema na autenticação, tente novamente mais tarde.",
            duration: 5000,
          });
        toast("Problemas na autenticação", {
          description: error.response.data.message,
          duration: 10000,
        });
      });
  };

  const Verify = async () => {
    let token = localStorage.getItem("nsg_token");
    if (!token) return setGlobalLoading(false);

    api
      .post("/auth/verify")
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        if (!error.response)
          return toast("Problemas na verificação", {
            description:
              "Parece que houve um problema na verificação, tente novamente mais tarde.",
            duration: 15000,
          });
      })
      .finally(() => {
        setGlobalLoading(false);
      });
  };

  const createUser = async (data: CreateData) => {
    return new Promise((resolve, reject) => {
      if (isLoading) return;
      setLoading(true);

      api
        .post("/account/", {
          username: data.username,
          email: data.email,
        })
        .then((response) => {
          toast.dismiss();

          toast("Usuário criado", {
            description:
              "O utilizador " + data.username + " foi criado com sucesso.",
            duration: 5000,
          });

          resolve(response);
        })
        .catch((error) => {
          if (!error.response)
            return toast("Problemas na criação", {
              description:
                "Parece que houve um problema na criação, tente novamente mais tarde.",
              duration: 15000,
            });

          toast("Problemas na criação", {
            description: error.response.data.message,
            duration: 15000,
          });
          reject(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const editUser = async (old_data: User, data: EditData) => {
    return new Promise((resolve, reject) => {
      if (isLoading || isLoading2) return;
      setLoading(true);

      api
        .put("/account/", {
          old_email: old_data.email,
          username: data.username,
          email: data.email,
          avatar: data.avatar,
        })
        .then((response) => {
          toast.dismiss();
          toast("Usuário editado", {
            description:
              "O utilizador " + old_data.username + " foi editado com sucesso.",
            duration: 5000,
          });
          resolve(response);
        })
        .catch((error) => {
          if (!error.response)
            return toast("Problemas na edição", {
              description:
                "Parece que houve um problema na edição, tente novamente mais tarde.",
              duration: 15000,
            });

          toast("Problemas na edição", {
            description: error.response.data.message,
            duration: 15000,
          });
          reject(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const deleteUser = async (data: User) => {
    return new Promise((resolve, reject) => {
      if (isLoading || isLoading2) return;
      setLoading2(true);

      api
        .delete("/account/", {
          data: {
            email: data.email,
          },
        })
        .then((response) => {
          toast.dismiss();
         toast("Usuário deletado", {
            description:
              "O utilizador " + data.username + " foi deletado com sucesso.",
            duration: 5000,
          });
          resolve(response);
        })
        .catch((error) => {
          if (!error.response)
            return toast("Problemas na deleção", {
              description:
                "Parece que houve um problema na deleção, tente novamente mais tarde.",
              duration: 15000,
            });
          toast("Problemas na deleção", {
            description: error.response.data.message,
            duration: 15000,
          });
          reject(error);
        })
        .finally(() => {
          setLoading2(false);
        });
    });
  };

  return (
    <AuthContext.Provider
      value={{
        Login,
        isLoading,
        setLoading,
        Verify,
        isGlobalLoading,
        Logout,
        selected,
        setSelected,
        createUser,
        editUser,
        deleteUser,
        isLoading2,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
