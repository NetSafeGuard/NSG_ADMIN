import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdEventAvailable } from "react-icons/md";
import CountUp from "react-countup";
import { MdOutlineSecurity } from "react-icons/md";
import { StyledCard } from "./style";
import { UsersContext } from "@/contextapi/users.context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import type { User } from "@/@types/User";
import { useContext } from "react";
import { GroupsContext } from "@/contextapi/groups.context";
import type { Group } from "@/@types/Group";
import { ActivitiesContext } from "@/contextapi/activities.context";

export const Cards = () => {
  const { users, loaded } = useContext(UsersContext);
  const { groups } = useContext(GroupsContext)
  const { activities } = useContext(ActivitiesContext)

  if (!loaded)
    return (
      <SkeletonTheme width={220} height={140}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 flex-row flex-wrap ">
          <Skeleton count={1} />
          <Skeleton count={1} />
          <Skeleton count={1} />
          <Skeleton count={1} />
        </div>
      </SkeletonTheme>
    );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StyledCard>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Atividades Registradas
          </CardTitle>
          <MdEventAvailable className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountUp start={0} end={activities.length} duration={3} />
          </div>
          <p className="text-xs text-muted-foreground">
            {activities.length === 0 ? `
              Nenhuma atividade registrada este mês
            `  
            : 
            <>     
              <span>+</span>       
              <CountUp 
                start={0} 
                end={
                  activities ? activities.filter((activity) => {
                    const activityCreateAt = new Date(activity.createdAt);
                    activityCreateAt.setMonth(activityCreateAt.getMonth() + 1);

                    if (activityCreateAt > new Date()) return true;
                  }).length
                  : 0
                } 
                duration={3} 
              /> 
              <span> nova(s) atividades este mês</span>
            </>
            
          }
          </p>
        </CardContent>
      </StyledCard>
      <StyledCard>
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
            <CountUp start={0} end={users ? users.length : 0} duration={4} />
          </div>
          <p className="text-xs text-muted-foreground">
          {users.length === 0 ? `
              Nenhum novo utilizador este mês
            `  
            : 
            <>     
              <span>+</span>    
              <CountUp
                start={0}
                end={
                  users
                    ? users.filter((user: User) => {
                        const userCreateAt = new Date(user.createdAt);
                        userCreateAt.setMonth(userCreateAt.getMonth() + 1);

                        if (userCreateAt > new Date()) return true;
                      }).length
                    : 0
                }
                duration={6}
              />
              <span> novo(s) utilizadores este mês</span>
            </>
          }
          </p>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Grupos Criados
          </CardTitle>
          <MdOutlineSecurity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <CountUp start={0} end={groups.length} duration={3} />
          </div>
          <p className="text-xs text-muted-foreground">
            {groups.length === 0 ? `
              Nenhum novo grupo este mês
            `  
            : 
            <>     
              <span>+</span>       
              <CountUp 
                start={0} 
                end={
                  groups ? groups.filter((group: Group) => {
                    const groupCreateAt = new Date(group.createdAt);
                    groupCreateAt.setMonth(groupCreateAt.getMonth() + 1);

                    if (groupCreateAt > new Date()) return true;
                  }).length
                  : 0
                } 
                duration={3} 
              /> 
              <span> novo(s) grupos este mês</span>
            </>
            
          }
          </p>
        </CardContent>
      </StyledCard>
      <StyledCard>
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
      </StyledCard>
    </div>
  );
};
