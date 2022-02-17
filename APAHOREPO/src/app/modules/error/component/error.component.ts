import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERROR_PAGE_MSG, NOT_VALID_PAGE_MSG, NOT_AUTHORIZED_PAGE_MSG } from '../../_shared/constants/global.constant';
import { PageTitle } from '../../_shared/services/page-title.service';
import { CommunicationService } from '../../_shared/services/communication.services';

@Component({
    selector: 'error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
    errMsgMain = ERROR_PAGE_MSG;
    errMsgSub = '';
    accessType : any;
    constructor(public router: Router, private pageTitleSvc: PageTitle, private commSvc: CommunicationService) {
        this.pageTitleSvc.setPageTitle('Error');
        this.commSvc.getAccessType().subscribe( accessType => this.accessType = accessType)
        this.errMsgSub = (this.accessType === '') ? NOT_AUTHORIZED_PAGE_MSG : NOT_VALID_PAGE_MSG;
    }

    ngOnInit() {}

    backToHomepage(): void {
        this.router.navigate(['/home']);
    }
}
