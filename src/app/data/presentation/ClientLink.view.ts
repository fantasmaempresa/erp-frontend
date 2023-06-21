import { ViewActions, viewCrud, viewLabel } from "o2c_core";
import { ClientLinkService } from "../services";
import { DEFAULT_ROUTE_CONFIGURATION } from "../../core/constants/routes.constants";
import { ClientLinkDto } from "../dto";
import { ActivatedRoute, Router } from "@angular/router";

const goToDocumentsLink = new ViewActions<ClientLinkDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(["../", (row as ClientLinkDto).id, "documentsLink"], {
      relativeTo: route,
    });
  },
  "contact_page",
  {
    tooltip: "Expediente de cliente",
    color: "accent",
    isVisible: (row) => row && (row.id > 0)
  }
);
@viewCrud({
  classProvider: ClientLinkService,
  route: DEFAULT_ROUTE_CONFIGURATION,
  registerName: 'Enlace',
  actions: [goToDocumentsLink],
})
export class ClientLinkView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Correo')
  email: string;

  @viewLabel('Teléfono')
  phone: string;

  @viewLabel('Nombre')
  nickname: string;

  @viewLabel('Dirección')
  address: string;

  @viewLabel('RFC')
  rfc: string;

  @viewLabel('Profesión')
  profession: string;

  @viewLabel('Grado de Estudios')
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
