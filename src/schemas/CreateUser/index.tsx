import { errorsMessage } from 'schemas/Errors/messages';
import * as Yup from 'yup';

export const CreateUserSchema = Yup.object().shape({
  fullName: Yup.string().required(errorsMessage.name.isRequired),
  email: Yup.string()
    .email(errorsMessage.email.isInvalid)
    .required(errorsMessage.email.isInvalid),
  password: Yup.string()
    .min(6, errorsMessage.password.lessThanSix)
    .required(errorsMessage.password.lessThanSix),
  confirmPassword: Yup.string()
    .min(6, errorsMessage.password.lessThanSix)
    .required(errorsMessage.password.lessThanSix)
    .oneOf([Yup.ref('password'), null], errorsMessage.password.isNotMatch),
});
