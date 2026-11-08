export const getFormValues = (formData: FormData) =>
  Object.fromEntries([...formData.entries()].filter(([, value]) => value !== ''));
