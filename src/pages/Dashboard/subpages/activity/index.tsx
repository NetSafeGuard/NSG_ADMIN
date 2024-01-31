import * as C from "./style";

export const ActivityPage = () => {
  const activitys = [
    {
      title: "Formulario 1",
      description: "No dia 30 de Janeiro de 2024, foi lançado o formulário 1",
      date: new Date("2024-01-30"),
    },
    {
      title: "Formulario 2",
      description: "No dia 31 de Janeiro de 2024, foi lançado o formulário 2",
      date: new Date("2024-01-31"),
    },
    {
      title: "Formulario 3",
      description: "No dia 1 de Fevereiro de 2024, foi lançado o formulário 3",
      date: new Date("2024-02-01"),
    },
    {
      title: "Formulario 3",
      description: "No dia 1 de Fevereiro de 2024, foi lançado o formulário 3",
      date: new Date("2024-02-01"),
    },
    {
      title: "Formulario 3",
      description: "No dia 1 de Fevereiro de 2024, foi lançado o formulário 3",
      date: new Date("2024-02-01"),
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
      ...
    </C.Container>
  );
};
