import { createContext, useState } from "react";
import { api } from "@/services/api";
import { toast } from "sonner";

import { Activity } from "@/@types/Activity";

interface ActivitiesContextType {
  activities: Activity[];
  setActivities: (value: Activity[]) => void;
  Create: (data: Activity) => Promise<any>;
  isLoading: boolean;
}

export const ActivitiesContext = createContext({} as ActivitiesContextType);

export const ActivityProvider = ({ children }: any) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setLoading] = useState(false);

  const Create = async (data: Activity) => {
    return new Promise((resolve, reject) => {
        if (isLoading) return;
        setLoading(true); 

        api.post("/activities/", {
            title: data.title,
            description: data.description,
            startdate: data.startdate,
            enddate: data.enddate,
            groups: data.groups,
        })
        .then((response) => {
        toast.dismiss();

        toast.success("Atividade criado", {
            description:
            "A atividade " + data.title + " foi criada com sucesso.",
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

  return (
    <ActivitiesContext.Provider value={{ activities, setActivities, Create, isLoading}}>
      {children}
    </ActivitiesContext.Provider>
  );
};