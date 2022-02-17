import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Observable, Observer } from "rxjs";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead";
import { mergeMap } from "rxjs/operators";
import { AdvisorService } from "../../../admin/services/advisor.service";

@Component({
    selector: "app-add-advisor",
    templateUrl: "./add-advisor.component.html",
    styleUrls: ["./add-advisor.component.scss"],
})
export class AddAdvisorComponent implements OnInit {
    @Output() advisorSaved = new EventEmitter();

    public title: any;
    public dataSource: Observable<any>;
    public searchAdvisor: any = "";
    public noResult: boolean = false;
    public advisorSelected: any;
    public advisorselected: boolean = true;

    constructor(
        public bsModalRef: BsModalRef,
        private advisorService: AdvisorService
    ) {}

    typeaheadOnSelect(event: TypeaheadMatch): void {
        this.advisorSelected = event.item;
        this.advisorselected = false;
    }

    typeaheadNoResults(event: boolean): void {
        //console.log(event);
        this.noResult = event;
    }

    addAdvisor() {
        ////console.log(this.advisorSelected);
        this.advisorSaved.emit(this.advisorSelected);
        this.bsModalRef.hide();
    }

    ngOnInit() {
        // this.dataSource = Observable.create((observer: Observer<string>) => observer.next(this.searchAdvisor))
        // .pipe(mergeMap((token: string) => this.advisorService.getRepList(token)));
    }
}
