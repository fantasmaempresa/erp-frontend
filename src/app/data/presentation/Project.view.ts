import { viewCrud, viewLabel } from 'o2c_core';
import { ProjectService } from '../services';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';

@viewCrud({
  classProvider: ProjectService,
  route: DEFAULT_ROUTE_CONFIGURATION,
  registerName: 'Project',
})
export class ProjectView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Descripción')
  description: string;

  @viewLabel('Fecha')
  estimate_end_date: Date;

  quotes: string;

  @viewLabel('Folio')
  folio: string;

  constructor(
    name: string,
    description: string,
    estimate_end_date: Date,
    quotes: string,
    folio: string,
  ) {
    this.name = name;
    this.description = description;
    this.estimate_end_date = estimate_end_date;
    this.quotes = quotes;
    this.folio = folio;
  }

  static mapToProcessOnChange(config: any[]) {
    return config.map(({ process, phases }: any) => {
      return {
        process,
        phases: phases.map(
          ({
            phase,
            supervisor,
            supervisor_user,
            work_group,
            work_user,
          }: any) => ({
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
        const { supervisor: supervisorUsers, work_group: workUsers } =
          processPhase[i][j];
        console.log('supervisor, work_group', supervisor, work_group, processPhase);
        return {
          supervisor_reference: supervisor
            .filter(({ user }: { user: boolean }) => user)
            .map(({ id }: { id: number }) =>{
              console.log('supervisorUsers -->', supervisorUsers);
              return supervisorUsers.find((element: any) => element.id === id);
            }
            ),
          supervisor: supervisor.filter(({ user }: { user: boolean }) => !user),
          supervisor_user: supervisor.filter(
            ({ user }: { user: boolean }) => user,
          ),
          work_reference: work_group
            .filter(({ user }: { user: boolean }) => user)
            .map(({ id }: { id: number }) =>
              workUsers.find((element: any) => element.id === id),
            ),
          work_group: work_group.filter(({ user }: { user: boolean }) => !user),
          work_user: work_group.filter(({ user }: { user: boolean }) => user),
        };
      }),
    }));
  }
}
