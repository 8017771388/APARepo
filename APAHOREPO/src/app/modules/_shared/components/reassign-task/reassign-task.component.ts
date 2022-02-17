import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DatePipe } from "@angular/common";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead";
import { Observable, Observer, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { DealService } from "../../../admin/services/deal.service";

interface DataSourceType {
    username: string;
    fullname: string;
    isactive: boolean;
    role: string;
    vcfoId: number;
    adGroup: string;
}

@Component({
    selector: "app-reassign-task",
    templateUrl: "./reassign-task.component.html",
    styleUrls: ["./reassign-task.component.scss"],
    providers: [DatePipe],
})
export class ReassignTaskComponent implements OnInit {
    @Output() reassigned = new EventEmitter();
    public noResult: boolean;

    constructor(
        public bsModalRef: BsModalRef,
        public datePipe: DatePipe,
        private dealService: DealService
    ) {}

    public title: any;
    public openFrom: any;
    public dealInfo: any;
    public taskDetail: any;
    public tasks: any;
    public dataSource: Observable<DataSourceType[]>;
    public searchedDealSpecialist: any;
    public dealSpecialist: any;

    ngOnInit() {
        this.tasks = JSON.parse(JSON.stringify(this.taskDetail));
        this.tasks.dueDate = new Date(this.taskDetail.dueDate);
        this.searchedDealSpecialist = this.dealInfo.dealSpecialist;
        this.dataSource = Observable.create((observer: Observer<string>) => {
            observer.next(this.searchedDealSpecialist);
        }).pipe(mergeMap((token: string) => this.returnDealSpecialist(token)));
    }

    returnDealSpecialist(token: string): Observable<DataSourceType[]> {
        this.dealSpecialist = this.dealService.searchDealSpecialists(token);
        const query = new RegExp(token, "i");

        return of(
            this.dealSpecialist.filter((specialistName: any) => {
                return query.test(specialistName.fullname);
            })
        );
    }

    typeaheadOnSelectAdvisor(event: TypeaheadMatch): void {
        this.dealInfo.dealSpecialist = event.item.fullname;
    }

    typeaheadNoResults(event: boolean): void {
        this.noResult = event;
    }

    saveTask() {
        this.bsModalRef.hide();
    }
}
