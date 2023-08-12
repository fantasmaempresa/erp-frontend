import { ViewActions, viewCrud, viewLabel } from "o2c_core";
import { DEFAULT_ROUTE_CONFIGURATION } from "../../core/constants/routes.constants";
import { ProcedureService } from "../services/procedure.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ProcedureDto } from "../dto";

const goToDocumentsLink = new ViewActions<ProcedureDto>(
  async ({ row, injector }) => {
    const router = injector.get(Router);
    const route = injector.get(ActivatedRoute);
    await router.navigate(["../", (row as ProcedureDto).id, "documentsLink"], {
      relativeTo: route
    });
  },
  "contact_page",
  {
    tooltip: "Expediente de trámite",
    color: "accent",
    isVisible: (row) => (row.id > 0)
  }
);
@viewCrud({
  classProvider: ProcedureService,
  registerName: 'Trámites',
  actions: [goToDocumentsLink],
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class ProcedureView {
  @viewLabel('Expediente')
  name: string;

  @viewLabel('Valor de operación')
  value_operation: number;

  @viewLabel('Fecha')
  date_proceedings: string;

  @viewLabel('Instrumento')
  instrument: string;

  @viewLabel('Fecha')
  date: string;

  @viewLabel('Volumen')
  volume: string;

  @viewLabel('Folio de inicio')
  folio_min: number;

  @viewLabel('Folio de final')
  folio_max: number;

  @viewLabel('Credito')
  credit: string;

  observation: string;

  operation_id: number;

  user_id: number;

  place_id: number;

  client_id: number;

  staff_id: number;

  constructor(
    name: string,
    value_operation: number,
    date_proceedings: string,
    instrument: string,
    date: string,
    volume: string,
    folio_min: number,
    folio_max: number,
    credit: string,
    observation: string,
    operation_id: number,
    user_id: number,
    place_id: number,
    client_id: number,
    staff_id: number,
  ) {
    this.name = name;
    this.value_operation = value_operation;
    this.date_proceedings = date_proceedings;
    this.instrument = instrument;
    this.date = date;
    this.volume = volume;
    this.folio_min = folio_min;
    this.folio_max = folio_max;
    this.credit = credit;
    this.observation = observation;
    this.operation_id = operation_id;
    this.user_id = user_id;
    this.place_id = place_id;
    this.client_id = client_id;
    this.staff_id = staff_id;
  }
}
