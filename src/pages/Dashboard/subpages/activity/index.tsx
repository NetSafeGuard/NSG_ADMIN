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

export const ActivityPage = () => {
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <PlusIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-5 " side="right">
            <DropdownMenuLabel>Criação de Atividade</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Sheet>
                <SheetTrigger asChild>
                  <p className="flex items-center gap-2 px-2 py-2 text-sm rounded-md cursor-pointer hover:bg-accent hover:bg-opacity-10">
                    <span>URL</span>
                  </p>
                </SheetTrigger>
                <SheetContent className="w-[500px] sm:[100%] mt-8">
                  <SheetHeader>
                    <SheetTitle>Criar Atividade</SheetTitle>
                    <SheetDescription>
                      Preencha os campos abaixo para criar uma atividade
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
              <DropdownMenuItem>
                Arquivo (WIP)
                <DropdownMenuShortcut>Desativado</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </C.ButtonContainer>
    </C.Container>
  );
};
