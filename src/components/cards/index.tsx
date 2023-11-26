import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdEventAvailable } from "react-icons/md";
import CountUp from "react-countup";
import { MdOutlineSecurity } from "react-icons/md";

export const Cards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Eventos Registrados
          </CardTitle>
          <MdEventAvailable className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountUp start={0} end={50} duration={6} />
          </div>
          <p className="text-xs text-muted-foreground">
            +20.1% que o mês passado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Utilizadores</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountUp start={0} end={3000} duration={4} />
          </div>
          <p className="text-xs text-muted-foreground">
            <CountUp start={0} end={5} duration={6} /> novos utilizadores este
            mês
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Entradas nos exames
          </CardTitle>
          <MdOutlineSecurity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountUp start={0} end={30000} duration={3} />
          </div>
          <p className="text-xs text-muted-foreground">
            +<CountUp start={0} end={50} duration={3} /> este mês
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Detecções Inseguras
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountUp start={0} end={573} duration={3} />
          </div>
          <p className="text-xs text-muted-foreground">Desde o inicio do ano</p>
        </CardContent>
      </Card>
    </div>
  );
};
