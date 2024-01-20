import { User } from "@/@types/User";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EditData } from "@/@types/EditData";
import { Error } from "@/components/error";
import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/contextapi/global.context";

type Props = {
  users: User[];
};

export const TableData = ({ users }: Props) => {
  const [open, setOpen] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  const DataSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required(),
    avatar: yup.string().required(),
  });

  const Context = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditData>({
    resolver: yupResolver(DataSchema),
  });

  const Edit = (data: EditData) => {
    Context.editUser(editedUser!, data).then(() => {
      setOpen(false);
      reset();
      const user = users.find((user) => user.email === editedUser?.email);
      if (user) {
        user.username = data.username;
        user.email = data.email;
        user.avatar = data.avatar;
        user.createdAt = new Date().getTime();
      }
    });
  };

  const deleteUser = () => {
    Context.deleteUser(editedUser!).then(() => {
      setOpen(false);
      reset();
      const user = users.find((user) => user.email === editedUser?.email);
      if (user) {
        users.splice(users.indexOf(user), 1);
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Avatar</TableHead>
          <TableHead>Nome de utilizador</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Criado há</TableHead>
          <TableHead className="text-right">Editar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: User) => (
          <TableRow key={user.email}>
            <TableCell>
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>
                  {user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{formatDate(new Date(user.createdAt))}</TableCell>
            <TableCell className="text-right">
              <Dialog open={open && editedUser === user} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    className="text-[#17B4BB] hover:text-[#2D9CDB] focus:outline-none"
                    onClick={() => {
                      setEditedUser(user);
                      setOpen(true);
                      reset();
                    }}
                  >
                    Editar
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Editar Utilizador</DialogTitle>
                    <DialogDescription>
                      Clique em editar para salvar as alterações.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(Edit)}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right flex gap-1">
                          Nome
                          {errors.username && <Error error={"*"} />}
                        </Label>
                        <Input
                          id="name"
                          onFocus={() => (watch("username") ? true : false)}
                          className="col-span-3"
                          {...register("username")}
                          defaultValue={user.username}
                          maxLength={40}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="email"
                          className="text-right flex gap-1"
                        >
                          Email
                          {errors.email && <Error error={"*"} />}
                        </Label>
                        <Input
                          id="email"
                          onFocus={() => (watch("email") ? true : false)}
                          className="col-span-3"
                          type="email"
                          defaultValue={user.email}
                          maxLength={60}
                          {...register("email")}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="avatar"
                          className="text-right flex gap-1"
                        >
                          Avatar
                          {errors.avatar && <Error error={"*"} />}
                        </Label>
                        <Input
                          id="avatar"
                          onFocus={() => (watch("avatar") ? true : false)}
                          className="col-span-3"
                          type="text"
                          maxLength={200}
                          defaultValue={user.avatar}
                          {...register("avatar")}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={() => deleteUser()}
                        type="button"
                        style={{ background: "#f5766f" }}
                      >
                        {Context.isLoading2 ? "A Apagar..." : "Apagar"}
                      </Button>
                      <Button type="submit" style={{ background: "#17B4BB" }}>
                        {Context.isLoading ? "A editar..." : "Editar"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

function formatDate(data: Date): string {
  const now = new Date();

  const seconds = Math.floor((now.getTime() - data.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);

  if (months > 0) {
    return `${months} mês${months === 1 ? "" : "es"} atrás`;
  } else if (weeks > 0) {
    return `${weeks} semana${weeks === 1 ? "" : "s"} atrás`;
  } else if (days > 0) {
    return `${days} dia${days === 1 ? "" : "s"} atrás`;
  } else if (hours > 0) {
    return `${hours} hora${hours === 1 ? "" : "s"} atrás`;
  } else if (minutes > 0) {
    return `${minutes} minuto${minutes === 1 ? "" : "s"} atrás`;
  } else if (seconds > 0) {
    return `${seconds} segundo${seconds === 1 ? "" : "s"} atrás`;
  } else {
    return "agora mesmo";
  }
}
