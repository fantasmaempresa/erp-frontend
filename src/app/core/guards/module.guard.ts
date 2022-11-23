import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ManageModule } from '../classes/modules';

@Injectable({
  providedIn: 'root',
})
export class ModuleGuard implements CanActivateChild {
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const manageModule = new ManageModule(childRoute);
    return manageModule.checkIfRouteAndUserHavePermissions();
  }
}
