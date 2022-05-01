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

  static mapConfig(order: any, phases_process: any[]) {
    const { order_phases: orderPhase } = order;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const order_phases = phases_process.reduce((acc, current, index) => {
      const { id } = current;
      const previousId = orderPhase[index].previous ?? null;
      const next = index + 1 <= phases_process.length ? phases_process[index + 1] : null;

      return [
        ...acc,
        {
          phase: { id },
          next: { phase: next ? { id: next.id } : null },
          previous: {
            phase: previousId ? { id: previousId } : null,
          },
          end_process: orderPhase[index].end_process,
        },
      ];
    }, []);
    return { order_phases, phases_process: phases_process.map(({ id }) => ({ id })) };
  }
}
