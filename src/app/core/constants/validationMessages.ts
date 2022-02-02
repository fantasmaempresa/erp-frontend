export const validationMessages = {
  name: {
    required: 'Name is required.',
  },
  username: {
    required: 'Email is required.',
    email: 'Please provide valid Email',
    pattern: 'Please provide valid Email',
  },
  email: {
    required: 'Email is required.',
    email: 'Please provide valid Email',
    pattern: 'Please provide valid Email',
  },
  password: {
    required: 'Password is required.',
  },
  confirmPassword: {
    required: 'Confirm Password is required.',
    mismatch: 'Password and Confirm Password do not match',
  },
};

export const genericErrorMessages: { [key: string]: any } = {
  required: () => 'This field is required',
  email: () => 'This mail is invalid',
  pattern: () => 'This field does not match the pattern',
  minlength: ({ requiredLength }: any) =>
    `This field requires at least ${requiredLength} characters `,
  maxlength: ({ requiredLength }: any) =>
    `This field has a maximum of ${requiredLength} characters`,
  min: ({ min }: any) => `Min Value ${min}`,
  max: ({ max }: any) => `Max Value ${max}`,
};
