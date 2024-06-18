import { Validators } from '@angular/forms';
import {
  FormFieldType,
  FormOption,
  formField,
  formTable,
  formValidators,
  viewLabel,
} from 'o2c_core';

const TYPE_ESTATE = [
  { value: 'Casa /Casa en condominio', label: 'Casa /Casa en condominio' },
  { value: 'Departamento', label: 'Departamento' },
  { value: 'Edificio habitacional', label: 'Edificio habitacional' },
  { value: 'Edificio comercial', label: 'Edificio comercial' },
  { value: 'Edificio oficinas', label: 'Edificio oficinas' },
  {
    value: 'Local comercial independiente',
    label: 'Local comercial independiente',
  },
  { value: 'Local en centro comercial', label: 'Local en centro comercial' },
  { value: 'Oficina', label: 'Oficina' },
  { value: 'Bodega comercial', label: 'Bodega comercial' },
  { value: 'Bodega industrial', label: 'Bodega industrial' },
  { value: 'Nave Industrial', label: 'Nave Industrial' },
  {
    value: 'Terreno urbano habitacional',
    label: 'Terreno urbano habitacional',
  },
  {
    value: 'Terreno no urbano habitacional',
    label: 'Terreno no urbano habitacional',
  },
  {
    value: 'Terreno urbano comercial o industrial',
    label: 'Terreno urbano comercial o industrial',
  },
  {
    value: 'Terreno no urbano comercial o industrial',
    label: 'Terreno no urbano comercial o industrial',
  },
  { value: 'Terreno ejidal', label: 'Terreno ejidal' },
  { value: 'Rancho/Hacienda/Quinta', label: 'Rancho/Hacienda/Quinta' },
  { value: 'Huerta', label: 'Huerta' },
  { value: 'Otro', label: 'Otro' },
];

const TYPE_ESTATE_OPTIONS = TYPE_ESTATE.map(
  ({ value, label }) => new FormOption(label, value),
);

const TYPE_PAYMENT = [
  { value: 'Contado', label: 'Contado' },
  { value: 'Financiamiento', label: 'Financiamiento' },
  { value: 'Dación en Pago', label: 'Dación en Pago' },
  { value: 'Préstamo o Crédito', label: 'Préstamo o Crédito' },
  { value: 'Permuta', label: 'Permuta' },
];

const PAYMENT_METHOD = [
  { value: 'Efectivo', label: 'Efectivo' },
  { value: 'Tarjeta de Crédito', label: 'Tarjeta de Crédito' },
  { value: 'Tarjeta de Débito', label: 'Tarjeta de Débito' },
  { value: 'Tarjeta de Prepago', label: 'Tarjeta de Prepago' },
  { value: 'Cheque Nominativo', label: 'Cheque Nominativo' },
  { value: 'Cheque de Caja', label: 'Cheque de Caja' },
  { value: 'Cheques de Viajero', label: 'Cheques de Viajero' },
  {
    value: 'Transferencia Interbancaria',
    label: 'Transferencia Interbancaria',
  },
  {
    value: 'Transferencia Misma Institución',
    label: 'Transferencia Misma Institución',
  },
  {
    value: 'Transferencia Internacional',
    label: 'Transferencia Internacional',
  },
  { value: 'Orden de Pago', label: 'Orden de Pago' },
  { value: 'Giro', label: 'Giro' },
  { value: 'Oro o Platino Amonedados', label: 'Oro o Platino Amonedados' },
  { value: 'Plata Amonedada', label: 'Plata Amonedada' },
  { value: 'Metales Preciosos', label: 'Metales Preciosos' },
  { value: 'Activos Virtuales', label: 'Activos Virtuales' },
  { value: 'Otros', label: 'Otros' },
];

const PAYMENT_METHOD_OPTIONS = PAYMENT_METHOD.map(
  ({ value, label }) => new FormOption(label, value),
);
const MONEY_PAYMENT = [
  { value: 'MXN', label: 'MXN' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'AED', label: 'AED' },
  { value: 'AFN', label: 'AFN' },
  { value: 'ALL', label: 'ALL' },
  { value: 'AMD', label: 'AMD' },
  { value: 'ANG', label: 'ANG' },
  { value: 'AOA', label: 'AOA' },
  { value: 'ARS', label: 'ARS' },
  { value: 'AUD', label: 'AUD' },
  { value: 'AWG', label: 'AWG' },
  { value: 'AZN', label: 'AZN' },
  { value: 'BAM', label: 'BAM' },
  { value: 'BBD', label: 'BBD' },
  { value: 'BDT', label: 'BDT' },
  { value: 'BGN', label: 'BGN' },
  { value: 'BHD', label: 'BHD' },
  { value: 'BIF', label: 'BIF' },
  { value: 'BMD', label: 'BMD' },
  { value: 'BND', label: 'BND' },
  { value: 'BOB', label: 'BOB' },
  { value: 'BRL', label: 'BRL' },
  { value: 'BSD', label: 'BSD' },
  { value: 'BTN', label: 'BTN' },
  { value: 'BWP', label: 'BWP' },
  { value: 'BYN', label: 'BYN' },
  { value: 'BZD', label: 'BZD' },
  { value: 'CAD', label: 'CAD' },
  { value: 'CDF', label: 'CDF' },
  { value: 'CHF', label: 'CHF' },
  { value: 'CLP', label: 'CLP' },
  { value: 'CNY', label: 'CNY' },
  { value: 'COP', label: 'COP' },
  { value: 'CRC', label: 'CRC' },
  { value: 'CVE', label: 'CVE' },
  { value: 'CWK', label: 'CWK' },
  { value: 'CYD', label: 'CYD' },
  { value: 'CZK', label: 'CZK' },
  { value: 'DJF', label: 'DJF' },
  { value: 'DKK', label: 'DKK' },
  { value: 'DOP', label: 'DOP' },
  { value: 'DZD', label: 'DZD' },
  { value: 'EGP', label: 'EGP' },
  { value: 'ERN', label: 'ERN' },
  { value: 'ETB', label: 'ETB' },
  { value: 'EUR', label: 'EUR' },
  { value: 'FJD', label: 'FJD' },
  { value: 'FKP', label: 'FKP' },
  { value: 'GBP', label: 'GBP' },
  { value: 'GEL', label: 'GEL' },
  { value: 'GHS', label: 'GHS' },
  { value: 'GIP', label: 'GIP' },
  { value: 'GMD', label: 'GMD' },
  { value: 'GNF', label: 'GNF' },
  { value: 'GTQ', label: 'GTQ' },
  { value: 'GYD', label: 'GYD' },
  { value: 'HKD', label: 'HKD' },
  { value: 'HNL', label: 'HNL' },
  { value: 'HRK', label: 'HRK' },
  { value: 'HTG', label: 'HTG' },
  { value: 'HUF', label: 'HUF' },
  { value: 'IDR', label: 'IDR' },
  { value: 'ILS', label: 'ILS' },
  { value: 'IMP', label: 'IMP' },
  { value: 'INR', label: 'INR' },
  { value: 'IQD', label: 'IQD' },
  { value: 'IRR', label: 'IRR' },
  { value: 'ISK', label: 'ISK' },
  { value: 'JMD', label: 'JMD' },
  { value: 'JOD', label: 'JOD' },
  { value: 'JPY', label: 'JPY' },
  { value: 'KES', label: 'KES' },
  { value: 'KGS', label: 'KGS' },
  { value: 'KHR', label: 'KHR' },
  { value: 'KMF', label: 'KMF' },
  { value: 'KPW', label: 'KPW' },
  { value: 'KRW', label: 'KRW' },
  { value: 'KWD', label: 'KWD' },
  { value: 'KYD', label: 'KYD' },
  { value: 'KZT', label: 'KZT' },
  { value: 'LAK', label: 'LAK' },
  { value: 'LBP', label: 'LBP' },
  { value: 'LKR', label: 'LKR' },
  { value: 'LRD', label: 'LRD' },
  { value: 'LSL', label: 'LSL' },
  { value: 'LYD', label: 'LYD' },
  { value: 'MAD', label: 'MAD' },
  { value: 'MAF', label: 'MAF' },
  { value: 'MDL', label: 'MDL' },
  { value: 'MGA', label: 'MGA' },
  { value: 'MKD', label: 'MKD' },
  { value: 'MMK', label: 'MMK' },
  { value: 'MNT', label: 'MNT' },
  { value: 'MOP', label: 'MOP' },
  { value: 'MRO', label: 'MRO' },
  { value: 'MUR', label: 'MUR' },
  { value: 'MVR', label: 'MVR' },
  { value: 'MWK', label: 'MWK' },
  { value: 'MXN', label: 'MXN' },
  { value: 'MYR', label: 'MYR' },
  { value: 'MZN', label: 'MZN' },
  { value: 'NAD', label: 'NAD' },
  { value: 'NAF', label: 'NAF' },
  { value: 'NGN', label: 'NGN' },
  { value: 'NIO', label: 'NIO' },
  { value: 'NOK', label: 'NOK' },
  { value: 'NPR', label: 'NPR' },
  { value: 'NZD', label: 'NZD' },
  { value: 'OMR', label: 'OMR' },
  { value: 'PAB', label: 'PAB' },
  { value: 'PEN', label: 'PEN' },
  { value: 'PGK', label: 'PGK' },
  { value: 'PHP', label: 'PHP' },
  { value: 'PKR', label: 'PKR' },
  { value: 'PLN', label: 'PLN' },
  { value: 'PYG', label: 'PYG' },
  { value: 'QAR', label: 'QAR' },
  { value: 'RON', label: 'RON' },
  { value: 'RSD', label: 'RSD' },
  { value: 'RUB', label: 'RUB' },
  { value: 'RWF', label: 'RWF' },
  { value: 'SAR', label: 'SAR' },
  { value: 'SBD', label: 'SBD' },
  { value: 'SCR', label: 'SCR' },
  { value: 'SDG', label: 'SDG' },
  { value: 'SEK', label: 'SEK' },
  { value: 'SGD', label: 'SGD' },
  { value: 'SHP', label: 'SHP' },
  { value: 'SLL', label: 'SLL' },
  { value: 'SLS', label: 'SLS' },
  { value: 'SML', label: 'SML' },
  { value: 'SOM', label: 'SOM' },
  { value: 'SOS', label: 'SOS' },
  { value: 'SRD', label: 'SRD' },
  { value: 'SSP', label: 'SSP' },
  { value: 'STD', label: 'STD' },
  { value: 'STN', label: 'STN' },
  { value: 'SVC', label: 'SVC' },
  { value: 'SYP', label: 'SYP' },
  { value: 'SZL', label: 'SZL' },
  { value: 'SEK', label: 'SEK' },
  { value: 'THB', label: 'THB' },
  { value: 'TJS', label: 'TJS' },
  { value: 'TMT', label: 'TMT' },
  { value: 'TND', label: 'TND' },
  { value: 'TOP', label: 'TOP' },
  { value: 'TRY', label: 'TRY' },
  { value: 'TTD', label: 'TTD' },
  { value: 'TWD', label: 'TWD' },
  { value: 'TZS', label: 'TZS' },
  { value: 'UAH', label: 'UAH' },
  { value: 'UGX', label: 'UGX' },
  { value: 'USD', label: 'USD' },
  { value: 'UYU', label: 'UYU' },
  { value: 'UZS', label: 'UZS' },
  { value: 'VND', label: 'VND' },
  { value: 'VUV', label: 'VUV' },
  { value: 'WST', label: 'WST' },
  { value: 'XAF', label: 'XAF' },
  { value: 'XCD', label: 'XCD' },
  { value: 'XOF', label: 'XOF' },
  { value: 'XPF', label: 'XPF' },
  { value: 'XTS', label: 'XTS' },
  { value: 'YER', label: 'YER' },
  { value: 'ZAR', label: 'ZAR' },
  { value: 'ZMW', label: 'ZMW' },
  { value: 'ZWD', label: 'ZWD' },
];

const MONEY_PAYMENT_OPTIONS = MONEY_PAYMENT.map(
  ({ value, label }) => new FormOption(label, value),
);

const TYPE_PAYMENT_OPTIONS = TYPE_PAYMENT.map(
  ({ value, label }) => new FormOption(label, value),
);

const FEDERAL_ENTITY = [
  { value: 1, label: 'Aguascalientes' },
  { value: 2, label: 'Baja California' },
  { value: 3, label: 'Baja California Sur' },
  { value: 4, label: 'Campeche' },
  { value: 5, label: 'Coahuila' },
  { value: 6, label: 'Colima' },
  { value: 7, label: 'Chiapas' },
  { value: 8, label: 'Chihuahua' },
  { value: 9, label: 'Distrito Federal' },
  { value: 10, label: 'Durango' },
  { value: 11, label: 'Guanajuato' },
  { value: 12, label: 'Guerrero' },
  { value: 13, label: 'Hidalgo' },
  { value: 14, label: 'Jalisco' },
  { value: 15, label: 'México' },
  { value: 16, label: 'Michoacán' },
  { value: 17, label: 'Morelos' },
  { value: 18, label: 'Nayarit' },
  { value: 19, label: 'Nuevo León' },
  { value: 20, label: 'Oaxaca' },
  { value: 21, label: 'Puebla' },
  { value: 22, label: 'Querétaro' },
  { value: 23, label: 'Quintana Roo' },
  { value: 24, label: 'San Luis Potosí' },
  { value: 25, label: 'Sinaloa' },
  { value: 26, label: 'Sonora' },
  { value: 27, label: 'Tabasco' },
  { value: 28, label: 'Tamaulipas' },
  { value: 29, label: 'Tlaxcala' },
  { value: 30, label: 'Veracruz' },
  { value: 31, label: 'Yucatán' },
  { value: 32, label: 'Zacatecas' },
];

const FEDERAL_ENTITY_OPTIONS = FEDERAL_ENTITY.map(
  ({ value, label }) => new FormOption(label, value),
);

export class PymentsForm {
  @formValidators(Validators.required)
  @formField({
    label: 'Fecha de Pago',
    formFieldType: FormFieldType.DATE,
  })
  @formValidators(Validators.required)
  @viewLabel('Fecha de Pago')
  payment_date: string | undefined;

  @formValidators(Validators.required)
  @formField({
    label: 'Tipo de pago',
    formFieldType: FormFieldType.DROPDOWN,
    options: TYPE_PAYMENT_OPTIONS,
  })
  @viewLabel('Tipo de pago')
  type_payment: string | undefined;

  @formValidators(Validators.required)
  @formField({
    label: 'Método de pago',
    formFieldType: FormFieldType.DROPDOWN,
    options: PAYMENT_METHOD_OPTIONS,
  })
  @viewLabel('Método de pago')
  method_payment: string | undefined;

  @formValidators(Validators.required)
  @formField({
    label: 'Moneda de pago',
    formFieldType: FormFieldType.DROPDOWN,
    options: MONEY_PAYMENT_OPTIONS,
  })
  @viewLabel('Moneda de pago')
  money_payment: string | undefined;

  @formValidators(Validators.required)
  @formField({
    label: 'Cantidad',
    formFieldType: FormFieldType.NUMBER,
  })
  @viewLabel('Cantidad')
  amount_date: string | undefined;

  constructor(
    payment_date: string | undefined,
    type_payment: string | undefined,
    method_payment: string | undefined,
    money_payment: string | undefined,
    amount_date: string | undefined,
  ) {
    this.payment_date = payment_date;
    this.type_payment = type_payment;
    this.method_payment = method_payment;
    this.money_payment = money_payment;
    this.amount_date = amount_date;
  }
}

export class EstatesForm {
  @formField({
    label: 'Tipo de inmueble',
    formFieldType: FormFieldType.DROPDOWN,
    options: TYPE_ESTATE_OPTIONS,
  })
  @viewLabel('Tipo de inmueble')
  payment_date: string | undefined;

  @formField({
    label: 'Metros de terreo',
    formFieldType: FormFieldType.NUMBER,
  })
  meters_land: number;

  @formField({
    label: 'Metros de construcción',
    formFieldType: FormFieldType.NUMBER,
  })
  meters_construction: number;

  // datos de dirección

  @formField({
    label: 'Entidad federativa',
    formFieldType: FormFieldType.DROPDOWN,
    options: FEDERAL_ENTITY_OPTIONS,
  })
  federal_entity: string | undefined;

  @formField({
    label: 'Código postal',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Código postal')
  zip_code: string;

  @formField({
    label: 'Colonia',
    formFieldType: FormFieldType.TEXT,
  })
  colony: string;

  @formField({
    label: 'Calle',
    formFieldType: FormFieldType.TEXT,
  })
  stret: string;

  @formField({
    label: 'Número exterior',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Número exterior')
  num_ext: string;

  @formField({
    label: 'Número interior',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Número interior')
  num_int: string;

  @formField({
    label: 'Localidad o Municipio',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Localidad o Municipio')
  municiopality: string;

  @formTable({
    tableProvider: PymentsForm,
  })
  @formField({
    label: 'Pagos o liquidaciones',
    formFieldType: FormFieldType.TABLE,
  })
  table: string;

  constructor(
    payment_date: string | undefined,
    meters_land: number,
    meters_construction: number,
    federal_entity: string | undefined,
    zip_code: string,
    colony: string,
    stret: string,
    num_ext: string,
    num_int: string,
    municiopality: string,
    table: string,
  ) {
    this.payment_date = payment_date;
    this.meters_land = meters_land;
    this.meters_construction = meters_construction;
    this.federal_entity = federal_entity;
    this.zip_code = zip_code;
    this.colony = colony;
    this.stret = stret;
    this.num_ext = num_ext;
    this.num_int = num_int;
    this.municiopality = municiopality;
    this.table = table;
  }
}
