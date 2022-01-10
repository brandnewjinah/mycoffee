import { BeanErrors, NoteErrors } from "../interfaces/interface";

export const beanValidate = (obj: BeanErrors) => {
  const errors: BeanErrors = {};
  if (obj.roaster === "") errors.roaster = "Roaster is required";
  if (obj.name === "") errors.name = "Name is required";

  return Object.keys(errors).length === 0 ? null : errors;
};

export const noteValidate = (obj: NoteErrors) => {
  const errors: NoteErrors = {};
  if (obj.roastDate === "") errors.roastDate = "Roast Date is required";
  if (obj.dose === "") errors.dose = "Dose is required";
  if (obj.grind === "") errors.grind = "Grind size is required";
  if (obj.time === "") errors.time = "Brew time is required";
  if (obj.shot === "") errors.shot = "shot is required";

  return Object.keys(errors).length === 0 ? null : errors;
};
