export const validateForm = (schema, formData) => {
  const result = schema.safeParse(formData);
  if (!result.success) {
    const fieldErrors = {};
    result.error.errors.forEach((err) => {
      const path = err.path;
      let current = fieldErrors;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current = current[path[i]];
      }
      current[path[path.length - 1]] = err.message;
    });
    return fieldErrors;
  }
  return {};
};
