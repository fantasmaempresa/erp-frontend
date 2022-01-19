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
  minlength: (err: any) => `This field requires at least ${err.requiredLength} characters `,
  maxlength: (err: any) => `This field has a maximum of ${err.requiredLength} characters`,
  min: (err: any) => `Min Value ${err.min}`,
  max: (err: any) => `Max Value ${err.max}`,
};
