import { RoleDto } from '../dto';
import { viewCrud, viewHTML, viewLabel, viewMapTo } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { UserService } from '../services';

@viewCrud({
  classProvider: UserService,
  route: DEFAULT_ROUTE_CONFIGURATION,
  registerName: 'Usuario',
})
export class UserView {
  @viewLabel('Nombre')
  name!: string;

  @viewLabel('Correo')
  email: string;

  @viewLabel('Estado de Conexión')
  @viewHTML((online) => {
    const status = {
      0: '#f91a1a', //Desconectado
      1: '#3be30e', //Conectado
    };
    // @ts-ignore
    return `<div style=" display: inline-block ;padding: 1.25rem; background: ${status[online]};margin-top: 1rem; border-radius: 50%"></div>`;
  })
  online: number;

  @viewLabel('Acceso a la plataforma')
  @viewHTML((online) => {
    const status = {
      1: '#f91a1a', //Desconectado
      0: '#3be30e', //Conectado
    };
    // @ts-ignore
    return `<div style=" display: inline-block ;padding: 1.25rem; background: ${status[online]};margin-top: 1rem; border-radius: 50%"></div>`;
  })
  locked: number;

  @viewLabel('Rol')
  @viewMapTo((value: any) => value?.name)
  role: RoleDto;

  constructor(
    name: string,
    email: string,
    online: number,
    locked: number,
    role: RoleDto,
  ) {
    this.name = name;
    this.email = email;
    this.online = online;
    this.locked = locked;
    this.role = role;
  }
}
