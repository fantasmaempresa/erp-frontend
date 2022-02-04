export interface Formfield<T> {
  value: T | undefined;

  key: string;

  label: string;

  required: boolean;

  validator: string;

  order: number;

  controlType: string;

  type: string;

  options: { key: string; value: string }[];
}
