import { useEffect, useContext } from "react";
import * as C from "./style";
import { RiLoginCircleLine } from "react-icons/ri";
import { LoginSchema } from "../../schemas/login.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginData } from "../../@types/LoginData";
import { AuthContext } from "../../contextapi/global.context";
import { Loading } from "../../components/loading";
import { Spinner } from "../../components/spinner";
import { Error } from "../../components/error";
import { useNavigate } from "react-router-dom";
import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent,
} from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

export const LoginPage = () => {
  const { Login, Verify, isLoading, isGlobalLoading } = useContext(AuthContext);

  const navigate = useNavigate();

  onUpdaterEvent((event) => {
    console.log('Updater event:', event)
  })

  useEffect(() => {
  
      setTimeout(() => {
        Verify();
      }, 3000);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(LoginSchema),
  });

  if (isGlobalLoading) return <Loading />;

  const RecoverPassword = () => {
    navigate("/recover");
  };

  return (
    <C.LoginContainer>
      <C.FormContainer>
        <C.FormHeader>
          <C.SignInIcon>
            <RiLoginCircleLine color={"#788BA5"} size={30} />
          </C.SignInIcon>
          <C.FormTitle>Bem Vindo(a) novamente!</C.FormTitle>
          <C.FormDescription>
            Use os dados fornecidos para entrar
          </C.FormDescription>
        </C.FormHeader>
        <C.Form onSubmit={handleSubmit(Login)}>
          <C.Label>
            Utilizador/E-mail
            {errors.user && <Error error={"*"} />}
          </C.Label>
          <C.Input
            type="text"
            placeholder="email@gmail.com"
            {...register("user")}
            onFocus={() => (watch("user") ? true : false)}
          />

          <C.Label>
            Palavra-Passe
            {errors.password && <Error error={"*"} />}
          </C.Label>
          <C.Input
            type="password"
            placeholder="Palavra-passe"
            {...register("password")}
            onFocus={() => (watch("password") ? true : false)}
          />

          <C.Button>{isLoading ? <Spinner /> : "Entrar"}</C.Button>
        </C.Form>
        <C.RecoverPassword>
          <C.RecoverPasswordLink onClick={RecoverPassword}>
            Esqueceu-se da palavra-passe?
          </C.RecoverPasswordLink>
        </C.RecoverPassword>
      </C.FormContainer>
    </C.LoginContainer>
  );
};
