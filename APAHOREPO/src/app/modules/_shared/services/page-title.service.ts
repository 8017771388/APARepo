import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class PageTitle {

    private pageTitleObs: BehaviorSubject<string>;
    private userInfObs: BehaviorSubject<string>;

    constructor() {
        this.pageTitleObs = new BehaviorSubject<string>('');
        this.userInfObs = new BehaviorSubject<string>('');
    }

    public getPageTitle(): Observable<string> {
        return this.pageTitleObs.asObservable();
    }

    public setPageTitle(pageTitle: string) {
        this.pageTitleObs.next(pageTitle);
    }

    public getUserInfo(): Observable<string> {
        return this.userInfObs.asObservable();
    }

    public setUserInfo(userInfo: string) {
        this.userInfObs.next(userInfo);
    }

}
