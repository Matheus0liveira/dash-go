import { ErrorsMessage } from 'schemas/Errors/messages';
import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email(ErrorsMessage.email.isInvalid)
    .required(ErrorsMessage.email.isRequired),
  password: Yup.string()
    .min(6, ErrorsMessage.password.lessThanSix)
    .required(ErrorsMessage.password.isRequired),
});
