import { viewCrud, viewLabel } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { PlaceService } from '../services/place.service';
import { ShapeService } from "../services/shape.service";

@viewCrud({
  classProvider: ShapeService,
  registerName: 'Formas',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ShapeView {
  @viewLabel('Folio')
  folio: string;

  // @viewLabel('notary')
  notary: string;

  @viewLabel('Escritura')
  scriptures: string;

  @viewLabel('Cuenta Predial')
  property_account: string;

  @viewLabel('Fecha de firma')
  signature_date: string;

  // @viewLabel('departure')
  departure: string;

  // @viewLabel('inscription')
  inscription: string;

  @viewLabel('Fojas')
  sheets: string;

  @viewLabel('Tomo')
  took: string;

  @viewLabel('Libro')
  book: string;

  @viewLabel('Monto de operación')
  operation_value: string;

  // @viewLabel('alienating_name')
  alienating_name: string;

  // @viewLabel('alienating_street')
  alienating_street: string;

  // @viewLabel('alienating_outdoor_number')
  alienating_outdoor_number: string;

  // @viewLabel('alienating_interior_number')
  alienating_interior_number: string;

  // @viewLabel('alienating_colony')
  alienating_colony: string;

  // @viewLabel('alienating_locality')
  alienating_locality: string;

  // @viewLabel('alienating_municipality')
  alienating_municipality: string;

  // @viewLabel('alienating_entity')
  alienating_entity: string;

  // @viewLabel('alienating_zipcode')
  alienating_zipcode: string;

  // @viewLabel('alienating_phone')
  alienating_phone: string;

  @viewLabel('Nombre de adquiriente')
  acquirer_name: string;

  // @viewLabel('description')
  description: string;

  // @viewLabel('total')
  total: string;

  // @viewLabel('data_form')
  data_form: [];

  // @viewLabel('template_shape_id')
  template_shape_id: number;

  // @viewLabel('procedure_id')
  procedure_id: number;

  constructor(
    folio: string,
    notary: string,
    scriptures: string,
    property_account: string,
    signature_date: string,
    departure: string,
    inscription: string,
    sheets: string,
    took: string,
    book: string,
    operation_value: string,
    alienating_name: string,
    alienating_street: string,
    alienating_outdoor_number: string,
    alienating_interior_number: string,
    alienating_colony: string,
    alienating_locality: string,
    alienating_municipality: string,
    alienating_entity: string,
    alienating_zipcode: string,
    alienating_phone: string,
    acquirer_name: string,
    description: string,
    total: string,
    data_form: [],
    template_shape_id: number,
    procedure_id: number,
  ) {
    this.folio = folio;
    this.notary = notary;
    this.scriptures = scriptures;
    this.property_account = property_account;
    this.signature_date = signature_date;
    this.departure = departure;
    this.inscription = inscription;
    this.sheets = sheets;
    this.took = took;
    this.book = book;
    this.operation_value = operation_value;
    this.alienating_name = alienating_name;
    this.alienating_street = alienating_street;
    this.alienating_outdoor_number = alienating_outdoor_number;
    this.alienating_interior_number = alienating_interior_number;
    this.alienating_colony = alienating_colony;
    this.alienating_locality = alienating_locality;
    this.alienating_municipality = alienating_municipality;
    this.alienating_entity = alienating_entity;
    this.alienating_zipcode = alienating_zipcode;
    this.alienating_phone = alienating_phone;
    this.acquirer_name = acquirer_name;
    this.description = description;
    this.total = total;
    this.data_form = data_form;
    this.template_shape_id = template_shape_id;
    this.procedure_id = procedure_id;
  }
}
