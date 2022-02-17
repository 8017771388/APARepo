import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DirtyComponent } from '../models/dirty-component';
//import { CommunicationService } from "../../_shared/services/communication.services";

@Injectable({
  providedIn: 'root'
})
export class DirtyCheckGuard implements CanDeactivate<DirtyComponent> {

  canDeactivate(
    component: DirtyComponent,
      next: ActivatedRouteSnapshot,
      //cs: CommunicationService,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(component.canDeactivate());
      if (component.canDeactivate()) {
         // cs.clearIsDirty();
        return confirm('There are changes you have made to the page. If you quit, you will lose your changes.');

    } else {
      return true;
    }
  }

}
