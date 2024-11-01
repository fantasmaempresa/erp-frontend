import { viewCrud, viewLabel, viewMapTo } from 'o2c_core';
import { ProjectService } from '../services';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { ClientDto, ProcedureDto, ProjectQuoteDto, StaffDto } from '../dto';

@viewCrud({
  classProvider: ProjectService,
  route: DEFAULT_ROUTE_CONFIGURATION,
  registerName: 'Project',
})
export class ProjectView {
  // @viewLabel('Nombre')
  name: string;

  // @viewLabel('Descripción')
  description: string;


  @viewLabel('Responsable')
  @viewMapTo((staff: any) => `${staff.name} ${staff.last_name} ${staff.mother_last_name}`)
  staff: StaffDto;

  @viewLabel('Expediente')
  @viewMapTo((procedure: any) => procedure ? `${procedure.name}` : 'Sin expediente asignado')
  procedure: ProcedureDto;

  @viewLabel('Cliente')
  @viewMapTo((client: any) => `${client.name} ${client.last_name} ${client.mother_last_name}`)
  client: ClientDto;

  @viewLabel('Cotización')
  @viewMapTo((projectQuote: any) => `${projectQuote.name}`)
  project_quote: ProjectQuoteDto;

  constructor(
    name: string,
    description: string,
    procedure: ProcedureDto,
    staff: StaffDto,
    client: ClientDto,
    project_quote: ProjectQuoteDto
  ) {
    this.name = name;
    this.description = description;
    this.procedure = procedure;
    this.staff = staff;
    this.client = client;
    this.project_quote = project_quote;
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
            .map(({ id }: { id: number }) => {
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
