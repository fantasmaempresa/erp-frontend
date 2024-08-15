import {
  FormFieldType,
  FormOption,
  formField,
  formTable,
  viewLabel,
} from 'o2c_core';

const ESTATES = [
  { value: 'CASA /CASA EN CONDOMINIO', label: 'CASA /CASA EN CONDOMINIO' },
  { value: 'BODEGA INDUSTRIAL', label: 'BODEGA INDUSTRIAL' },
  { value: 'NAVE INDUSTRIAL', label: 'NAVE INDUSTRIAL' },
  {
    value: 'TERRENO URBANO HABITACIONAL',
    label: 'TERRENO URBANO HABITACIONAL',
  },
  {
    value: 'TERRENO NO URBANO HABITACIONAL',
    label: 'TERRENO NO URBANO HABITACIONAL',
  },
  {
    value: 'TERRENO URBANO COMERCIAL O INDUSTRIAL',
    label: 'TERRENO URBANO COMERCIAL O INDUSTRIAL',
  },
  {
    value: 'TERRENO NO URBANO COMERCIAL O INDUSTRIAL',
    label: 'TERRENO NO URBANO COMERCIAL O INDUSTRIAL',
  },
  { value: 'TERRENO EJIDAL', label: 'TERRENO EJIDAL' },
  { value: 'RANCHO/HACIENDA/QUINTA', label: 'RANCHO/HACIENDA/QUINTA' },
  { value: 'HUERTA', label: 'HUERTA' },
  { value: 'DEPARTAMENTO', label: 'DEPARTAMENTO' },
  { value: 'EDIFICIO HABITACIONAL', label: 'EDIFICIO HABITACIONAL' },
  { value: 'EDIFICIO COMERCIAL', label: 'EDIFICIO COMERCIAL' },
  { value: 'EDIFICIO OFICINAS', label: 'EDIFICIO OFICINAS' },
  {
    value: 'LOCAL COMERCIAL INDEPENDIENTE',
    label: 'LOCAL COMERCIAL INDEPENDIENTE',
  },
  { value: 'LOCAL EN CENTRO COMERCIAL', label: 'LOCAL EN CENTRO COMERCIAL' },
  { value: 'OFICINA', label: 'OFICINA' },
  { value: 'BODEGA COMERCIAL', label: 'BODEGA COMERCIAL' },
  { value: 'OTRO', label: 'OTRO' },
];

const TYPE_ESTATE = ESTATES.map(
  ({ value, label }) => new FormOption(label, value),
);

const PERSONS = [
  { value: 'Persona fisica', label: 'Persona fisica' },
  { value: 'Persona moral', label: 'Persona moral' },
];

const TYPE_PERSONS = PERSONS.map(
  ({ value, label }) => new FormOption(label, value),
);

const GRANTS = [
  { value: 'Con garantia', label: 'Con garantia' },
  { value: 'Sin garantia', label: 'Sin garantia' },
];

const TYPE_GRANTS = GRANTS.map(
  ({ value, label }) => new FormOption(label, value),
);

const WARRANTY = [
  { value: 'ACCIONES O PARTES SOCIALES', label: 'ACCIONES O PARTES SOCIALES' },
  { value: 'DERECHOS FIDUCIARIOS', label: 'DERECHOS FIDUCIARIOS' },
  { value: 'DERECHOS DE CREDITO', label: 'DERECHOS DE CREDITO' },
  { value: 'GARANTIA QUIROGRAFARIA', label: 'GARANTIA QUIROGRAFARIA' },
  { value: 'INMUEBLE', label: 'INMUEBLE' },
  { value: 'VEHICULO TERRESTRE', label: 'VEHICULO TERRESTRE' },
  { value: 'VEHICULO AEREO', label: 'VEHICULO AEREO' },
  { value: 'VEHICULO MARITIMO', label: 'VEHICULO MARITIMO' },
  { value: 'PIEDRAS PRECIOSAS', label: 'PIEDRAS PRECIOSAS' },
  { value: 'METALES PRECIOSOS', label: 'METALES PRECIOSOS' },
  { value: 'JOYAS O RELOJES', label: 'JOYAS O RELOJES' },
  {
    value: 'OBRAS DE ARTE O ANTIGUEDADES',
    label: 'OBRAS DE ARTE O ANTIGUEDADES',
  },
  { value: 'OTRO (ESPECIFICAR)', label: 'OTRO (ESPECIFICAR)' },
];

const TYPE_WARRANTY = WARRANTY.map(
  ({ value, label }) => new FormOption(label, value),
);

export class DataGaranteFrom {
  @formField({
    label: 'Tipo de persona',
    formFieldType: FormFieldType.DROPDOWN,
    options: TYPE_PERSONS,
  })
  @viewLabel('tipo de persona')
  type_person: string;

  @formField({
    label: 'Nombre completo, denominación o razón social',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Nombre completo, denominación o razón social')
  name: string;

  @formField({
    label: 'Fecha de nacimiento o constitución',
    formFieldType: FormFieldType.DATE,
  })
  date: string;

  @formField({
    label: 'RFC',
    formFieldType: FormFieldType.TEXT,
  })
  rfc: string;

  @formField({
    label: 'CURP o número de identificación',
    formFieldType: FormFieldType.TEXT,
  })
  id: string;

  @formField({
    label: 'Tipo de inmueble (llenar solo si la garantia es un inmueble)',
    formFieldType: FormFieldType.DROPDOWN,
    options: TYPE_ESTATE,
  })
  type_state: string;

  @formField({
    label: 'Valor de referencia',
    formFieldType: FormFieldType.NUMBER,
  })
  value: number;

  @formField({
    label: 'Folio real o antecedentes',
    formFieldType: FormFieldType.TEXT,
  })
  folio: string;

  @formField({
    label: 'Entidad federativa',
    formFieldType: FormFieldType.TEXT,
  })
  entity_federal: string;

  @formField({
    label: 'Municipio',
    formFieldType: FormFieldType.TEXT,
  })
  municipality: string;

  @formField({
    label: 'Colonia',
    formFieldType: FormFieldType.TEXT,
  })
  colony: string;

  constructor(
    type_person: string,
    name: string,
    date: string,
    rfc: string,
    id: string,
    type_state: string,
    value: number,
    folio: string,
    entity_federal: string,
    municipality: string,
    colony: string,
  ) {
    this.type_person = type_person;
    this.name = name;
    this.date = date;
    this.rfc = rfc;
    this.id = id;
    this.type_state = type_state;
    this.value = value;
    this.folio = folio;
    this.entity_federal = entity_federal;
    this.municipality = municipality;
    this.colony = colony;
  }
}

export class VulnerableOperationsMutualContractsView {
  @formField({
    label: 'Tipo de otorgamiento',
    formFieldType: FormFieldType.DROPDOWN,
    options: TYPE_GRANTS,
  })
  @viewLabel('Tipo de otorgamiento')
  type_grant: string;

  @formField({
    label: 'Tipo de garantía',
    formFieldType: FormFieldType.DROPDOWN,
    options: TYPE_WARRANTY,
  })
  @viewLabel('Tipo de garantía')
  type_warranty: string;

  @formField({
    label: 'Monto de la operación',
    formFieldType: FormFieldType.NUMBER,
  })
  @viewLabel('Monto de la operación')
  amount_operation: string;

  @formTable({
    tableProvider: DataGaranteFrom,
  })
  @formField({
    label: 'Garantes',
    formFieldType: FormFieldType.TABLE,
  })
  tableDataGarante: string;

  constructor(
    type_grant: string,
    type_warranty: string,
    amount_operation: string,
    tableDataGarante: string,
  ) {
    this.type_grant = type_grant;
    this.type_warranty = type_warranty;
    this.amount_operation = amount_operation;
    this.tableDataGarante = tableDataGarante;
  }
}
