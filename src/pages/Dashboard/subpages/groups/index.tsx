import * as C from "./style";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "@radix-ui/react-icons";

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
import {useContext} from "react";
import {GroupsContext} from "@/contextapi/groups.context.tsx";


export const GroupsPage = () => {
  const {groups} = useContext(GroupsContext);

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
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <CaretSortIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                João Silva
              </div>
            </CollapsibleContent>
          </Collapsible>
      ))}
      <C.ButtonContainer>
        <DropdownMenu>
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
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Save changes</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </C.ButtonContainer>
    </C.Container>
  );
};
