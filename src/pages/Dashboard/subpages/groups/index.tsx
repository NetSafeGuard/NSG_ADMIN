import { useContext, useState } from "react";
import * as C from "./style";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "@radix-ui/react-icons";
import { IoTrashOutline, IoPersonAdd } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GroupsContext } from "@/contextapi/groups.context.tsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { CreateData, CreateGroup, Group, Student } from "@/@types/Group";
import { StudentsData } from "@/components/userlist";
import { UserHook } from "@/services/hooks/UserHook";

export const GroupsPage = () => {
  const { groups, Create, isLoading, Del, addStudent } = useContext(GroupsContext);
  const [open, setOpen] = useState(false);
  const [editedGroupName, setEditedGroupName] = useState<string | null>(null);
  const { user } = UserHook();

  const DataSchema = yup.object().shape({
    name: yup.string().required(),
  });

  const DataSchema2 = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    routerip: yup.string().required(),
    studentid: yup.string().required(),
  });

  const CreateGroup = (data: CreateGroup) => {
    Create(data).then(() => {
      reset();
    });
  };

  const deleteGroup = (data: Group) => {
    Del(data)
  };

  const CreateStudent = (groupname: string) => (data: CreateData) => {
    addStudent(data, groupname).then(() => {
      setOpen(false);
    }).finally(() => reset2());
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm<CreateGroup>({
    resolver: yupResolver(DataSchema),
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    reset: reset2,
  } = useForm<Student>({
    resolver: yupResolver(DataSchema2),
  });

  return (
    <C.Container>
      <C.Title>Grupos</C.Title>
      <C.ActivityContainer>
        {groups.map((group, index) => (
          <Collapsible key={index} className="w-full space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
              <CollapsibleTrigger asChild>
                <h4 className="text-sm font-semibold hover:cursor-pointer">{group.name}</h4>
              </CollapsibleTrigger>
              <div className="flex items-center">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <CaretSortIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
                {user.role === "ADMIN" && (
                  <div className="w-6" onClick={() => deleteGroup(group)}>
                    <IoTrashOutline size={12} className="cursor-pointer hover:text-red-800" />
                  </div>
                )}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => setEditedGroupName(group.name)}>
                      <IoPersonAdd size={12} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Adicionar Estudannte</DialogTitle>
                      <DialogDescription>
                        Adicione um estudante ao grupo. Clique em Criar para salvar as alterações.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit2(CreateStudent(editedGroupName!))}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right flex gap-1">
                            Nome
                          </Label>
                          <Input
                            id="name"
                            onFocus={() => (!!watch2("name"))}
                            className="col-span-3"
                            {...register2("name")}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right flex gap-1">
                            Email
                          </Label>
                          <Input
                            id="email"
                            onFocus={() => (!!watch2("email"))}
                            className="col-span-3"
                            type="email"
                            {...register2("email")}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="routerip" className="text-right flex gap-1">
                            Router IP
                          </Label>
                          <Input
                            id="routerip"
                            onFocus={() => (!!watch2("routerip"))}
                            className="col-span-3"
                            {...register2("routerip")}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="studentid" className="text-right flex gap-1">
                            Student ID
                          </Label>
                          <Input
                            id="studentid"
                            onFocus={() => (!!watch2("studentid"))}
                            className="col-span-3"
                            {...register2("studentid")}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" style={{ background: "#1b4c70" }}>
                          Criar
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <CollapsibleContent className="w-full mx-4">
              <StudentsData students={group.students} />
            </CollapsibleContent>
          </Collapsible>
        ))}
        {user.role === "ADMIN" && (
          <C.ButtonContainer>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <PlusIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-5" side="right">
                <DropdownMenuLabel>Criação de Grupo</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Sheet>
                    <SheetTrigger asChild>
                      <p className="flex items-center gap-2 px-2 py-2 text-sm rounded-md cursor-pointer hover:bg-accent hover:bg-opacity-10">
                        <span>Criar</span>
                      </p>
                    </SheetTrigger>
                    <SheetContent className="w-[500px] sm:[100%] mt-8">
                      <SheetHeader>
                        <SheetTitle>Criar Grupo</SheetTitle>
                        <SheetDescription>Preencha os campos abaixo para criar um grupo</SheetDescription>
                      </SheetHeader>
                      <form onSubmit={handleSubmit(CreateGroup)}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Nome
                            </Label>
                            <Input
                              id="name"
                              onFocus={() => (!!watch("name"))}
                              className="col-span-3"
                              {...register("name")}
                            />
                          </div>
                        </div>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button type="submit" style={{ background: "#1b4c70" }}>
                              {isLoading ? "A criar..." : "Criar"}
                            </Button>
                          </SheetClose>
                        </SheetFooter>
                      </form>
                    </SheetContent>
                  </Sheet>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </C.ButtonContainer>
        )}
      </C.ActivityContainer>
    </C.Container>
  );
};
