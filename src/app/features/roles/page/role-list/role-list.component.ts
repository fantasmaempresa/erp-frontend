import { Component } from '@angular/core';
import {
  CLAZZ,
  LOAD_ACTION,
  LOAD_NEXT_ACTION,
  SELECTOR,
} from '../../../../shared/components/dynamic-views/dynamic-views.module';
import { selectRoles } from '../../../../state/role/role.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EntityDto } from '../../../../core/interfaces/Entity.dto';
import { MessageHelper } from '../../../../shared/helpers/MessageHelper';
import { ActionsCard } from '../../../../shared/components/dynamic-views/card-view/card-view.component';
import {
  loadNextPageOfRoles,
  loadRoles,
} from '../../../../state/role/role.actions';
import { RoleService } from '../../../../data/services/role.service';
import { RoleView } from '../../../../data/presentation/Role.view';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  providers: [
    { provide: SELECTOR, useValue: selectRoles },
    { provide: CLAZZ, useValue: RoleView },
    { provide: LOAD_ACTION, useValue: loadRoles() },
    { provide: LOAD_NEXT_ACTION, useValue: loadNextPageOfRoles },
  ],
})
export class RoleListComponent {
  selectedItem!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private store: Store,
  ) {}

  setSelectedItem = (item: EntityDto) => {
    this.selectedItem = item;
  };

  goToEditForm = async () => {
    await this.router.navigate([`../role`], {
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
      `¿Deseas borrar al Rol ${this.selectedItem.name}?`,
      'Una vez borrado no hay marcha atrás.',
      () => {
        this.roleService.delete(this.selectedItem.id).subscribe({
          next: () => this.store.dispatch(loadRoles()),
        });
      },
    );
  };

  actions: ActionsCard[] = [
    {
      icon: 'edit',
      callback: async (item: any) => {
        this.selectedItem = item;
        await this.goToEditForm();
      },
      tooltip: 'Editar Rol',
    },
    {
      icon: 'delete',
      callback: (item: any) => {
        this.selectedItem = item;
        this.delete();
      },
      tooltip: 'Eliminar Rol',
    },
  ];
}
