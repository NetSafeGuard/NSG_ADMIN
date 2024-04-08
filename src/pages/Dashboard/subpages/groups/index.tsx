import * as C from "./style";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "@radix-ui/react-icons";
import { IoTrashOutline } from "react-icons/io5";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import {useContext, useState} from "react";
import {GroupsContext} from "@/contextapi/groups.context.tsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Group } from "@/@types/Group";


export const GroupsPage = () => {
  const {groups, Create, isLoading, Del} = useContext(GroupsContext);

  const DataSchema = yup.object().shape({
    name: yup.string().required(),
  });

  const CreateGroup = (data: Group) => {
    Create(data).then(() => {
      reset();
    });
  };

  const deleteGroup = (data: Group) => {
    Del(data)
  };
  

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Group>({
    resolver: yupResolver(DataSchema),
  });

  return (
    <C.Container>
      <C.Title>Grupos</C.Title>
      {groups.map((group) => (
          <Collapsible
              className="w-[350px] space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">
                {group.name}
              </h4>
              <div className="flex items-center">

                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <CaretSortIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
                <div className="w-12" onClick={()=> deleteGroup(group)}>
                  <IoTrashOutline size={12} className="cursor-pointer hover:text-red-800"/>
                </div>
              
              </div>
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                João Silva
              </div>
            </CollapsibleContent>
          </Collapsible>
      ))}
      <C.ButtonContainer>
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <PlusIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-5 " side="right">
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
                    <SheetDescription>
                      Preencha os campos abaixo para criar um grupo
                    </SheetDescription>
                  </SheetHeader>
                  <form onSubmit={handleSubmit(CreateGroup)}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Nome
                        </Label>
                        <Input
                          id="name"
                          onFocus={() => (watch("name") ? true : false)}
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
    </C.Container>
  );
};
