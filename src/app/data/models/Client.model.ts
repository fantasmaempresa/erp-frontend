import { User } from './User.model';
import { EntityModel } from '../../core/interfaces/EntityModel';
import {
  mapToLabel,
  printLabel,
} from '../../shared/components/dinamyc-views/DynamicViews.decorators';

export class Client extends EntityModel {
  @printLabel('Nombre')
  public name: string;

  @printLabel('Correo')
  public email: string;

  @printLabel('Teléfono')
  public phone: string;

  @printLabel('Apodo')
  public nickname: string;

  @printLabel('Dirección')
  public address: string;

  @printLabel('RFC')
  public rfc: string;

  public extra_information: string;

  @mapToLabel((value: any) => {
    const types = {
      1: 'Moral',
      2: 'Física',
    };
    return types[value as keyof typeof types];
  })
  @printLabel('Tipo de Persona')
  public type: number;

  public user?: User;

  public updated_at?: Date;

  public created_at?: Date;

  public id: number = 0;

  constructor(
    id: number,
    name: string,
    email: string,
    phone: string,
    nickname: string,
    address: string,
    rfc: string,
    extra_information: string,
    type: number,
    user?: User,
    updated_at?: Date,
    created_at?: Date,
  ) {
    super(id, created_at, updated_at);
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.nickname = nickname;
    this.address = address;
    this.rfc = rfc;
    this.extra_information = extra_information;
    this.type = type;
    this.user = user;
  }
}
