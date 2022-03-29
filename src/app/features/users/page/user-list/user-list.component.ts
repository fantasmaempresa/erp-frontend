import { Component } from '@angular/core';
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
import { loadNextPageOfUsers, loadUsers } from '../../../../state/users/users.actions';
import { User } from '../../../../data/models/User.model';
import { selectUsers } from '../../../../state/users/users.selector';

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
export class UserListComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private store: Store,
  ) {}

  selectedItem!: any;

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

  actions: ActionsCard[] = [
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
