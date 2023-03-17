import { viewCrud, viewLabel } from 'o2c_core';
import { StaffService } from '../services';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';

@viewCrud({
  classProvider: StaffService,
  registerName: 'Miembro de Personal',
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class StaffView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Correo')
  email: string;

  @viewLabel('Teléfono')
  phone: string;

  @viewLabel('Información extra')
  extra_information: string;

  constructor(
    name: string,
    email: string,
    phone: string,
    extra_information: string,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.extra_information = extra_information;
  }
}
