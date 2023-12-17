import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import * as C from "./style";
import { UserHook } from "@/services/hooks/UserHook";
import { AvatarImage } from "@radix-ui/react-avatar";
import { User } from "@/@types/User";
import { useState } from "react";
import classNames from "classnames";

export const SettingsPage = () => {
  const { user } = UserHook() as { user: User };

  return (
    <C.Container>
      <C.Title>Configurações</C.Title>
      
    </C.Container>
  );
};
  