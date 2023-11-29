import * as C from "./style";
import { Cards } from "@/components/cards";
import { InfoHook } from "@/services/hooks/InfoHook";

export const EstatisticasPage = () => {
  return (
    <C.Container>
      <C.Title>Estatísticas</C.Title>
      <Cards />
    </C.Container>
  );
};
