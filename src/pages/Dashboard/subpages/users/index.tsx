import * as C from "./style";
import { IoAddCircleOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Error } from "@/components/error";
import { useState, useRef } from "react";
import { TableData } from "@/components/table";
import { InfoHook } from "@/services/hooks/InfoHook";
import { User } from "@/@types/User";

type Users = User[];

export const UsersPage = () => {
  const { users, isLoading, error } = InfoHook();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const [open, setOpen] = useState(false);
  const [userdata, setUser] = useState<Users>(users);

  const DataSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
  });

  interface FormData {
    name: string;
    email: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(DataSchema),
  });

  const Create = (data: FormData) => {
    setOpen(false);
    reset();
    

  };

  const searchref = useRef<HTMLInputElement>(null);

  const Search = () => {
    const value = searchref.current?.value;
    if (!value || value == "") setUser(users);
    setUser(
      users.filter(
        (user: User) =>
          user.username.toLowerCase().includes(value?.toLowerCase()!) ||
          user.email.toLowerCase().includes(value?.toLowerCase()!)
      )
    );
  };

  return (
    <C.Container>
      <C.Title>Utilizadores</C.Title>
      <C.Buttons className="mb-3">
        <C.Input
          type="text"
          placeholder="Pesquisar utilizadores..."
          onChange={Search}
          ref={searchref}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="w-40 gap-1 inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs h-8 border-dashed sm:w-28">
              <IoAddCircleOutline size={16} />
              Add
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Utilizador</DialogTitle>
              <DialogDescription>
                Adicione um utilizador à equipa. Clique em adicionar para salvar
                as alterações.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(Create)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right flex gap-1">
                    Nome
                    {errors.name && <Error error={"*"} />}
                  </Label>
                  <Input
                    id="name"
                    onFocus={() => (watch("name") ? true : false)}
                    className="col-span-3"
                    {...register("name")}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right flex gap-1">
                    Email
                    {errors.email && <Error error={"*"} />}
                  </Label>
                  <Input
                    id="email"
                    onFocus={() => (watch("email") ? true : false)}
                    className="col-span-3"
                    type="email"
                    {...register("email")}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" style={{ background: "#17B4BB" }}>
                  Adicionar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </C.Buttons>
      <C.TableContainer>
        <TableData users={userdata} />
      </C.TableContainer>
    </C.Container>
  );
};
