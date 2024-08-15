import { FormFieldType, FormOption, formField, viewLabel } from 'o2c_core';

const MODIFICATION = [
  { value: 'AUMENTO', label: 'AUMENTO' },
  { value: 'DISMINUCIÓN', label: 'DISMINUCIÓN' },
  { value: 'SIN MODIFICACIÓN', label: 'SIN MODIFICACIÓN' },
];

const TYPE_OF_MODIFICATION = MODIFICATION.map(
  ({ value, label }) => new FormOption(label, value),
);

export class VulnerableOperationsCapitalModification {
  @formField({
    label: 'Tipo de modificación patrimonial del capital fijo',
    formFieldType: FormFieldType.DROPDOWN,
    options: TYPE_OF_MODIFICATION,
  })
  @viewLabel('Tipo de modificación')
  modification_fixed_capital: string;

  @formField({
    label: 'Monto inicial capital fijo',
    formFieldType: FormFieldType.NUMBER,
  })
  init_fixed_capital: number;

  @formField({
    label: 'Monto final después de la moficiación',
    formFieldType: FormFieldType.NUMBER,
  })
  @viewLabel('Capital fijo')
  final_fixed_capital: number;

  @formField({
    label: 'Tipo de modificación patrimonial del capital fijo',
    formFieldType: FormFieldType.DROPDOWN,
    options: TYPE_OF_MODIFICATION,
  })
  @viewLabel('Tipo de modificación')
  modification_variable_capital: string;

  @formField({
    label: 'Monto inicial capital fijo',
    formFieldType: FormFieldType.NUMBER,
  })
  init_variable_capital: number;

  @formField({
    label: 'Monto final después de la moficiación',
    formFieldType: FormFieldType.NUMBER,
  })
  @viewLabel('Capital variable')
  final_variable_capital: number;

  constructor(
    modification_fixed_capital: string,
    init_fixed_capital: number,
    final_fixed_capital: number,
    modification_variable_capital: string,
    init_variable_capital: number,
    final_variable_capital: number,
  ) {
    this.modification_fixed_capital = modification_fixed_capital;
    this.init_fixed_capital = init_fixed_capital;
    this.final_fixed_capital = final_fixed_capital;
    this.modification_variable_capital = modification_variable_capital;
    this.init_variable_capital = init_variable_capital;
    this.final_variable_capital = final_variable_capital;
  }
}
