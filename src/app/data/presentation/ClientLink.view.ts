import {
  MessageHelper,
  ViewActions,
  ViewContextService,
  viewCrud,
  viewHTML,
  viewLabel,
} from 'o2c_core';
import { ClientLinkService } from '../services';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { ClientLinkDto } from '../dto';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

const activeClientLink = new ViewActions<ClientLinkDto>(
  async ({ row, injector }) => {
    const clientLinkService = injector.get(ClientLinkService);
    Swal.showLoading();
    clientLinkService.activeClientLink((row as ClientLinkDto).id).subscribe({
      next: (response) => {
        MessageHelper.successMessage(
          'Éxito!',
          'Se activo el enlace exitosamente',
        );
        const viewContextService = injector.get(ViewContextService);
        viewContextService.reloadView();
      },
      error: () => {
        MessageHelper.errorMessage(
          'Error!',
          'No se pudo procesar la actualización',
        );
      },
    });
  },
  'toggle_on',
  {
    tooltip: 'Activar enlace',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

const goToDocumentsLink = new ViewActions<ClientLinkDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(['../', (row as ClientLinkDto).id, 'documentsLink'], {
      relativeTo: route,
    });
  },
  'contact_page',
  {
    tooltip: 'Expediente de cliente',
    color: 'accent',
    isVisible: (row) => row && row.id > 0,
  },
);

@viewCrud({
  classProvider: ClientLinkService,
  route: DEFAULT_ROUTE_CONFIGURATION,
  registerName: 'Enlace',
  actions: [activeClientLink, goToDocumentsLink],
})
export class ClientLinkView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Apellido Paterno')
  last_name: string;

  @viewLabel('Apellido Materno')
  mother_last_name: string;

  @viewLabel('Correo')
  email: string;

  @viewLabel('Teléfono')
  phone: string;

  @viewLabel('Apodo')
  nickname: string;

  // @viewLabel('Dirección')
  address: string;

  @viewLabel('RFC')
  rfc: string;

  // @viewLabel('Profesión')
  profession: string;

  // @viewLabel('Grado de Estudios')
  degree: string;

  @viewLabel('Enlace vigente')
  @viewHTML((online) => {
    const status = {
      1: '#3be30e', //Enlace Actual
      0: '#f91a1a', //Enlace viejo
    };
    // @ts-ignore
    return `<div style=" display: inline-block ;padding: 1.25rem; background: ${status[online]};margin-top: 1rem; border-radius: 50%"></div>`;
  })
  active: number;

  constructor(
    name: string,
    last_name: string,
    mother_last_name: string,
    email: string,
    phone: string,
    nickname: string,
    address: string,
    rfc: string,
    profession: string,
    degree: string,
    active: number,
  ) {
    this.name = name;
    this.last_name = last_name;
    this.mother_last_name = mother_last_name;
    this.email = email;
    this.phone = phone;
    this.nickname = nickname;
    this.address = address;
    this.rfc = rfc;
    this.profession = profession;
    this.degree = degree;
    this.active = active;
  }
}
