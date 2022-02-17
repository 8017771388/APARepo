import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CW_IMAGE_URL, AUTH_URL, DEALSPECIALIST_USER } from '../constants/api-constant';
import { UserInfo } from './userInfo.service';
import { Subscription } from 'rxjs';
import { CommunicationService } from './communication.services';
import { SUCCESS, DEALSPECIALIST } from '../constants/global.constant';

// TODO: Add Angular decorator.
// TODO: Add Angular decorator.
@Injectable()
export class AuthenticationService implements Resolve<any>, OnDestroy {
    Observable1: Subscription;

    pagePath = '';
    constructor(private router: Router, private userInfo: UserInfo, private communicationService: CommunicationService) {}

    resolve(activatedRoute: ActivatedRouteSnapshot): Promise<any> {
        this.pagePath = activatedRoute.routeConfig.path;
        this.userInfo._imageUrl = CW_IMAGE_URL;
        this.userInfo._serviceUrl = AUTH_URL;

        if (sessionStorage.getItem(this.userInfo._storageKey)) {
            const data = this.userInfo._currentUserFromStorage();
            return this.launchApp(data);
        } else {
            return this.initCurrentUser();
        }
    }

    initCurrentUser(): Promise<any> {
        return this.userInfo._getCookieImage().then(
            () => {
                return this.userInfo._getUser().then(
                    data => {
                        return this.launchApp(data);
                    },
                    () => {
                        this.gotoErrorPage();
                    }
                );
            },
            () => {
                this.gotoErrorPage();
            }
        );
    }

    launchApp(data: any) {
        const adGroups = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < data.groups.length; i++) {
            const adGroup = data.groups[i].name.toLowerCase();
            adGroups.push(adGroup.replace('\\', '').toLowerCase());
        }

        // //console.log(adGroups.indexOf(NORMAL_USER.toLowerCase().replace('\\', '')));
        // //console.log(adGroups);
        // //console.log(NORMAL_USER.toLowerCase().replace('\\', ''));

        this.communicationService.setUserInfo(data);
        
        var loginDealSpecialist = adGroups.filter((val) => val == DEALSPECIALIST_USER.toLowerCase().replace('\\', ''));
        //console.log(loginDealSpecialist);

        if (loginDealSpecialist.length > 0) {
            this.communicationService.setAccessType(DEALSPECIALIST);
            this.userInfo.userType = DEALSPECIALIST;
            return new Promise(resolve => resolve(SUCCESS));
        } else {
            this.gotoErrorPage();
        }
    }

    gotoErrorPage() {
        this.communicationService.displayLoader(false);
        this.router.navigate(['/error']);
        return new Promise(resolve => resolve('Error'));
    }

    ngOnDestroy() {
        if (this.Observable1) {
            this.Observable1.unsubscribe();
        }
    }
}
