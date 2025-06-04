export const validateForm = (schema, formData) => {
  const result = schema.safeParse(formData);
  if (!result.success) {
    const fieldErrors = {};
    result.error.errors.forEach((err) => {
      fieldErrors[err.path[0]] = err.message;
    });
    return fieldErrors;
  }
  return {};
};
