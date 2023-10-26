import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    text: yup.string().required("E-mail obrigatório"),
    password: yup.string().required("Palavra passe obrigatória"),
});