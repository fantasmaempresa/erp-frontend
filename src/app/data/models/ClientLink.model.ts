import { EntityModel } from '../../core/interfaces/EntityModel';
import { printLabel } from '../../shared/components/dinamyc-views/DynamicViews.decorators';

export class ClientLink extends EntityModel {
  @printLabel('Nombre')
  name: string;

  @printLabel('Correo')
  email: string;

  @printLabel('Teléfono')
  phone: string;

  @printLabel('Nombre')
  nickname: string;

  @printLabel('Dirección')
  address: string;

  @printLabel('RFC')
  rfc: string;

  @printLabel('Profesión')
  profession: string;

  @printLabel('Grado de Estudios')
  degree: string;

  client_id: number;

  constructor(
    id: number,
    created_at: Date,
    updated_at: Date,
    name: string,
    email: string,
    phone: string,
    nickname: string,
    address: string,
    rfc: string,
    profession: string,
    degree: string,
    client_id: number,
  ) {
    super(id, created_at, updated_at);
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.nickname = nickname;
    this.address = address;
    this.rfc = rfc;
    this.profession = profession;
    this.degree = degree;
    this.client_id = client_id;
  }
}
