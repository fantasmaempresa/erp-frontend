import { FormFieldType, FormOption, formField, viewLabel } from 'o2c_core';

const LEGAL_ENTITY = [
  {
    value: 'ASOCIACION EN PARTICIPACION (A. P.)',
    label: 'ASOCIACION EN PARTICIPACION (A. P.)',
  },
  {
    value: 'SOCIEDAD MUTUALISTA DE SEGUROS DE VIDA',
    label: 'SOCIEDAD MUTUALISTA DE SEGUROS DE VIDA',
  },
  {
    value: 'SOCIEDAD DE SOLIDARIDAD SOCIAL (S. DE S. S.)',
    label: 'SOCIEDAD DE SOLIDARIDAD SOCIAL (S. DE S. S.)',
  },
  {
    value: 'SOCIEDAD DE PRODUCCION RURAL DE RESPONSABILIDAD LIMITADA',
    label: 'SOCIEDAD DE PRODUCCION RURAL DE RESPONSABILIDAD LIMITADA',
  },
  {
    value: 'SOCIEDAD DE PRODUCCION RURAL DE RESPONSABILIDAD ILIMITADA',
    label: 'SOCIEDAD DE PRODUCCION RURAL DE RESPONSABILIDAD ILIMITADA',
  },
  {
    value: 'SOCIEDAD DE PRODUCCION RURAL DE RESPONSABILIDAD SUPLEMENTADA',
    label: 'SOCIEDAD DE PRODUCCION RURAL DE RESPONSABILIDAD SUPLEMENTADA',
  },
  { value: 'SOCIEDAD CIVIL (S.C.)', label: 'SOCIEDAD CIVIL (S.C.)' },
  {
    value: 'SOCIEDAD EN NOMBRE COLECTIVO',
    label: 'SOCIEDAD EN NOMBRE COLECTIVO',
  },
  {
    value: 'COMANDITA SIMPLE (S. EN C.)',
    label: 'COMANDITA SIMPLE (S. EN C.)',
  },
  {
    value: 'COMANDITA POR ACCIONES (S. EN C. POR A.)',
    label: 'COMANDITA POR ACCIONES (S. EN C. POR A.)',
  },
  { value: 'SOCIEDAD ANONIMA (S.A.)', label: 'SOCIEDAD ANONIMA (S.A.)' },
  {
    value: 'SOCIEDAD DE RESPONSABILIDAD LIMITADA (S. DE R. L.)',
    label: 'SOCIEDAD DE RESPONSABILIDAD LIMITADA (S. DE R. L.)',
  },
  {
    value: 'SOCIEDAD COOPERATIVA LIMITADA (S. C. L.)',
    label: 'SOCIEDAD COOPERATIVA LIMITADA (S. C. L.)',
  },
  {
    value: 'SOCIEDAD COOPERATIVA SUPLEMENTADA (S. C. S.)',
    label: 'SOCIEDAD COOPERATIVA SUPLEMENTADA (S. C. S.)',
  },
  { value: 'OTRO (ESPECIFICAR)', label: 'OTRO (ESPECIFICAR)' },
];

const TYPE_LEGAL_ENTITY = LEGAL_ENTITY.map(
  ({ value, label }) => new FormOption(label, value),
);


const ACTIVITY_TURN = [
{value:"NO APLICA", label: "NO APLICA"},
{value:"SECTOR PRIMARIO - AGRICULTURA", label: "SECTOR PRIMARIO - AGRICULTURA"},
{value:"SECTOR PRIMARIO - GANADERIA", label: "SECTOR PRIMARIO - GANADERIA"},
{value:"SECTOR PRIMARIO - EXPLOTACION DE OTROS ANIMALES (AVICULTURA, APICULTURA, ETC.)", label: "SECTOR PRIMARIO - EXPLOTACION DE OTROS ANIMALES (AVICULTURA, APICULTURA, ETC.)"},
{value:"SECTOR PRIMARIO - APROVECHAMIENTO FORESTAL", label: "SECTOR PRIMARIO - APROVECHAMIENTO FORESTAL"},
{value:"SECTOR PRIMARIO - PESCA", label: "SECTOR PRIMARIO - PESCA"},
{value:"MINERIA - MINERIA DE OTROS RECURSOS", label: "MINERIA - MINERIA DE OTROS RECURSOS"},
{value:"MINERIA - ACTIVIDADES RELACIONADAS CON EL PETROLEO Y EL GAS", label: "MINERIA - ACTIVIDADES RELACIONADAS CON EL PETROLEO Y EL GAS"},
{value:"MINERIA - ORO", label: "MINERIA - ORO"},
{value:"MINERIA - PLATA", label: "MINERIA - PLATA"},
{value:"MINERIA - PIEDRAS PRECIOSAS", label: "MINERIA - PIEDRAS PRECIOSAS"},
{value:"GENERACION, TRANSMISION Y DISTRIBUCION DE ENERGIA ELECTRICA, SUMINISTRO DE AGUA Y DE GAS", label: "GENERACION, TRANSMISION Y DISTRIBUCION DE ENERGIA ELECTRICA, SUMINISTRO DE AGUA Y DE GAS"},
{value:"CONSTRUCCION - OTRAS ACTIVIDADES RELACIONADAS CON LA CONSTRUCCION", label: "CONSTRUCCION - OTRAS ACTIVIDADES RELACIONADAS CON LA CONSTRUCCION"},
{value:"CONSTRUCCION - EDIFICACION RESIDENCIAL Y NO RESIDENCIAL", label: "CONSTRUCCION - EDIFICACION RESIDENCIAL Y NO RESIDENCIAL"},
{value:"CONSTRUCCION - OBRAS DE INGENIERIA CIVIL", label: "CONSTRUCCION - OBRAS DE INGENIERIA CIVIL"},
{value:"CONSTRUCCION - TRABAJOS ESPECIALIZADOS PARA LA CONSTRUCCION", label: "CONSTRUCCION - TRABAJOS ESPECIALIZADOS PARA LA CONSTRUCCION"},
{value:"CONSTRUCCION - SERVICIOS DE BLINDAJE PARCIAL O TOTAL DE INMUEBLES", label: "CONSTRUCCION - SERVICIOS DE BLINDAJE PARCIAL O TOTAL DE INMUEBLES"},
{value:"INDUSTRIA - ALIMENTARIA", label: "INDUSTRIA - ALIMENTARIA"},
{value:"INDUSTRIA - BEBIDAS Y DEL TABACO", label: "INDUSTRIA - BEBIDAS Y DEL TABACO"},
{value:"INDUSTRIA - PRODUCTOS TEXTILES", label: "INDUSTRIA - PRODUCTOS TEXTILES"},
{value:"INDUSTRIA - PRENDAS DE VESTIR", label: "INDUSTRIA - PRENDAS DE VESTIR"},
{value:"INDUSTRIA - MADERA", label: "INDUSTRIA - MADERA"},
{value:"INDUSTRIA - PAPEL", label: "INDUSTRIA - PAPEL"},
{value:"INDUSTRIA - IMPRESION E INDUSTRIAS CONEXAS", label: "INDUSTRIA - IMPRESION E INDUSTRIAS CONEXAS"},
{value:"INDUSTRIA - PRODUCTOS DERIVADOS DEL PETROLEO Y DEL CARBON", label: "INDUSTRIA - PRODUCTOS DERIVADOS DEL PETROLEO Y DEL CARBON"},
{value:"INDUSTRIA - QUIMICA", label: "INDUSTRIA - QUIMICA"},
{value:"INDUSTRIA - PLASTICO Y DEL HULE", label: "INDUSTRIA - PLASTICO Y DEL HULE"},
{value:"INDUSTRIA - PRODUCTOS A BASE DE MINERALES NO METALICOS (ALFARERIA, PORCELANA, LOZA, VIDRIO, CEMENTO)", label: "INDUSTRIA - PRODUCTOS A BASE DE MINERALES NO METALICOS (ALFARERIA, PORCELANA, LOZA, VIDRIO, CEMENTO)"},
{value:"INDUSTRIA - METALICAS BASICAS", label: "INDUSTRIA - METALICAS BASICAS"},
{value:"INDUSTRIA - PRODUCTOS METALICOS (HERRAMIENTAS, UTENSILIOS, ESTRUCTURAS, PIEZAS)", label: "INDUSTRIA - PRODUCTOS METALICOS (HERRAMIENTAS, UTENSILIOS, ESTRUCTURAS, PIEZAS)"},
{value:"INDUSTRIA - MAQUINARIA Y EQUIPO", label: "INDUSTRIA - MAQUINARIA Y EQUIPO"},
{value:"INDUSTRIA - EQUIPO DE COMPUTACION, COMUNICACION, MEDICION Y DE OTROS EQUIPOS, COMPONENTES Y ACCESORIOS ELECTRONICOS", label: "INDUSTRIA - EQUIPO DE COMPUTACION, COMUNICACION, MEDICION Y DE OTROS EQUIPOS, COMPONENTES Y ACCESORIOS ELECTRONICOS"},
{value:"INDUSTRIA - ACCESORIOS, APARATOS ELECTRICOS Y EQUIPO DE GENERACION DE ENERGIA ELECTRICA", label: "INDUSTRIA - ACCESORIOS, APARATOS ELECTRICOS Y EQUIPO DE GENERACION DE ENERGIA ELECTRICA"},
{value:"INDUSTRIA - EQUIPO DE TRANSPORTE SIN MOTOR", label: "INDUSTRIA - EQUIPO DE TRANSPORTE SIN MOTOR"},
{value:"INDUSTRIA - AUTOMOTRIZ", label: "INDUSTRIA - AUTOMOTRIZ"},
{value:"INDUSTRIA - VEHICULOS BLINDADOS Y EQUIPO PARA EL BLINDAJE DE VEHICULOS", label: "INDUSTRIA - VEHICULOS BLINDADOS Y EQUIPO PARA EL BLINDAJE DE VEHICULOS"},
{value:"INDUSTRIA - MUEBLES, COLCHONES Y PERSIANAS", label: "INDUSTRIA - MUEBLES, COLCHONES Y PERSIANAS"},
{value:"INDUSTRIA - OTRAS INDUSTRIAS MANUFACTURERAS", label: "INDUSTRIA - OTRAS INDUSTRIAS MANUFACTURERAS"},
{value:"INDUSTRIA - ORFEBRERIA Y JOYERIA DE METALES Y PIEDRAS PRECIOSOS", label: "INDUSTRIA - ORFEBRERIA Y JOYERIA DE METALES Y PIEDRAS PRECIOSOS"},
{value:"INDUSTRIA - JOYERIA DE METALES Y PIEDRAS NO PRECIOSOS Y DE OTROS MATERIALES", label: "INDUSTRIA - JOYERIA DE METALES Y PIEDRAS NO PRECIOSOS Y DE OTROS MATERIALES"},
{value:"COMERCIO - ABARROTES, ALIMENTOS, BEBIDAS, HIELO Y TABACO", label: "COMERCIO - ABARROTES, ALIMENTOS, BEBIDAS, HIELO Y TABACO"},
{value:"COMERCIO - PRODUCTOS FARMACEUTICOS, DE PERFUMERIA, ARTICULOS PARA EL ESPARCIMIENTO, ELECTRODOMESTICOS Y APARATOS DE LINEA BLANCA", label: "COMERCIO - PRODUCTOS FARMACEUTICOS, DE PERFUMERIA, ARTICULOS PARA EL ESPARCIMIENTO, ELECTRODOMESTICOS Y APARATOS DE LINEA BLANCA"},
{value:"COMERCIO - MATERIAS PRIMAS AGROPECUARIAS Y FORESTALES, PARA LA INDUSTRIA, Y MATERIALES DE DESECHO", label: "COMERCIO - MATERIAS PRIMAS AGROPECUARIAS Y FORESTALES, PARA LA INDUSTRIA, Y MATERIALES DE DESECHO"},
{value:"COMERCIO - MAQUINARIA, EQUIPO DE COMPUTO Y MOBILIARIO DE USO GENERAL", label: "COMERCIO - MAQUINARIA, EQUIPO DE COMPUTO Y MOBILIARIO DE USO GENERAL"},
{value:"COMERCIO - TIENDAS DE AUTOSERVICIO Y DEPARTAMENTALES", label: "COMERCIO - TIENDAS DE AUTOSERVICIO Y DEPARTAMENTALES"},
{value:"COMERCIO - PRODUCTOS TEXTILES, BISUTERIA, ACCESORIOS DE VESTIR Y CALZADO", label: "COMERCIO - PRODUCTOS TEXTILES, BISUTERIA, ACCESORIOS DE VESTIR Y CALZADO"},
{value:"COMERCIO - ARTICULOS DE PAPELERIA", label: "COMERCIO - ARTICULOS DE PAPELERIA"},
{value:"COMERCIO - ARTICULOS DE JOYERIA Y RELOJES", label: "COMERCIO - ARTICULOS DE JOYERIA Y RELOJES"},
{value:"COMERCIO - ARTICULOS PARA LA DECORACION DE INTERIORES", label: "COMERCIO - ARTICULOS PARA LA DECORACION DE INTERIORES"},
{value:"COMERCIO - ANTIGÜEDADES Y OBRAS DE ARTE", label: "COMERCIO - ANTIGÜEDADES Y OBRAS DE ARTE"},
{value:"COMERCIO - ARTICULOS DE FERRETERIA, TLAPALERIA Y VIDRIOS", label: "COMERCIO - ARTICULOS DE FERRETERIA, TLAPALERIA Y VIDRIOS"},
{value:"COMERCIO - VEHICULOS NUEVOS", label: "COMERCIO - VEHICULOS NUEVOS"},
{value:"COMERCIO - VEHICULOS USADOS", label: "COMERCIO - VEHICULOS USADOS"},
{value:"COMERCIO - PARTES Y REFACCIONES PARA VEHICULOS", label: "COMERCIO - PARTES Y REFACCIONES PARA VEHICULOS"},
{value:"COMERCIO - COMBUSTIBLES Y LUBRICANTES", label: "COMERCIO - COMBUSTIBLES Y LUBRICANTES"},
{value:"COMERCIO - A TRAVES DE INTERNET, Y CATALOGOS IMPRESOS, TELEVISION Y SIMILARES", label: "COMERCIO - A TRAVES DE INTERNET, Y CATALOGOS IMPRESOS, TELEVISION Y SIMILARES"},
{value:"TRANSPORTE - AEREO", label: "TRANSPORTE - AEREO"},
{value:"TRANSPORTE - FERROVIARIO", label: "TRANSPORTE - FERROVIARIO"},
{value:"TRANSPORTE - MARITIMO Y FLUVIAL", label: "TRANSPORTE - MARITIMO Y FLUVIAL"},
{value:"TRANSPORTE - SERVICIOS DE TRANSPORTE Y/O CUSTODIA DE VALORES", label: "TRANSPORTE - SERVICIOS DE TRANSPORTE Y/O CUSTODIA DE VALORES"},
{value:"TRANSPORTE - TERRESTRE", label: "TRANSPORTE - TERRESTRE"},
{value:"TRANSPORTE - TRANSPORTACION Y DISTRIBUCION POR DUCTOS", label: "TRANSPORTE - TRANSPORTACION Y DISTRIBUCION POR DUCTOS"},
{value:"TRANSPORTE - SERVICIOS RELACIONADOS CON EL TRANSPORTE", label: "TRANSPORTE - SERVICIOS RELACIONADOS CON EL TRANSPORTE"},
{value:"TRANSPORTE - SERVICIOS DE AGENCIAS ADUANALES", label: "TRANSPORTE - SERVICIOS DE AGENCIAS ADUANALES"},
{value:"SERVICIOS POSTALES", label: "SERVICIOS POSTALES"},
{value:"SERVICIOS DE MENSAJERIA Y PAQUETERIA", label: "SERVICIOS DE MENSAJERIA Y PAQUETERIA"},
{value:"SERVICIOS DE ALMACENAMIENTO", label: "SERVICIOS DE ALMACENAMIENTO"},
{value:"INFORMACION EN MEDIOS MASIVOS", label: "INFORMACION EN MEDIOS MASIVOS"},
{value:"PROCESAMIENTO ELECTRONICO DE INFORMACION Y OTROS SERVICIOS WEB", label: "PROCESAMIENTO ELECTRONICO DE INFORMACION Y OTROS SERVICIOS WEB"},
{value:"SERVICIOS FINANCIEROS - BANCA CENTRAL", label: "SERVICIOS FINANCIEROS - BANCA CENTRAL"},
{value:"SERVICIOS FINANCIEROS - BANCA MULTIPLE", label: "SERVICIOS FINANCIEROS - BANCA MULTIPLE"},
{value:"SERVICIOS FINANCIEROS - BANCA DE DESARROLLO", label: "SERVICIOS FINANCIEROS - BANCA DE DESARROLLO"},
{value:"SERVICIOS FINANCIEROS - FONDOS Y FIDEICOMISOS FINANCIEROS", label: "SERVICIOS FINANCIEROS - FONDOS Y FIDEICOMISOS FINANCIEROS"},
{value:"SERVICIOS FINANCIEROS - UNIONES DE CREDITO", label: "SERVICIOS FINANCIEROS - UNIONES DE CREDITO"},
{value:"SREVICIOS FINANCIEROS - CAJAS DE AHORRO POPULAR", label: "SREVICIOS FINANCIEROS - CAJAS DE AHORRO POPULAR"},
{value:"SERVICIOS FINANCIEROS - OTRAS INSTITUCIONES DE INTERMEDIACION CREDITICIA Y FINANCIERA NO BURSATIL (OPERACION Y PROMOCION DE TARJETAS DE CREDITO NO BANCARIAS, FINANCIAMIENTO DE BIENES DURADEROS), SOCIEDADES FINANCIERAS DE OBJETO LIMITADO", label: "SERVICIOS FINANCIEROS - OTRAS INSTITUCIONES DE INTERMEDIACION CREDITICIA Y FINANCIERA NO BURSATIL (OPERACION Y PROMOCION DE TARJETAS DE CREDITO NO BANCARIAS, FINANCIAMIENTO DE BIENES DURADEROS), SOCIEDADES FINANCIERAS DE OBJETO LIMITADO"},
{value:"SERVICIOS FINANCIEROS - OTRAS INSTITUCIONES DE AHORRO Y PRESTAMO", label: "SERVICIOS FINANCIEROS - OTRAS INSTITUCIONES DE AHORRO Y PRESTAMO"},
{value:"SERVICIOS FINANCIEROS - COMPAÑIAS DE AUTOFINANCIAMIENTO", label: "SERVICIOS FINANCIEROS - COMPAÑIAS DE AUTOFINANCIAMIENTO"},
{value:"SERVICIOS FINANCIEROS - MONTEPIOS", label: "SERVICIOS FINANCIEROS - MONTEPIOS"},
{value:"SERVICIOS FINANCIEROS - CASAS DE EMPEÑO", label: "SERVICIOS FINANCIEROS - CASAS DE EMPEÑO"},
{value:"SERVICIOS FINANCIEROS - SOCIEDADES FINANCIERAS DE OBJETO MULTIPLE", label: "SERVICIOS FINANCIEROS - SOCIEDADES FINANCIERAS DE OBJETO MULTIPLE"},
{value:"OTRAS EMPRESAS DE INTERMEDIACION CREDITICIA NO FINANCIERAS", label: "OTRAS EMPRESAS DE INTERMEDIACION CREDITICIA NO FINANCIERAS"},
{value:"SERVICIOS FINANCIEROS - CASAS DE BOLSA", label: "SERVICIOS FINANCIEROS - CASAS DE BOLSA"},
{value:"SERVICIOS FINANCIEROS - CASAS DE CAMBIO Y CENTROS CAMBIARIOS", label: "SERVICIOS FINANCIEROS - CASAS DE CAMBIO Y CENTROS CAMBIARIOS"},
{value:"SERVICIOS FINANCIEROS - TRANSMISORES DE DINERO", label: "SERVICIOS FINANCIEROS - TRANSMISORES DE DINERO"},
{value:"SERVICIOS FINANCIEROS - OTROS SERVICIOS RELACIONADOS CON LA INTERMEDIACION BURSATIL", label: "SERVICIOS FINANCIEROS - OTROS SERVICIOS RELACIONADOS CON LA INTERMEDIACION BURSATIL"},
{value:"SERVICIOS FINANCIEROS - COMPAÑIAS DE SEGUROS", label: "SERVICIOS FINANCIEROS - COMPAÑIAS DE SEGUROS"},
{value:"SERVICIOS FINANCIEROS - COMPAÑIAS AFIANZADORAS", label: "SERVICIOS FINANCIEROS - COMPAÑIAS AFIANZADORAS"},
{value:"SERVICIOS FINANCIEROS - AGENTES, AJUSTADORES Y GESTORES DE SEGUROS Y FIANZAS", label: "SERVICIOS FINANCIEROS - AGENTES, AJUSTADORES Y GESTORES DE SEGUROS Y FIANZAS"},
{value:"SERVICIOS FINANCIEROS - ADMINISTRACION DE FONDOS PARA EL RETIRO", label: "SERVICIOS FINANCIEROS - ADMINISTRACION DE FONDOS PARA EL RETIRO"},
{value:"SERVICIOS FINANCIEROS - EMISORA Y/O COMERCIALIZACION DE CHEQUES DE VIAJERO", label: "SERVICIOS FINANCIEROS - EMISORA Y/O COMERCIALIZACION DE CHEQUES DE VIAJERO"},
{value:"SERVICIOS INMOBILIARIOS Y DE ALQUILER - ALQUILER SIN INTERMEDIACION DE BIENES RAICES", label: "SERVICIOS INMOBILIARIOS Y DE ALQUILER - ALQUILER SIN INTERMEDIACION DE BIENES RAICES"},
{value:"SERVICIOS INMOBILIARIOS Y DE ALQUILER - INMOBILIARIAS Y CORREDORES DE BIENES RAICES", label: "SERVICIOS INMOBILIARIOS Y DE ALQUILER - INMOBILIARIAS Y CORREDORES DE BIENES RAICES"},
{value:"SERVICIOS INMOBILIARIOS Y DE ALQUILER - SERVICIOS DE ALQUILER DE BIENES MUEBLES EXCEPTO VEHICULOS", label: "SERVICIOS INMOBILIARIOS Y DE ALQUILER - SERVICIOS DE ALQUILER DE BIENES MUEBLES EXCEPTO VEHICULOS"},
{value:"SERVICIOS INMOBILIARIOS Y DE ALQUILER - ALQUILER DE VEHICULOS", label: "SERVICIOS INMOBILIARIOS Y DE ALQUILER - ALQUILER DE VEHICULOS"},
{value:"SERVICIOS INMOBILIARIOS Y DE ALQUILER - SERVICIOS DE ALQUILER DE MARCAS REGISTRADAS, PATENTES Y FRANQUICIAS", label: "SERVICIOS INMOBILIARIOS Y DE ALQUILER - SERVICIOS DE ALQUILER DE MARCAS REGISTRADAS, PATENTES Y FRANQUICIAS"},
{value:"SERVICIOS PROFESIONALES Y TECNICOS - SERVICIOS JURIDICOS", label: "SERVICIOS PROFESIONALES Y TECNICOS - SERVICIOS JURIDICOS"},
{value:"SERVICIOS PROFESIONALES Y TECNICOS - NOTARIA Y CORREDURIA PUBLICA", label: "SERVICIOS PROFESIONALES Y TECNICOS - NOTARIA Y CORREDURIA PUBLICA"},
{value:"SERVICIOS PROFESIONALES Y TECNICOS - ARQUITECTURA, INGENIERIA Y ACTIVIDADES RELACIONADAS", label: "SERVICIOS PROFESIONALES Y TECNICOS - ARQUITECTURA, INGENIERIA Y ACTIVIDADES RELACIONADAS"},
{value:"SERVICIOS PROFESIONALES Y TECNICOS - DISEÑO DE SISTEMAS DE COMPUTO Y SERVICIOS RELACIONADOS", label: "SERVICIOS PROFESIONALES Y TECNICOS - DISEÑO DE SISTEMAS DE COMPUTO Y SERVICIOS RELACIONADOS"},
{value:"SERVICIOS PROFESIONALES Y TECNICOS - CONSULTORIA ADMINISTRATIVA, CIENTIFICA Y TECNICA", label: "SERVICIOS PROFESIONALES Y TECNICOS - CONSULTORIA ADMINISTRATIVA, CIENTIFICA Y TECNICA"},
{value:"SERVICIOS PROFESIONALES Y TECNICOS - INVESTIGACION CIENTIFICA Y DESARROLLO", label: "SERVICIOS PROFESIONALES Y TECNICOS - INVESTIGACION CIENTIFICA Y DESARROLLO"},
{value:"SERVICIOS PROFESIONALES Y TECNICOS - PUBLICIDAD Y ACTIVIDADES RELACIONADAS", label: "SERVICIOS PROFESIONALES Y TECNICOS - PUBLICIDAD Y ACTIVIDADES RELACIONADAS"},
{value:"SERVICIOS PROFESIONALES Y TECNICOS - OTROS SERVICIOS DE OUTSOURCING", label: "SERVICIOS PROFESIONALES Y TECNICOS - OTROS SERVICIOS DE OUTSOURCING"},
{value:"SERVICIOS PROFESIONALES Y TECNICOS - CONTABILIDAD Y AUDITORIA", label: "SERVICIOS PROFESIONALES Y TECNICOS - CONTABILIDAD Y AUDITORIA"},
{value:"SERVICIOS DE APOYO A LOS NEGOCIOS - SERVICIOS DE ADMINISTRACION DE NEGOCIOS", label: "SERVICIOS DE APOYO A LOS NEGOCIOS - SERVICIOS DE ADMINISTRACION DE NEGOCIOS"},
{value:"SERVICIOS DE APOYO A LOS NEGOCIOS - AGENCIAS DE COBRANZA, DESPACHOS DE INVESTIGACION", label: "SERVICIOS DE APOYO A LOS NEGOCIOS - AGENCIAS DE COBRANZA, DESPACHOS DE INVESTIGACION"},
{value:"SERVICIOS DE APOYO A LOS NEGOCIOS - SERVICIOS DE PROTECCION Y SEGURIDAD", label: "SERVICIOS DE APOYO A LOS NEGOCIOS - SERVICIOS DE PROTECCION Y SEGURIDAD"},
{value:"SERVICIOS DE APOYO A LOS NEGOCIOS - SERVICIOS DE LIMPIEZA Y MANTENIMIENTO", label: "SERVICIOS DE APOYO A LOS NEGOCIOS - SERVICIOS DE LIMPIEZA Y MANTENIMIENTO"},
{value:"SERVICIOS DE APOYO A LOS NEGOCIOS - OTROS SERVICIOS", label: "SERVICIOS DE APOYO A LOS NEGOCIOS - OTROS SERVICIOS"},
{value:"SERVICIOS EDUCATIVOS", label: "SERVICIOS EDUCATIVOS"},
{value:"SERVICIOS DE SALUD Y DE ASISTENCIA SOCIAL", label: "SERVICIOS DE SALUD Y DE ASISTENCIA SOCIAL"},
{value:"SERVICIOS DE ESPARCIMIENTO CULTURALES Y DEPORTIVOS, Y OTROS SERVICIOS RECREATIVOS", label: "SERVICIOS DE ESPARCIMIENTO CULTURALES Y DEPORTIVOS, Y OTROS SERVICIOS RECREATIVOS"},
{value:"SERVICIOS DE ESPARCIMIENTO - MUSEOS, SITIOS HISTORICOS, ZOOLOGICOS Y SIMILARES", label: "SERVICIOS DE ESPARCIMIENTO - MUSEOS, SITIOS HISTORICOS, ZOOLOGICOS Y SIMILARES"},
{value:"SERVICIOS DE ESPARCIMIENTO - CASAS DE JUEGOS ELECTRONICOS", label: "SERVICIOS DE ESPARCIMIENTO - CASAS DE JUEGOS ELECTRONICOS"},
{value:"SERVICIOS DE ESPARCIMIENTO - CASINOS O CENTROS DE APUESTA", label: "SERVICIOS DE ESPARCIMIENTO - CASINOS O CENTROS DE APUESTA"},
{value:"SERVICIOS DE ESPARCIMIENTO - VENTA DE BILLETES DE LOTERIA, PRONOSTICOS DEPORTIVOS U OTROS SORTEOS", label: "SERVICIOS DE ESPARCIMIENTO - VENTA DE BILLETES DE LOTERIA, PRONOSTICOS DEPORTIVOS U OTROS SORTEOS"},
{value:"SERVICIOS DE ALOJAMIENTO TEMPORAL Y DE PREPARACION DE ALIMENTOS Y BEBIDAS", label: "SERVICIOS DE ALOJAMIENTO TEMPORAL Y DE PREPARACION DE ALIMENTOS Y BEBIDAS"},
{value:"SERVICIOS DE REPARACION Y MANTENIMIENTO - EQUIPO INDUSTRIAL, COMERCIAL, SERVICIOS Y AUTOMOTRIZ", label: "SERVICIOS DE REPARACION Y MANTENIMIENTO - EQUIPO INDUSTRIAL, COMERCIAL, SERVICIOS Y AUTOMOTRIZ"},
{value:"SERVICIOS PERSONALES - LAVANDERIAS, SERVICIOS FUNERARIOS, BAÑOS PUBLICOS, SERVICIOS DE ESTACIONAMIENTO, REVELADO E IMPRESION DE FOTOGRAFIAS", label: "SERVICIOS PERSONALES - LAVANDERIAS, SERVICIOS FUNERARIOS, BAÑOS PUBLICOS, SERVICIOS DE ESTACIONAMIENTO, REVELADO E IMPRESION DE FOTOGRAFIAS"},
{value:"ASOCIACIONES - ORGANIZACIONES Y CAMARAS DE PRODUCTORES, COMERCIANTES Y PRESTADORES DE SERVICIOS", label: "ASOCIACIONES - ORGANIZACIONES Y CAMARAS DE PRODUCTORES, COMERCIANTES Y PRESTADORES DE SERVICIOS"},
{value:"ASOCIACIONES - ORGANIZACIONES LABORALES Y SINDICALES", label: "ASOCIACIONES - ORGANIZACIONES LABORALES Y SINDICALES"},
{value:"ASOCIACIONES - ORGANIZACIONES DE PROFESIONISTAS", label: "ASOCIACIONES - ORGANIZACIONES DE PROFESIONISTAS"},
{value:"ASOCIACIONES - ORGANIZACIONES DE ACTIVIDADES RECREATIVAS", label: "ASOCIACIONES - ORGANIZACIONES DE ACTIVIDADES RECREATIVAS"},
{value:"ASOCIACIONES - ORGANIZACIONES RELIGIOSAS", label: "ASOCIACIONES - ORGANIZACIONES RELIGIOSAS"},
{value:"ASOCIACIONES - ORGANIZACIONES POLITICAS", label: "ASOCIACIONES - ORGANIZACIONES POLITICAS"},
{value:"ASOCIACIONES - ORGANIZACIONES CIVILES", label: "ASOCIACIONES - ORGANIZACIONES CIVILES"},
{value:"ORGANISMOS INTERNACIONALES Y EXTRATERRITORIALES", label: "ORGANISMOS INTERNACIONALES Y EXTRATERRITORIALES"},
{value:"SECTOR PUBLICO - PODER EJECUTIVO FEDERAL", label: "SECTOR PUBLICO - PODER EJECUTIVO FEDERAL"},
{value:"SECTOR PUBLICO - PODER EJECUTIVO ESTATAL Y DEL DISTRITO FEDERAL", label: "SECTOR PUBLICO - PODER EJECUTIVO ESTATAL Y DEL DISTRITO FEDERAL"},
{value:"SECTOR PUBLICO - PODER EJECUTIVO MUNICIPAL Y DELEGACIONAL", label: "SECTOR PUBLICO - PODER EJECUTIVO MUNICIPAL Y DELEGACIONAL"},
{value:"SECTOR PUBLICO - PODER JUDICIAL FEDERAL", label: "SECTOR PUBLICO - PODER JUDICIAL FEDERAL"},
{value:"SECTOR PUBLICO - PODER JUDICIAL ESTATAL Y DEL DISTRITO FEDERAL", label: "SECTOR PUBLICO - PODER JUDICIAL ESTATAL Y DEL DISTRITO FEDERAL"},
{value:"SECTOR PUBLICO - PODER LEGISLATIVO FEDERAL", label: "SECTOR PUBLICO - PODER LEGISLATIVO FEDERAL"},
{value:"SECTOR PUBLICO - PODER LEGISLATIVO ESTATAL Y DEL DISTRITO FEDERAL", label: "SECTOR PUBLICO - PODER LEGISLATIVO ESTATAL Y DEL DISTRITO FEDERAL"},
{value:"SECTOR PUBLICO - ORGANOS AUTONOMOS Y ENTIDADES PARAESTATALES", label: "SECTOR PUBLICO - ORGANOS AUTONOMOS Y ENTIDADES PARAESTATALES"},
];

const TYPE_ACTIVITY_TURN = ACTIVITY_TURN.map(
  ({ value, label }) => new FormOption(label, value),
);
export class constitutionLegalEntitiesForm {

  @formField({
    label: 'Tipo de persona moral',
    formFieldType: FormFieldType.DROPDOWN,
    options: TYPE_LEGAL_ENTITY,
  })
  @viewLabel('Tipo de persona moral')
  type_person: string;

  @formField({
    label: 'Actividad económica o giro mercantil u objeto social',
    formFieldType: FormFieldType.DROPDOWN,
    options: TYPE_ACTIVITY_TURN,
  })
  @viewLabel('Actividad económica')
  activity_turn: string;

  @formField({
    label: 'Denominación o razón social de la persona moral que se constituye',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Denominación o razón social de la persona moral que se constituye')
  name_person: string;


  @formField({
    label: 'Folio Mercantil o antecedentes',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Folio mercantil o antecedentes')
  business_folio: string;

  @formField({
    label: 'Número de partes sociales',
    formFieldType: FormFieldType.NUMBER,
  })
  social_parts: number;

  @formField({
    label: 'Entidad Federal',
    formFieldType: FormFieldType.TEXT,
  })
  @viewLabel('Entidad Federal')
  federal_entity: string;

  @formField({
    label: 'Capital fijo',
    formFieldType: FormFieldType.NUMBER,
  })
  @viewLabel('Capital fijo')
  fixed_capital: number;

  @formField({
    label: 'Capital variable',
    formFieldType: FormFieldType.NUMBER,
  })
  @viewLabel('Capital variable')
  variable_capital: number;

  constructor(
    type_person: string,
    activity_turn: string,
    name_person: string,
    business_folio: string,
    social_parts: number,
    federal_entity: string,
    fixed_capital: number,
    variable_capital: number,
  ) {
    this.type_person = type_person;
    this.activity_turn = activity_turn;
    this.name_person = name_person;
    this.business_folio = business_folio;
    this.social_parts = social_parts;
    this.federal_entity = federal_entity;
    this.fixed_capital = fixed_capital;
    this.variable_capital = variable_capital;
  }
}
