import { Client } from './Client.model';
import { User } from './User.model';
import { EntityModel } from '../../core/interfaces/EntityModel';
import { printLabel } from '../../shared/components/dinamyc-views/DynamicViews.decorators';

export class Project extends EntityModel {
  @printLabel('Nombre')
  name: string;

  @printLabel('Descripción')
  description: string;

  @printLabel('Fecha')
  estimate_end_date: Date;

  quotes: string;

  @printLabel('Folio')
  folio: string;

  user: User;

  client?: Client;

  constructor(
    id: number,
    created_at: Date,
    updated_at: Date,
    name: string,
    description: string,
    estimate_end_date: Date,
    quotes: string,
    folio: string,
    user: User,
    client?: Client,
  ) {
    super(id, created_at, updated_at);
    this.name = name;
    this.description = description;
    this.estimate_end_date = estimate_end_date;
    this.quotes = quotes;
    this.folio = folio;
    this.user = user;
    this.client = client;
  }

  static mapToProcessOnChange(config: any[]) {
    return config.map(({ process, phases }: any) => {
      return {
        process,
        phases: phases.map(
          ({ phase, supervisor, supervisor_user, work_group, work_user }: any) => ({
            phase,
            involved: {
              supervisor: [...supervisor, ...supervisor_user],
              work_group: [...work_group, ...work_user],
            },
          }),
        ),
      };
    });
  }

  static mapToProcessOnWrite(config: any[], processPhase: any[]) {
    return config.map(({ phases }, i: number) => ({
      phases: phases.map(({ involved }: any, j: number) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { supervisor, work_group } = involved;
        const { supervisor: supervisorUsers, work_group: workUsers } = processPhase[i][j];
        return {
          supervisor_reference: supervisor
            .filter(({ user }: { user: boolean }) => user)
            .map(({ id }: { id: number }) =>
              supervisorUsers.find((element: any) => element.id === id),
            ),
          supervisor: supervisor.filter(({ user }: { user: boolean }) => !user),
          supervisor_user: supervisor.filter(({ user }: { user: boolean }) => user),
          work_reference: work_group
            .filter(({ user }: { user: boolean }) => user)
            .map(({ id }: { id: number }) => workUsers.find((element: any) => element.id === id)),
          work_group: work_group.filter(({ user }: { user: boolean }) => !user),
          work_user: work_group.filter(({ user }: { user: boolean }) => user),
        };
      }),
    }));
  }
}
