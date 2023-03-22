import { viewCrud, viewLabel } from 'o2c_core';
import { ProcessService } from '../services';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';

@viewCrud({
  classProvider: ProcessService,
  route: DEFAULT_ROUTE_CONFIGURATION,
  registerName: 'Proceso',
})
export class ProcessView {
  @viewLabel('Nombre')
  name!: string;

  @viewLabel('Descripción')
  description: string;

  config: string;

  constructor(name: string, description: string, config: string) {
    this.name = name;
    this.description = description;
    this.config = config;
  }

  static mapConfigOnChange(order: any, phases_process: any[]) {
    const { order_phases: orderPhase } = order;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const order_phases = phases_process.reduce((acc, current, index) => {
      const { id } = current;
      const previousId = orderPhase[index].previous ?? null;

      return [
        ...acc,
        {
          phase: { id },
          previous: {
            phase: previousId ? { id: previousId } : null,
          },
          end_process: orderPhase[index].end_process,
          order: index + 1,
          involved: {
            supervisor: orderPhase[index].roles_supervision
              ? orderPhase[index].roles_supervision
              : [],
            work_group: orderPhase[index].roles_team
              ? orderPhase[index].roles_team
              : [],
          },
        },
      ];
    }, []);
    return {
      order_phases,
      phases_process: phases_process.map(({ id }) => ({ id })),
    };
  }

  static mapConfigOnWrite({
    order_phases,
    phases_process,
  }: {
    order_phases: any[];
    phases_process: any[];
  }) {
    console.log(order_phases);
    return {
      order_phases: order_phases.map(
        ({
          end_process,
          previous: { phase },
          involved: { supervisor, work_group },
        }: {
          end_process: boolean;
          previous: { phase: any };
          involved: { supervisor: any[]; work_group: any[] };
        }) => ({
          end_process,
          previous: !!phase ? phase.id : null,
          roles_supervision: supervisor,
          roles_team: work_group,
        }),
      ),
      phases_process,
    };
  }
}
