import { useEffect, useContext, useState } from "react";
import * as C from "./style";
import { RiDeviceRecoverLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../contextapi/global.context";
import { Loading } from "../../components/loading";
import { Spinner } from "../../components/spinner";
import { Error } from "../../components/error";
import { useNavigate } from "react-router-dom";
import { RecoverSchema } from "@/schemas/recover.schema";
import type { RecoverData } from "@/@types/RecoverData";

export const RecoverPage = () => {
  const { Recover, Verify, isLoading, isGlobalLoading } =
    useContext(AuthContext);

  const [Delay, setDelay] = useState(0);

  useEffect(() => {
    Verify();
  }, []);

  useEffect(() => {
    let interval: any;
    if (Delay > 0) {
      interval = setTimeout(() => {
        setDelay(Delay - 1);
      }, 1000);


    }

    return () => clearInterval(interval);
  }, [Delay]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<RecoverData>({
    resolver: yupResolver(RecoverSchema),
  });

  if (isGlobalLoading) return <Loading />;

  const RecoverPassword = () => {
    if (Delay > 0) return;
    setDelay(30);
    Recover(getValues().email);
  };

  return (
    <C.LoginContainer>
      <C.FormContainer>
        <C.FormHeader>
          <C.SignInIcon>
            <RiDeviceRecoverLine color={"#788BA5"} size={30} />
          </C.SignInIcon>
          <C.FormTitle>Recuperação</C.FormTitle>
          <C.FormDescription>
            Escreva o e-mail da sua conta para que possamos enviar instruções
            sobre como redefinir sua palavra-passe.
          </C.FormDescription>
        </C.FormHeader>
        <C.Form onSubmit={handleSubmit(RecoverPassword)}>
          <C.Label>
            E-mail
            {errors.email && <Error error={"*"} />}
          </C.Label>
          <C.Input
            type="email"
            placeholder="email@gmail.com"
            {...register("email")}
            onFocus={() => (!!watch("email"))}
          />

          <C.Button blocked={Delay > 0}>
            {isLoading ? <Spinner /> : Delay > 0 ? `Reenviar em ${formatNumberToTime(Delay)}` : "Recuperar"}
          </C.Button>
        </C.Form>
        <C.Back>
          <C.BackLink onClick={() => navigate("/login")}>Voltar</C.BackLink>
        </C.Back>
      </C.FormContainer>
    </C.LoginContainer>
  );
};


function formatNumberToTime(number: number) {
  const minutes = number % 60;
  const hours = Math.floor(number / 60);
  
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedHours = hours < 10 ? `0${hours}` : hours;

  return `${formattedHours}:${formattedMinutes}`;
}
