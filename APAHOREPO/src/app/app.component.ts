import { Component } from "@angular/core";
import { CommunicationService } from "./modules/_shared/services/communication.services";
import { startWith, delay } from "rxjs/operators";
import { Router, NavigationEnd, Scroll } from "@angular/router";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "Advisor Practices Acquisition";
    loader = false;

    constructor(
        private communicationService: CommunicationService,
        private router: Router
    ) {
        // router.events.subscribe((val) => {
        //     // see also
        //     this.titleService.setTitle(
        //         "Advisor Practices Acquisition - Deal Execution"
        //     );
        //     var fullUrl = window.location.href;
        //     if (fullUrl.includes("assurance-plan")) {
        //         this.titleService.setTitle(
        //             "Advisor Practices Acquisition - Assurance Plan"
        //         );
        //     }
        // });
    }

    ngAfterViewInit() {
        this.communicationService
            .getLoader()
            .pipe(startWith(false), delay(0))
            .subscribe((result) => (this.loader = result));
    }
}
