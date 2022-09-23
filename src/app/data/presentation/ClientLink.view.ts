import { printLabel } from '../../shared/components/dynamic-views/DynamicViews.decorators';

export class ClientLinkView {
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

  constructor(
    name: string,
    email: string,
    phone: string,
    nickname: string,
    address: string,
    rfc: string,
    profession: string,
    degree: string,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.nickname = nickname;
    this.address = address;
    this.rfc = rfc;
    this.profession = profession;
    this.degree = degree;
  }
}
