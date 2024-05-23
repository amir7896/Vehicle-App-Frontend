import * as yup from "yup";

const authValidation = {
  username: "Username is required",
  email: "Email is required",
  password: "Password is required",
  validEmail: "Provide a valid email",
};

const categoryValidation = {
  name: "Category name is required",
};

// Sign up validation schema
export const signUpValidationSchema = yup.object().shape({
  username: yup.string().required(authValidation.username),
  email: yup
    .string()
    .required(authValidation.email)
    .email(authValidation.validEmail),
});

// Sigin validation scheman
export const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required(authValidation.email)
    .email(authValidation.validEmail),
  password: yup.string().required(authValidation.password),
});

export const categoryValidationSchema = yup.object().shape({
  categoryName: yup.string().required(categoryValidation.name).matches(),
});
