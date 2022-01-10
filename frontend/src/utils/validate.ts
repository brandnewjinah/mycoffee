import { BeanErrors } from "../interfaces/interface";

export const validate = (obj: BeanErrors) => {
  const errors: BeanErrors = {};
  if (obj.roaster === "") errors.roaster = "Roaster is required";
  if (obj.name === "") errors.name = "Name is required";

  return Object.keys(errors).length === 0 ? null : errors;
};
