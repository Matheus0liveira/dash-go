import { ErrorsMessage } from 'schemas/Errors/messages';
import * as Yup from 'yup';

export const CreateUserSchema = Yup.object().shape({
  fullName: Yup.string().required(ErrorsMessage.name.isRequired),
  email: Yup.string()
    .email(ErrorsMessage.email.isInvalid)
    .required(ErrorsMessage.email.isInvalid),
  password: Yup.string()
    .min(6, ErrorsMessage.password.lessThanSix)
    .required(ErrorsMessage.password.lessThanSix),
  confirmPassword: Yup.string()
    .min(6, ErrorsMessage.password.lessThanSix)
    .required(ErrorsMessage.password.lessThanSix)
    .oneOf([Yup.ref('password'), null], ErrorsMessage.password.isNotMatch),
});
