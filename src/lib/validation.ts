export const withInputLengthRules = (
  fieldName: string,
  rules: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
  }
) => {
  return rules;
};
