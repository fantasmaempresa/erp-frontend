import {
  mapToLabel,
  printLabel,
} from '../../shared/components/dinamyc-views/DynamicViews.decorators';

export class ClientView {
  @printLabel('Nombre')
  name: string;

  @printLabel('Correo')
  email: string;

  @printLabel('Teléfono')
  phone: string;

  @printLabel('Apodo')
  nickname: string;

  @printLabel('Dirección')
  address: string;

  @printLabel('RFC')
  rfc: string;

  @mapToLabel((value: any) => {
    const types = {
      1: 'Moral',
      2: 'Física',
    };
    return types[value as keyof typeof types];
  })
  @printLabel('Tipo de Persona')
  type: number;

  constructor(
    name: string,
    email: string,
    phone: string,
    nickname: string,
    address: string,
    rfc: string,
    type: number,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.nickname = nickname;
    this.address = address;
    this.rfc = rfc;
    this.type = type;
  }
}
