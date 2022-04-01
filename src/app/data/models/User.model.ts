import { EntityModel } from '../../core/interfaces/EntityModel';
import {
  mapToHTML,
  mapToLabel,
  printLabel,
} from '../../shared/components/dinamyc-views/DynamicViews.decorators';
import { Role } from './Role.model';

export class User extends EntityModel {
  @printLabel('Nombre')
  name: string;

  @printLabel('Correo')
  email: string;

  password?: string;

  config: object;

  role_id: number;

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
  role: Role;

  constructor(
    id: number,
    created_at: Date,
    updated_at: Date,
    name: string,
    email: string,
    config: object,
    role_id: number,
    online: number,
    locked: number,
    role: Role,
  ) {
    super(id, created_at, updated_at);
    this.name = name;
    this.email = email;
    this.config = config;
    this.role_id = role_id;
    this.online = online;
    this.locked = locked;
    this.role = role;
  }
}
