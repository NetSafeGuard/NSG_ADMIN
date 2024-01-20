import * as C from "./style";
import { HashLoader } from "react-spinners";
import { useEffect } from "react";
import { toast } from "sonner";

interface LoadingProps {
  text?: string;
}

export const Loading = ({ text }: LoadingProps) => {
  useEffect(() => {
    if (text) {

      toast.error("Problemas de conexão", {
        description:
          "Parece que houve um problema na conexão, tente novamente mais tarde.",
        duration: 15000,
      });

      return () => {
        toast.dismiss();
        toast.success("Conexão Retomada", {
          description:
            "A sua conexão foi retormada, pode ocorrer algum atraso mas logo será normalizado.",
          duration: 5000,
        });
      };
    }
  }, [text]);

  return (
    <C.GlobalLoading>
      <HashLoader color="#48B1A5" size={100} />
    </C.GlobalLoading>
  );
};
