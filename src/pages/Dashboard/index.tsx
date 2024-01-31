import * as C from "./style";
import { UserHook } from "../../services/hooks/UserHook";
import { Navigate } from "react-router-dom";
import { Loading } from "../../components/loading";
import { SideBar } from "../../components/SideBar";
import { Profile } from "../../components/profile";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contextapi/global.context";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { EstatisticasPage } from "./subpages/statistics";
import { UsersPage } from "./subpages/users";
import { SettingsPage } from "./subpages/settings";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Error } from "@/components/error";
import { toast } from "sonner";
import { ActivityPage } from "./subpages/activity";
import { UsersContext } from "@/contextapi/users.context";
import { socket } from "@/services/socket";
import { User } from "@/@types/User";

export const DashboardPage = () => {
  const { user, isLoading, error } = UserHook();

  const { setUsers, loaded, setLoaded } = useContext(UsersContext);

  useEffect(() => {
    socket.emit("getUsers");
    socket.on("users", (users: User[]) => {
      setUsers(
        users.sort((a, b) => {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return 1;
          return 0;
        })
      );
      if (!loaded) setLoaded(true);
    });

  }, []);

  const Context = useContext(AuthContext);

  const DataSchema = yup.object().shape({
    password: yup.string().required(),
    repeatpassword: yup.string().required(),
  });

  interface FormValues {
    password: string;
    repeatpassword: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(DataSchema),
  });

  const handleChange = (e: FormValues) => {
    if (e.password !== e.repeatpassword)
      return toast.error("Problema na ativação", {
        description: "As palavras-passe não coincidem",
      });

    Context.Active({
      user: user!.email,
      password: e.password,
    }).then(() => {
      user!.activated = false;
    });
  };
  if (isLoading) return <Loading />;

  if (error) return <Loading text={error.message} />;

  if (!user || !user.username) return <Navigate to="/" />;

  return (
    <C.Container>
      {user.activated ? (
        <>
          <SideBar />
          <C.Content>
            {Context.selected !== "settings" && (
              <C.Row>
                <C.ProfileContainer>
                  <Profile />
                </C.ProfileContainer>
              </C.Row>
            )}
            <C.Pages>
              {Context.selected === "char" && <EstatisticasPage />}
              {Context.selected === "users" && <UsersPage />}
              {Context.selected == "settings" && <SettingsPage />}
              {Context.selected == "activity" && <ActivityPage />}
            </C.Pages>
          </C.Content>
        </>
      ) : (
        <Dialog open={true}>
          <DialogContent
            className="sm:max-w-[425px]"
            style={{ zIndex: 99999999999 }}
          >
            <DialogHeader>
              <DialogTitle>Ativação de conta</DialogTitle>
              <DialogDescription>
                Olá {user.username}, para continuar a usar a aplicação, por
                favor altere a sua palavra-passe.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleChange)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right flex gap-1">
                    Senha
                    {errors.password && <Error error={"*"} />}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    onFocus={() => (watch("password") ? true : false)}
                    placeholder="********"
                    className="col-span-3"
                    {...register("password")}
                    maxLength={20}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rsenha" className="text-right flex gap-1">
                    R-Senha
                    {errors.repeatpassword && <Error error={"*"} />}
                  </Label>
                  <Input
                    id="rsenha"
                    onFocus={() => (watch("repeatpassword") ? true : false)}
                    className="col-span-3"
                    type="password"
                    placeholder="********"
                    maxLength={20}
                    {...register("repeatpassword")}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" style={{ background: "#17B4BB" }}>
                  {Context.isLoading ? "A definir..." : "Definir"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </C.Container>
  );
};
