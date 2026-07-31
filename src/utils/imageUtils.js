export const isCustomImageUrl = (value) => {
  return typeof value === "string" && (value.startsWith("blob:") || value.startsWith("data:"));
};

export const readFileAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};
