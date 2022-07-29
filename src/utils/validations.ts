type ValidationFunction = (value: string) => RegExpMatchArray | null;

export const fullNameValidator: ValidationFunction = (value: string) =>
  value.trim().match(/^[a-z A-Z ա-ֆ Ա-Ֆ]+$/);
export const phoneNumberValidator: ValidationFunction = (value: string) =>
  value.trim().match(/^[0-9]+$/);
export const emailValidator: ValidationFunction = (value: string) =>
  value
    .trim()
    .match(
      /([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g
    );
