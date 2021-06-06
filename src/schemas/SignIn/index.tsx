import { errorsMessage } from 'schemas/Errors/messages';
import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email(errorsMessage.email.isInvalid)
    .required(errorsMessage.email.isRequired),
  password: Yup.string()
    .min(6, errorsMessage.password.lessThanSix)
    .required(errorsMessage.password.isRequired),
});
