import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    user: yup.string().required("Utilizador/Email obrigatório"),
    password: yup.string().required("Palavra-passe obrigatória").min(2, "Palavra-passe inválida")
});