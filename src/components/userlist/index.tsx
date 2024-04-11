import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/contextapi/global.context";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Student,EditData } from "@/@types/Group";

type Props = {
  students: Student[];
};

export const StudentsData = ({ students }: Props) => {
  const [AnimationParent] = useAutoAnimate();
  const [open, setOpen] = useState(false);
  const [editedUser, setEditedUser] = useState<Student | null>(null);

  const DataSchema = yup.object().shape({
    studentid: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().required(),
    routerip: yup.string().required(),
  });

  const Context = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    reset
  } = useForm<EditData>({
    resolver: yupResolver(DataSchema),
  });

  const Edit = (data: EditData) => {
    console.log(data)
  };

  const deleteUser = () => {
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nº de aluno</TableHead>
          <TableHead>Nome de aluno</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Router IP</TableHead>
          <TableHead className="text-right">Editar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody ref={AnimationParent}>
        {students.map((user: Student) => (
          <TableRow key={user.email}>
            <TableCell>{user.studentid}</TableCell>

            <TableCell>
              {user.name}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>193.113.25.13</TableCell>
            <TableCell className="text-right">
              <Dialog open={open && editedUser === user} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    className="text-[#1b4c70] hover:text-[#2D9CDB] focus:outline-none"
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
                    <DialogTitle>Editar Estudante</DialogTitle>
                    <DialogDescription>
                      Clique em editar para salvar as alterações.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(Edit)}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right flex gap-1">
                          Nome
                        </Label>
                        <Input
                          id="name"
                          onFocus={() => (watch("name") ? true : false)}
                          className="col-span-3"
                          {...register("name")}
                          defaultValue={user.name}
                          maxLength={40}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="email"
                          className="text-right flex gap-1"
                        >
                          Email
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
                          htmlFor="studentid"
                          className="text-right flex gap-1"
                        >
                          Nº de aluno
                        </Label>
                        <Input
                          id="studentid"
                          onFocus={() => (watch("studentid") ? true : false)}
                          className="col-span-3"
                          type="text"
                          maxLength={200}
                          defaultValue={user.studentid}
                          {...register("studentid")}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="router" className="text-right flex gap-1">
                          Router IP
                        </Label>
                        <Input 
                          id="router"
                          onFocus={() => (watch("routerip") ? true : false)}
                          className="col-span-3"
                          type="text"
                          maxLength={200}
                          defaultValue={user.routerip}
                          {...register("routerip")}
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
                      <Button type="submit" style={{ background: "#1b4c70" }}>
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
}