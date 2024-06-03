// const DataSchema = yup.object().shape({
//     title: yup.string().required(),
//     description: yup.string().required(),
//     startdate: yup.date().required(),
//     enddate: yup.date().required(),
//     groups: yup.array().of(yup.string()),
//   });


export interface Activity {
    title: string;
    description: string;
    startdate: Date;
    enddate: Date;
    groups: string[];
}