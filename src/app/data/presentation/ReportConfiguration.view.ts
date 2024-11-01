import { viewActions, viewLabel } from 'o2c_core';
import { ReportConfigurationService } from '../services/report-configuration.service';

@viewActions({
  classProvider: ReportConfigurationService,
  actions: []
})
export class ReportConfigurationView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Creado')
  created_at: string  


  constructor(name: string, created_at: string) {
    this.name = name;
    this.created_at = created_at;
  }
}
