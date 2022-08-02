import {
  mapToHTML,
  mapToLabel,
  printLabel,
} from '../../shared/components/dinamyc-views/DynamicViews.decorators';
import { RoleDto } from '../dto/Role.dto';

export class UserView {
  @printLabel('Nombre')
  name!: string;

  @printLabel('Correo')
  email: string;

  @printLabel('Estado de Conexión')
  @mapToHTML((online) => {
    const status = {
      0: '#f91a1a', //Desconectado
      1: '#3be30e', //Conectado
    };
    // @ts-ignore
    return `<div style=" display: inline-block ;padding: 1.25rem; background: ${status[online]};margin-top: 1rem; border-radius: 50%"></div>`;
  })
  online: number;

  @printLabel('Acceso a la plataforma')
  @mapToHTML((online) => {
    const status = {
      1: '#f91a1a', //Desconectado
      0: '#3be30e', //Conectado
    };
    // @ts-ignore
    return `<div style=" display: inline-block ;padding: 1.25rem; background: ${status[online]};margin-top: 1rem; border-radius: 50%"></div>`;
  })
  locked: number;

  @printLabel('Rol')
  @mapToLabel((value) => value?.name)
  role: RoleDto;

  constructor(name: string, email: string, online: number, locked: number, role: RoleDto) {
    this.name = name;
    this.email = email;
    this.online = online;
    this.locked = locked;
    this.role = role;
  }
}
