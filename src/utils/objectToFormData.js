export const objectToFormData = (object) => {
  const formData = new FormData();
  for (const key in object) {
    if (object.hasOwnProperty(key) && object[key] !== null) {
      formData.append(key, object[key]);
    }
  }
  return formData;
};
