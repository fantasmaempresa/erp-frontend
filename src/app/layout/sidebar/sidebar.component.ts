import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoleDto, UserDto } from '../../data/dto';
import { selectRole, selectUser } from '../../state/auth';
import { KEY_LS_MENUS } from '../../data/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  // menus = [
  //   {
  //     menuName: 'Menu',
  //     submenus: [
  //       { label: 'Home', route: './dashboard', icon: 'home' },
  //       { label: 'Clientes', route: './clients', icon: 'people' },
  //       { label: 'Personal', route: './staff', icon: 'groups' },
  //       { label: 'Áreas', route: './areas', icon: 'group_work' },
  //       { label: 'Conceptos', route: './concepts', icon: 'group_work' },
  //       {
  //         label: 'Cotizaciones',
  //         icon: 'rule_folder',
  //         isOpen: false,
  //         dropdowns: [
  //           {
  //             label: 'Nueva Cotización',
  //             route: './project-quote/new',
  //             icon: 'add_circle',
  //           },
  //           {
  //             label: 'Lista de cotizaciones',
  //             route: './project-quote',
  //             icon: 'group_work',
  //           },
  //           {
  //             label: 'Estados de la cotización',
  //             route: './quote-statuses',
  //             icon: 'group_work',
  //           },
  //           {
  //             label: 'Plantillas',
  //             route: './project-quote-template',
  //             icon: 'group_work',
  //           },
  //         ],
  //       },
  //       {
  //         label: 'Proyectos',
  //         icon: 'rule_folder',
  //         isOpen: false,
  //         dropdowns: [
  //           { label: 'Fases', route: './process-phase', icon: 'timeline' },
  //           { label: 'Procesos', route: './process', icon: 'pending_actions' },
  //           { label: 'Proyectos', route: './project', icon: 'hub' },
  //           {
  //             label: 'Comenzar Proyecto',
  //             route: './project-start',
  //             icon: 'hub',
  //           },
  //         ],
  //       },
  //       {
  //         label: 'Trámites',
  //         icon: 'description',
  //         isOpen: false,
  //         dropdowns: [
  //           {
  //             label: 'Pendientes',
  //             route: './pending_procedures',
  //             icon: 'pause',
  //           },
  //           {
  //             label: 'En Curso',
  //             route: './ongoing_procedure',
  //             icon: 'play_arrow',
  //           },
  //         ],
  //       },
  //       {
  //         label: 'Configuración',
  //         icon: 'settings',
  //         isOpen: false,
  //         dropdowns: [
  //           { label: 'Usuarios', route: './users', icon: 'person' },
  //           { label: 'Roles', route: './roles', icon: 'verified_user' },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  menus: any[];

  user$: Observable<UserDto | null>;

  role$: Observable<RoleDto | undefined>;

  constructor(private store: Store) {
    this.user$ = store.select(selectUser);
    this.role$ = store.select(selectRole);

    this.menus = [JSON.parse(localStorage.getItem(KEY_LS_MENUS) ?? '[]')];
  }

  dropdown(submenu: any) {
    this.menus.forEach((menu) => {
      menu.submenus.forEach((subMenu: any) => {
        subMenu.isOpen = false;
      });
    });
    submenu.isOpen = true;
  }

  closeSubmenu(submenu: any) {
    submenu.isOpen = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
