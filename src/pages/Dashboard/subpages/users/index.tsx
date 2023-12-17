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
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Error } from "@/components/error";
import { useState } from "react";

export const UsersPage = () => {
  const [open, setOpen] = useState(false)

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
    setOpen(false)
    reset()
  };

  return (
    <C.Container>
      <C.Title>Utilizadores</C.Title>
      <C.Buttons>
        <C.Input type="text" placeholder="Pesquisar utilizadores..." />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="gap-1  inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs h-8 border-dashed">
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
                <Button type="submit">Adicionar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </C.Buttons>
    </C.Container>
  );
};
