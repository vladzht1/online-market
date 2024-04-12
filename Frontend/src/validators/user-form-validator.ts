import { User } from "../models/user";
import { ValidationResult } from "../shared/types";

export const MIN_PASSWORD_LENGTH = 8;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const validateUserForm = (user: User): ValidationResult => {
  const errors: any = {};

  if (user.firstName.trim().length === 0) {
    errors.firstName = "Необходимо заполнить имя";
  } else if (user.lastName.trim().length === 0) {
    errors.lastName = "Необходимо заполнить фамилию";
  } else if (user.middleName.trim().length === 0) {
    errors.middleName = "Необходимо заполнить отчество";
  } else if (user.login.trim().length === 0) {
    errors.login = "Необходимо заполнить логин";
  } else if (!EMAIL_REGEX.test(user.email.trim())) {
    errors.email = "Почта введена наверно";
  } else if (user.password.trim().length === MIN_PASSWORD_LENGTH) {
    errors.password = `Пароль должен содержать минимум ${MIN_PASSWORD_LENGTH} символов`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
