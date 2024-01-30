import * as C from "./style";
import { Cards } from "@/components/cards";

export const EstatisticasPage = () => {
  return (
    <C.Container>
      <C.Title>Estatísticas</C.Title>
      <C.Scroll>
        <Cards />
      </C.Scroll>

    </C.Container>
  );
};
