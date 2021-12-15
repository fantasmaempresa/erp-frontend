import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menus = [
    {
      menuName: 'Menu',
      submenus: [
        { label: 'Home', route: '/dashboard', icon: 'home' },
        // { label: 'Usuarios', route: '/users', icon: 'person' },
        // { label: 'Roles', route: '/roles', icon: 'verified_user' },
        { label: 'Clientes', route: '/clients', icon: 'people' },
        { label: 'Personal', route: '/staff', icon: 'groups' },
        { label: 'Áreas', route: '/areas', icon: 'group_work' },
        { label: 'Conceptos', route: '/concepts', icon: 'group_work' },
        { label: 'Estados de la cotización', route: '/quote-statuses', icon: 'group_work' },
        {
          label: 'Proyectos',
          icon: 'rule_folder',
          isOpen: false,
          dropdowns: [
            { label: 'Pendientes', route: '/pending_projects', icon: 'pause' },
            { label: 'En Curso', route: '/ongoing_projects', icon: 'play_arrow' },
          ],
        },
        {
          label: 'Trámites',
          icon: 'description',
          isOpen: false,
          dropdowns: [
            { label: 'Pendientes', route: '/pending_procedures', icon: 'pause' },
            { label: 'En Curso', route: '/ongoing_procedure', icon: 'play_arrow' },
          ],
        },
        {
          label: 'Configuración',
          icon: 'settings',
          isOpen: false,
          dropdowns: [
            { label: 'Usuarios', route: '/users', icon: 'person' },
            { label: 'Roles', route: '/roles', icon: 'verified_user' },
          ],
        },
      ],
    },
  ];

  dropdown(submenu: any) {
    this.menus.forEach((menu) => {
      menu.submenus.forEach((subMenu) => {
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
