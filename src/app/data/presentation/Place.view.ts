import { viewCrud, viewLabel } from "o2c_core";
import { DEFAULT_ROUTE_CONFIGURATION } from "../../core/constants/routes.constants";
import { PlaceService } from "../services/place.service";


@viewCrud({
  classProvider: PlaceService,
  registerName: "Lugares",
  route: DEFAULT_ROUTE_CONFIGURATION,
})
export class PlaceView {
  @viewLabel("Nombre")
  name: string;

  constructor(
    name: string,
  ) {
    this.name = name;
  }
}
