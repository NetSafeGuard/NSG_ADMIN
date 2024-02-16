import * as yup from 'yup';

export const RecoverSchema = yup.object().shape({
    email: yup.string().required("Email obrigatório").email("Email inválido"),
});