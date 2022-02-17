import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AdvisorService } from "../../services/advisor.service";
import { Subscription } from "rxjs";
import { Observable, Observer } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead";
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { AppSettings } from "../../../_shared/constants/api-constant";

@Component({
    selector: "app-advisor-subcription",
    templateUrl: "./advisor-subcription.component.html",
    styleUrls: ["./advisor-subcription.component.scss"],
    providers: [AdvisorService],
})
export class AdvisorSubcriptionComponent implements OnInit {
    @Input() repId: string;
    @Input() vcfoName: string;
    @Input() subscriptionObject: any;
    @Output() Esubscription = new EventEmitter<any>();
    public AdvisorData: any = {
        fullname: "",
        repid: "",
    };
    saveDisable = true;
    selectBoxtouch = false;
    optionOnBlur: any;
    public isDisabled: boolean = false;
    public vcfo: any;
    public dataSource: Observable<any>;
    public noResult: boolean = false;
    public repExist: boolean = false;
    public advisorRes: any;
    public currentUser: any;
    public userRole: any;
    public cursorStart: any;
    public cursorEnd: any;
    public cursorEvent: any;
    public outsideAdvisoryRevs: any;
    public outsideBrokerageRevs: any;
    public tampAums: any;
    public otherOutsideAums: any;

    constructor(
        private AdvisorService: AdvisorService,
        private userInfo: UserInfo
    ) {
        this.isDisabled = true;
    }

    ngOnInit() {
        //console.log(this.subscriptionObject);
        this.AdvisorData = this.subscriptionObject;
        this.outsideAdvisoryRevs = this.AdvisorData.outsideAdvisoryRev
            ? Number(this.AdvisorData.outsideAdvisoryRev).toLocaleString()
            : "";
        this.outsideBrokerageRevs = this.AdvisorData.outsideBrokerageRev
            ? Number(this.AdvisorData.outsideBrokerageRev).toLocaleString()
            : "";
        this.tampAums = this.AdvisorData.tampAum
            ? Number(this.AdvisorData.tampAum).toLocaleString()
            : "";
        this.otherOutsideAums = this.AdvisorData.otherOutsideAum
            ? Number(this.AdvisorData.otherOutsideAum).toLocaleString()
            : "";
        this.AdvisorData.contractStartDate = this.AdvisorData.contractStartDate
            ? new Date(this.AdvisorData.contractStartDate)
            : null;

        this.vcfo = this.vcfoName != undefined ? this.vcfoName : "";

        // this.dataSource = Observable.create((observer: Observer<string>) => {
        // 	observer.next(this.vcfo);
        // })
        // 	.pipe(mergeMap((token: string) => this.AdvisorService.searchVcfos(token)));

        this.currentUser = this.userInfo._currentUserFn();
    }
    setASATEmailTrigger(event) {
        if (this.AdvisorData.isActive) this.AdvisorData.ASATemailTrigger = 1;
        else this.AdvisorData.ASATemailTrigger = 2;
    }

    typeaheadOnSelect(event: TypeaheadMatch): void {
        this.vcfoName = event.item.fullname;
        this.AdvisorData.vcfoId = event.item.vcfoId;
        // this.isDisabled = false;
        this.selectBoxtouch = true;
        this.saveDisable = false;
    }

    typeaheadNoResults(event: boolean): void {
        this.noResult = event;
    }
    validateNumber(e: any) {
        let input = String.fromCharCode(e.charCode);
        const reg = /^\s*(?=.*[1-9])\d*(?:\.\d{1,1})?\s*$/;
        const reg1 = /^\d*(?:[.,]\d{1,2})?$/;

        if (!reg.test(input)) {
            e.preventDefault();
        }
    }

    typeaheadOnBlur(event: any): void {
        this.optionOnBlur = event.item;
        if (this.optionOnBlur && this.vcfo !== this.optionOnBlur.fullname) {
            this.vcfo = "";
        }
        //console.log(this.optionOnBlur.fullname);
        //console.log(this.vcfo);
    }

    save() {
        ////console.log(this.AdvisorData);
        this.AdvisorData.outsideAdvisoryRev =
            this.outsideAdvisoryRevs != 0
                ? Number(this.outsideAdvisoryRevs.replace(/,/g, ""))
                : null;
        this.AdvisorData.outsideBrokerageRev =
            this.outsideBrokerageRevs != 0
                ? Number(this.outsideBrokerageRevs.replace(/,/g, ""))
                : null;
        this.AdvisorData.tampAum =
            this.tampAums != 0 ? Number(this.tampAums.replace(/,/g, "")) : null;
        this.AdvisorData.otherOutsideAum =
            this.otherOutsideAums != 0
                ? Number(this.otherOutsideAums.replace(/,/g, ""))
                : null;
        this.AdvisorData.username = this.currentUser.userName;
        // this.AdvisorService.saveAdvisorDetails(this.AdvisorData).subscribe(data => {
        // 	this.advisorRes = data;
        // 	if (this.advisorRes.data.output === 0) {
        // 		this.repExist = false;
        // 		this.Esubscription.emit({ 'save': true });
        // 	}
        // 	else {
        // 		this.repExist = true;
        // 	}

        // });
    }

    cancel() {
        this.Esubscription.emit({ cancel: true });
    }

    valuechange(newValue, fieldName) {
        //this.isDisabled = false;
        this.saveDisable = false;
    }
    ownerShipChanged(newValue, fieldName, idx) {
        let val = this.AdvisorData.secondaryRepids[idx].ownershipPercentage;
        //this.saveDisable = val ? false : true;
        this.saveDisable = false;
    }
    // payoutChanged(newValue, fieldName, idx ) {
    // 	let val = this.AdvisorData.secondaryRepids[idx].payoutPercent;
    // 	this.saveDisable = val ? false : true;
    // }

    valueChanged(newValue, fieldName) {
        //this.isDisabled = false;
        this.saveDisable = false;
        newValue = newValue.replace(/,/g, "");
        if (fieldName === "outsideAdvisoryRev") {
            this.outsideAdvisoryRevs = Number(newValue).toLocaleString();
        }
        if (fieldName === "outsideBrokerageRev") {
            this.outsideBrokerageRevs = Number(newValue).toLocaleString();
        }
        if (fieldName === "tampAum") {
            this.tampAums = Number(newValue).toLocaleString();
        }
        if (fieldName === "otherOutsideAum") {
            this.otherOutsideAums = Number(newValue).toLocaleString();
        }
    }

    checkValue(event) {
        this.cursorEvent = event;
        (this.cursorStart = event.target.selectionStart),
            (this.cursorEnd = event.target.selectionEnd);

        if (
            (event.keyCode > 47 && event.keyCode < 58) ||
            (event.keyCode > 95 && event.keyCode < 106) ||
            event.keyCode === 8 ||
            event.keyCode === 9
        ) {
            var rawValue = event.target.value;
            rawValue = rawValue.replace(/,/g, "");
            if (rawValue > 99999999) {
                if (event.keyCode === 8) {
                    return true;
                } else {
                    return false;
                }
            } else {
                //event.target.setSelectionRange(this.cursorStart, this.cursorEnd);
                return true;
            }
        } else {
            return false;
        }
    }
}
