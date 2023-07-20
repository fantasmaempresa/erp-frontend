import { ViewActions, viewCrud, viewLabel, viewMapTo } from "o2c_core";
import { ClientService } from "../services";
import { ClientDto } from "../dto";
import { ActivatedRoute, Router } from "@angular/router";
import { DEFAULT_ROUTE_CONFIGURATION } from "../../core/constants/routes.constants";

const goToClientLink = new ViewActions<ClientDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(["../", (row as ClientDto).id, "clientsLink"], {
      relativeTo: route
    });
  },
  "people",
  {
    tooltip: "Ver Enlaces",
    isVisible: (row) => row && row.type === 1,
    color: "accent"
  }
);


const goToDocumentsLink = new ViewActions<ClientDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(["../", (row as ClientDto).id, "documentsLink"], {
      relativeTo: route
    });
  },
  "contact_page",
  {
    tooltip: "Expediente de cliente",
    color: "accent",
    isVisible: (row) => row && (row.type === 1 || row.type === 2)
  }
);

@viewCrud({
  classProvider: ClientService,
  registerName: "Cliente",
  actions: [goToClientLink, goToDocumentsLink],
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ClientView {
  @viewLabel("Nombre")
  name: string;

  @viewLabel("Apellido paterno")
  last_name: string;

  @viewLabel("Apellido materno")
  mother_last_name: string;

  @viewLabel("Correo")
  email: string;

  @viewLabel("Teléfono")
  phone: string;

  @viewLabel("Apodo")
  nickname: string;

  @viewLabel("Dirección")
  address: string;

  @viewLabel("RFC")
  rfc: string;

  @viewMapTo((value: any) => {
    const types = {
      1: "Moral",
      2: "Física"
    };
    return types[value as keyof typeof types];
  })
  @viewLabel("Tipo de Persona")
  type: number;

  constructor(
    name: string,
    last_name: string,
    mother_last_name: string,
    email: string,
    phone: string,
    nickname: string,
    address: string,
    rfc: string,
    type: number
  ) {
    this.name = name;
    this.last_name = last_name;
    this.mother_last_name = mother_last_name;
    this.email = email;
    this.phone = phone;
    this.nickname = nickname;
    this.address = address;
    this.rfc = rfc;
    this.type = type;
  }
}
