import { ActivatedRouteSnapshot } from '@angular/router';
import { KEY_LS_PERMISSIONS } from '../../data/services';

export enum Modules {
  CLIENTS = 'clients',
  STAFF = 'staff',
  AREAS = 'areas',
  CONCEPTS = 'concepts',
  PROCEDURES = 'procedures',
  PROJECTS = 'projects',
  SETTINGS = 'settings',
}

export class ManageModule {
  constructor(private route: ActivatedRouteSnapshot) {}

  static checkIfUserHavePermission(permission: Array<Modules>) {
    const userPermission: Array<any> = JSON.parse(
      localStorage.getItem(KEY_LS_PERMISSIONS) ?? `[]`,
    );

    return userPermission
      .map(({ route }: { route: string }) => route.replace('./', '') as Modules)
      .some((module: Modules) => permission.includes(module));
  }

  checkIfRouteAndUserHavePermissions() {
    const { permission: routePermission } = this.route.data;
    if (!routePermission) return true;
    return ManageModule.checkIfUserHavePermission(routePermission);
  }

  static setModulePermission(...modules: Modules[]) {
    return {
      permission: modules,
    };
  }
}
