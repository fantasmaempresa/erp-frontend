import { ViewActions, viewCrud, viewLabel } from "o2c_core";
import { StaffService } from "../services";
import { DEFAULT_ROUTE_CONFIGURATION } from "../../core/constants/routes.constants";
import { StaffDto } from "../dto";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogAssignUserComponent } from "../../shared/components/dialog-assign-user/dialog-assign-user.component";

const goToAssingUser = new ViewActions<StaffDto>(
  async ({ row, injector }) => {
    const staff = (row as StaffDto);
    const dialog = injector.get(MatDialog);
    dialog.open(DialogAssignUserComponent, {
      data: {
        view: 'staff',
        entity: staff,
      }
    })
  },
  'person_add',
  {
    tooltip: "Asignar Usuario",
    color: "accent",
    isVisible: (row) => row && row.id > 0
  }
);
@viewCrud({
  classProvider: StaffService,
  registerName: 'Miembro de Personal',
  route: DEFAULT_ROUTE_CONFIGURATION,
  actions: [goToAssingUser],
})
export class StaffView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Correo')
  email: string;

  @viewLabel('Teléfono')
  phone: string;

  @viewLabel('Información extra')
  extra_information: string;

  constructor(
    name: string,
    email: string,
    phone: string,
    extra_information: string,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.extra_information = extra_information;
  }
}
