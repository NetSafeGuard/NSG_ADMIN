import * as C from "./style";
import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import MultiSelectFormField from "@/components/ui/multi-select";
import { useForm, Controller } from "react-hook-form";
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DateTimePicker } from "@/components/ui/datetimer-picker";
import { Group } from "@/@types/Group";
import { useContext } from "react";
import { GroupsContext } from "@/contextapi/groups.context";
import { useState } from "react";

export const ActivityPage = () => {

  const [open,setOpen] = useState(false);
  const [createActivity, setCreateActivity] = useState(false);
  const {groups} = useContext(GroupsContext);

  type CreateData = {
    title: string;
    description: string;
    date: Date;
    groups: Group[];
  };

  const DataSchema = yup.object().shape({
    title: yup.string().required("O título é obrigatório"),
    description: yup.string().required("A descrição é obrigatória"),
    date: yup.date().required("A data é obrigatória"),
    groups: yup.array().required("O grupo é obrigatório"),
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateData>({
    resolver: yupResolver(DataSchema),
  });

  const activitys = [
    {
      title: "Formulario 1",
      description: "No dia 30 de Janeiro de 2024, foi lançado o formulário 1",
      date: new Date("2024-01-30"),
    },
  ];

  activitys.sort((a, b) => {
    return b.date.getTime() + a.date.getTime();
  });

  return (
    <C.Container>
      <C.Title>Atividades Avaliativas</C.Title>
      <C.ActivityContainer>
        {activitys.map((activity, index) => (
          <>
            {activity.date.getDate() ===
            activitys[index - 1]?.date.getDate() ? (
              <C.ActivityCard>
                <C.ActivityTitle>{activity.title}</C.ActivityTitle>
                <C.ActivityDescription>
                  {activity.description}
                </C.ActivityDescription>
              </C.ActivityCard>
            ) : (
              <>
                <C.ActivityDate>
                  {activity.date.getDate()}{" "}
                  {activity.date.toLocaleString("default", { month: "short" })}.
                </C.ActivityDate>
                <C.ActivityCard>
                  <C.ActivityTitle>{activity.title}</C.ActivityTitle>
                  <C.ActivityDescription>
                    {activity.description}
                  </C.ActivityDescription>
                </C.ActivityCard>
              </>
            )}
          </>
        ))}
      </C.ActivityContainer>
      <C.ButtonContainer>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <PlusIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-5" side="right">
            <DropdownMenuLabel>Criação de Atividade</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setCreateActivity(true)} className="cursor-pointer">
                <p className="flex items-center text-sm rounded-md hover:bg-accent hover:bg-opacity-10">
                  <span>URL</span>
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Arquivo (WIP)
                <DropdownMenuShortcut>Desativado</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </C.ButtonContainer>
      <Sheet open={createActivity} onOpenChange={setCreateActivity}>
        <SheetContent className="w-[500px] sm:[100%] mt-8">
          <C.ContainerScroll>
            <SheetHeader>
              <SheetTitle>Criar Atividade</SheetTitle>
              <SheetDescription>
                Preencha os campos abaixo para criar uma atividade
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Titulo
                </Label>
                <Input
                  id="name"
                  value="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-left">
                  Descrição
                </Label>
                <Input
                  id="username"
                  value="@peduarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-left">
                  Data de ínicio
                </Label>
                <DateTimePicker/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-left">
                  Data de término
                </Label>
                <DateTimePicker/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4 w-full">
                <Label htmlFor="role" className="text-right flex gap-1">
                  Grupos
                </Label>
                <Controller
                  name="groups"
                  control={control}
                  render={({ field }) => (
                    <MultiSelectFormField
                    className=""
                    options={groups.map((group) => ({
                      label: group.name,
                      value: group.name,
                    }))}
                    onValueChange={field.onChange}
                    placeholder="Selecione os grupos"
                    variant="inverted"
                    style={{ width: "230px" }}
                  />
                  )}
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button 
                style={{ background: "#1b4c70" }}
                type="submit">Criar atividade</Button>
              </SheetClose>
            </SheetFooter>
          </C.ContainerScroll>
        </SheetContent>
      </Sheet>
    </C.Container>
  );
};
