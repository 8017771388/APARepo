import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
//import { STORAGE_KEY } from '../constants/global.constant';
import { CommunicationService } from '../services/communication.services';

@Injectable()
export class AuthGuardService implements CanActivate {
    private accessType : any;
    constructor(private router: Router, private communicationService: CommunicationService) {
        this.communicationService.getAccessType().subscribe(accesstype => this.accessType = accesstype);
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        //const getUserDetails = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
        // //console.log(getUserDetails);
        ////console.log(this.communicationService.getAccessType());
        ////console.log(route.data.role);        
        
        ////console.log((route.data.role).indexOf(this.accessType));
        if (route.data.role && (route.data.role || []).indexOf(this.accessType) <= -1) {
            this.router.navigate(['error']);
            return false;
        }
        return true;
    }
}
