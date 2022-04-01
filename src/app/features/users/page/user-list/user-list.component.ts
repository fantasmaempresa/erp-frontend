import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { EntityModel } from '../../../../core/interfaces/EntityModel';
import { ActionsCard } from '../../../../shared/components/dinamyc-views/card-view/card-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from '../../../../data/services/user.service';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dinamyc-views/dynamic-views.module';
import { Class2ViewBuilderService } from '../../../../shared/components/dinamyc-views/services/class2-view-builder.service';
import {
  loadNextPageOfUsers,
  loadUsers,
  startToListenUsers,
  stopToListenUsers,
} from '../../../../state/users/users.actions';
import { User } from '../../../../data/models/User.model';
import { selectUsers } from '../../../../state/users/users.selector';
import { selectUser } from '../../../../state/auth/auth.selector';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [
    { provide: SELECTOR, useValue: selectUsers },
    { provide: CLAZZ, useValue: User },
    { provide: LOAD_ACTION, useValue: loadUsers() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfUsers },
    Class2ViewBuilderService,
  ],
})
export class UserListComponent implements OnInit, OnDestroy {
  selectedItem!: any;

  currentUser$!: Observable<User | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private store: Store,
  ) {
    this.currentUser$ = this.store.select(selectUser);
  }

  ngOnDestroy(): void {
    this.store.dispatch(stopToListenUsers());
  }

  ngOnInit(): void {
    this.store.dispatch(startToListenUsers());
  }

  setSelectedItem = (item: EntityModel) => {
    this.selectedItem = item;
  };

  goToEditForm = async () => {
    await this.router.navigate([`../user`], {
      queryParams: { id: this.selectedItem.id },
      relativeTo: this.route,
    });
  };

  goToAddForm = async () => {
    await this.router.navigate(['../new'], {
      relativeTo: this.route,
    });
  };

  delete = () => {
    MessageHelper.decisionMessage(
      `¿Deseas borrar al usuario ${this.selectedItem.name}?`,
      'Una vez borrado no hay marcha atrás.',
      () => {
        this.userService.delete(this.selectedItem.id).subscribe({
          next: () => this.store.dispatch(loadUsers()),
        });
      },
    );
  };

  powerOff = () => {
    MessageHelper.decisionMessage(
      '¿Estas seguro de realizar esta acción?',
      `El usuario [${this.selectedItem?.name}] sera expulsado de su sesión`,
      () => {
        const shouldBlockUser = (locked: boolean) => {
          this.authService.closeSystem(this.selectedItem.id, locked).subscribe({
            next: () => {
              MessageHelper.successMessage('Éxito', 'La sesión del Usuario finalizo');
            },
            error: () => {
              MessageHelper.errorMessage('Ocurrió un error');
            },
          });
        };

        MessageHelper.decisionMessage(
          'Bloquear Usuario',
          '¿Deseas bloquear al usuario?',
          () => {
            shouldBlockUser(true);
          },
          () => {
            shouldBlockUser(false);
          },
        );
      },
    );
  };

  blockUser = () => {
    MessageHelper.decisionMessage(
      '¿Estas seguro de realizar esta acción?',
      `El usuario [${this.selectedItem?.name}] sera bloqueado`,
      () => {
        this.authService.setLockStatus(this.selectedItem.id, 'locked').subscribe({
          next: () => {
            MessageHelper.successMessage('Éxito', `[${this.selectedItem?.name}] ha sido bloqueado`);
          },
          error: () => {
            MessageHelper.errorMessage('Ocurrió un error');
          },
        });
      },
    );
  };

  unlockUser = () => {
    MessageHelper.decisionMessage(
      '¿Estas seguro de realizar esta acción?',
      `El usuario [${this.selectedItem?.name}] sera desbloqueado`,
      () => {
        this.authService.setLockStatus(this.selectedItem.id, 'unlocked').subscribe({
          next: () => {
            MessageHelper.successMessage(
              'Éxito',
              `[${this.selectedItem?.name}] ha sido desbloqueado`,
            );
          },
          error: () => {
            MessageHelper.errorMessage('Ocurrió un error');
          },
        });
      },
    );
  };

  actions: ActionsCard[] = [
    {
      icon: 'lock',
      callback: async (item: any) => {
        this.selectedItem = item;
        await this.blockUser();
      },
      tooltip: 'Bloquear Usuario',
    },
    {
      icon: 'lock_open',
      callback: async (item: any) => {
        this.selectedItem = item;
        await this.unlockUser();
      },
      tooltip: 'Desbloquear Usuario',
    },
    {
      icon: 'power_off',
      callback: async (item: any) => {
        this.selectedItem = item;
        await this.powerOff();
      },
      tooltip: 'Expulsar Usuario',
    },
    {
      icon: 'edit',
      callback: async (item: any) => {
        this.selectedItem = item;
        await this.goToEditForm();
      },
      tooltip: 'Editar Usuario',
    },
    {
      icon: 'delete',
      callback: (item: any) => {
        this.selectedItem = item;
        this.delete();
      },
      tooltip: 'Eliminar Usuario',
    },
  ];
}
