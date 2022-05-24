import { EntityModel } from '../../core/interfaces/EntityModel';
import { printLabel } from '../../shared/components/dinamyc-views/DynamicViews.decorators';

export class Process extends EntityModel {
  @printLabel('Nombre')
  name: string;

  @printLabel('Descripción')
  description: string;

  config: string;

  constructor(
    id: number,
    created_at: Date,
    updated_at: Date,
    name: string,
    description: string,
    config: string,
  ) {
    super(id, created_at, updated_at);
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
        },
      ];
    }, []);
    return { order_phases, phases_process: phases_process.map(({ id }) => ({ id })) };
  }

  static mapConfigOnWrite({
    order_phases,
    phases_process,
  }: {
    order_phases: any[];
    phases_process: any[];
  }) {
    return {
      order_phases: order_phases.map(
        ({
          end_process,
          previous: { phase },
        }: {
          end_process: boolean;
          previous: { phase: any };
        }) => ({
          end_process,
          previous: !!phase ? phase.id : null,
        }),
      ),
      phases_process,
    };
  }
}
