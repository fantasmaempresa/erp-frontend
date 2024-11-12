import { viewCrud, viewHTML, viewLabel, viewMapTo } from 'o2c_core';
import { ProjectService } from '../services';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { ClientDto, ProcedureDto, ProjectQuoteDto, StaffDto } from '../dto';

@viewCrud({
  classProvider: ProjectService,
  route: DEFAULT_ROUTE_CONFIGURATION,
  registerName: 'Project',
})
export class ProjectView {
  name: string;
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

  @viewLabel('Estado')
  @viewHTML((finished: any) => {
    let html = '';
    switch (finished) {
      case 0:
        html =
          '<span style="padding: 1rem; background: #0d2b3e; color: #eee ; border-radius: 10px; font-size: 1rem;">No Finalizado</span>';
        break;
      case 1:
        html =
          '<span style="padding: 1rem; background: #a30808; color: #eee ; border-radius: 10px; font-size: 1rem;">Finalizado</span>';
        break;
      case 2:
        html =
          '<span style="padding: 1rem; background: #0d2b3e; color: #eee ; border-radius: 10px; font-size: 1rem;">En progreso</span>';
        break;
      case 3:
        html =
          '<span style="padding: 1rem; background: #dfc356; color: #eee ; border-radius: 10px; font-size: 1rem;">Sin comenzar</span>';
        break;
    }

    return html;
  })
  finished: number;

  @viewLabel('Proceso')
  @viewHTML((type_project: any) => {
    let html = '';
    switch (type_project) {
      case 1:
        html =
          '<span style="padding: 1rem; background: #0d2b3e; color: #eee ; border-radius: 10px; font-size: 1rem;">Escritura Pública</span>';
        break;
      case 2:
        html =
          '<span style="padding: 1rem; background: #dfc356; color: #eee ; border-radius: 10px; font-size: 1rem;">Acta Notarial</span>';
        break;
    }

    return html;
  })
  type_project: number;

  constructor(
    name: string,
    description: string,
    procedure: ProcedureDto,
    staff: StaffDto,
    client: ClientDto,
    project_quote: ProjectQuoteDto,
    finished: number,
    type_project: number
  ) {
    this.name = name;
    this.description = description;
    this.procedure = procedure;
    this.staff = staff;
    this.client = client;
    this.project_quote = project_quote;
    this.type_project = type_project;
    this.finished = finished;
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
