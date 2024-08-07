import { ConceptDto } from './Concept.dto';

export interface Formfield<T> {
  id: string;

  value: T | undefined;

  key: string;

  label: string;

  required: boolean;

  validator?: string;

  order: number;

  controlType: string;

  type: string;

  options: { key: string; value: string }[];

  concepts?: ConceptDto[] | null;
}
