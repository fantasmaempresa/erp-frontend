import { MessageHelper, ViewActions, ViewContextService, viewCrud, viewLabel, viewMapTo } from 'o2c_core';
import { DEFAULT_ROUTE_CONFIGURATION } from '../../core/constants/routes.constants';
import { ReminderService } from '../services/reminder.service';
import { DatePipe } from '@angular/common';
import { UserDto } from '../dto';
import { ReminderDto } from '../dto/Reminder.dto';

const enableDisableReminder = new ViewActions<ReminderDto>(
  async ({ row, injector }) => {
    const reminder = row as ReminderDto;
    const reminderService = injector.get(ReminderService);

    const callback = (id: number) => {
      reminderService.enableDisable(id).subscribe({
        next: async (item) => {
          await MessageHelper.successMessage(
            'Éxito!',
            item.status == 3 ? 'Se activó el recordatorio exitosamente' : 'Se desactivó el recordatorio exitosamente',
          );
          const viewContextService = injector.get(ViewContextService);
          viewContextService.reloadView();
        },
        error: async () => {
          await MessageHelper.errorMessage('Error al cambiar de estado');
        },
      });
    };


    MessageHelper.decisionMessage(
      'Camibiar de estado',
      reminder.status == 3 ? '¿Desea activar el recordatorio?' : '¿Desea desactivar el recordatorio?',
      callback.bind(this, reminder.id),
    );

  },
  'power',
  {
    tooltip: 'Cambiar de estado',
    color: 'accent',
    isVisible: (row: ReminderDto) => row && row.id !== null,
  },
);


@viewCrud({
  classProvider: ReminderService,
  registerName: 'Recordatorios',
  route: DEFAULT_ROUTE_CONFIGURATION,
  actions: [enableDisableReminder]
})
export class ReminderView {
  @viewLabel('Nombre')
  name: string;

  @viewLabel('Mensaje')
  message: string;

  @viewLabel('Satus')
  @viewMapTo((value: any) => {
    let menssage = '';
    switch (value) {
      case 0: menssage = 'No notificada'; break;
      case 1: menssage = 'Notificada'; break;
      case 2: menssage = 'Expirada'; break;
      case 3: menssage = 'Desactivada'; break;
      default: menssage = 'Desconocido'; break;
    }

    return menssage;
  })
  status: number;

  @viewLabel('Tipo')
  @viewMapTo((value: any) => {
    let menssage = '';
    switch (value) {
      case 1: menssage = 'Notificación de gestión en curso'; break;
      case 2: menssage = 'Notificación de expediente'; break;
      case 3: menssage = 'Notificación de general'; break;
      default: menssage = 'Notificación desconocida'; break;
    }

    return menssage;
  })
  type: number;

  @viewLabel('Expira')
  @viewMapTo((value: any) => {
    const datePipe = new DatePipe('en-MX');
    return datePipe.transform(value, 'dd-MM-yyyy');
  })
  expiration_date: Date;

  @viewLabel('Usuario')
  @viewMapTo((value: any) => value.email ?? 'Notificación general')
  user: UserDto;

  @viewLabel('Creada')
  @viewMapTo((value: any) => {
    const datePipe = new DatePipe('en-MX');
    return datePipe.transform(value, 'dd-MM-yyyy');
  })
  created_at: Date;

  constructor(
    name: string,
    message: string,
    status: number,
    type: number,
    expiration_date: Date,
    created_at: Date,
    user: UserDto,
  ) {
    this.name = name;
    this.message = message;
    this.user = user;
    this.status = status;
    this.type = type;
    this.expiration_date = expiration_date;
    this.created_at = created_at;
  }
}
