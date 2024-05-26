import { createContext, useState } from "react";
import { api } from "@/services/api";
import { toast } from "sonner";
import {Activity} from "@/@types/Activity.ts";

interface ActivitiesContextType {
    activities: Activity[];
    setActivities: (value: Activity[]) => void;
    Create: (data: Activity) => Promise<any>
}

export const ActivitiesContext = createContext({} as ActivitiesContextType);

export const ActivitiesProvider = ({ children }: any) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isLoading, setLoading] = useState(false);
    const Create = async (data: Activity) => {
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

    return (
        <ActivitiesContext.Provider value={{
            activities,
            setActivities,
            Create
        }}>
            {children}
        </ActivitiesContext.Provider>
    );
};
