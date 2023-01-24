export const getErrorToRequiredField = (name: string): string => {
  return `Поле ${name} является обязательным`;
};

export const getErrorToPhoneField = (name: string): string => {
  return `Поле ${name} должно быть в формате 8xxxxxxxxxx`;
};
