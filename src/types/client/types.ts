interface IFormValidate {
  email: boolean;
  password: boolean;
}

interface IFormLoginProps {
  email: string;
  password: string;
}

export type { IFormValidate, IFormLoginProps };
