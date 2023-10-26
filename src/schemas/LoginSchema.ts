import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório"),
    password: yup.string().required("Palavra-passe obrigatória").min(2, "Palavra-passe inválida")
});