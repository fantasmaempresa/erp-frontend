import { RouterStateSnapshot } from '@angular/router';
import { KEY_LS_MENUS } from '../../data/services';

export class ManageModule {
  constructor(private state: RouterStateSnapshot) {}

  static checkIfUserHavePermission(path: string) {
    const { submenus: userPermission }: { submenus: Array<any> } = JSON.parse(
      localStorage.getItem(KEY_LS_MENUS) ?? `{}`,
    );
    console.log(userPermission, path);

    const somePathExist: Function = (
      menu: Array<{ route: string; dropdown: any[] }>,
    ) =>
      menu.some(({ route, dropdown }) => {
        const realPath = route.replace('./', '');
        return dropdown ? somePathExist(dropdown) : path.includes(realPath);
      });
    return somePathExist(userPermission);
  }

  checkIfRouteAndUserHavePermissions() {
    const path = this.state.url;
    if (!path) return true;
    return ManageModule.checkIfUserHavePermission(path);
  }
}
