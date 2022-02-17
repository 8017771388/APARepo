import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "../../_shared/services/http.services";
import { AppSettings } from "../../_shared/constants/api-constant";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class ViewDealService {
    constructor(private httpService: HttpService, private router: Router) {}

    getDeals(param) {
        // var uri = AppSettings.getActionPlan + "?repId=" + param.repId + '&goalStatus=' + param.status;
        // var separator = uri.indexOf('?') === -1 ? '?' : '&';
        // uri = uri + separator + 'noCache=' + new Date().getTime();
        // return this.httpService
        //   .get(uri, {}, AppSettings.apiKey)
        //   .pipe(map(response => response));

        var mockJSON = {
            status: "success",
            statusMessage: "",
            data: {
                dealInfo: {
                    dealId: 10,
                    dealName: "Clark & Jigalin 2020",
                    dealSpecialist: "Paul Ross",
                    dealType: "LPL to LPL Acquisition",
                    activeStage: "Discovery",
                    status: "In Progress",
                    completionPercentage: "80",
                    completedTasks: 1,
                    statusOfTasks: {
                        total: 3,
                        pastDue: 1,
                        dueThisWeek: 0,
                        next30DaysTask: 0,
                        notStarted: 2,
                    },
                    stageDueDate: "Jun 20, 2020",
                    seller: [
                        {
                            name: "Vaishali Zachrich",
                            repId: "T2XA",
                        },
                    ],
                    buyers: [
                        {
                            name: "Test Account",
                            repId: "CCCA",
                        },
                        //,
                        //{
                        //    buyerName: "Vigilius Booke",
                        //    repId: "260A",
                        //},
                    ],
                    tasks: [
                        {
                            task: "Valuation Call",
                            actionPlanDetailId: 163,
                            description: "Set up a call for Valuation",
                            dueDate: "2020-06-10T00:00:00",
                            status: "In Progress",
                            owner: "Buyer",
                            ownerName: "Test Account",
                            department: "AFS-M&A - Deal Specialist",
                            openActivities: 5,
                            completedActivities: 5,
                            vcfoOrAdvisor: "Advisor",
                            sla: 100,
                            totalNote: 0,
                            notes: [],
                            activities: [
                                {
                                    activity:
                                        "Request a BAR report and consultation with the advisory consultant",
                                    actionPlanDetailId: 163,
                                    category: "Asset Conversions",
                                    dueDate: null,
                                    status: "Not Started",
                                    owner: "003D",
                                    ownerName: "Laura Boice",
                                    vcfoOrAdvisor: "Advisor",
                                    department: "AFS-M&A - Deal Specialist",
                                    totalNote: 3,
                                },
                                {
                                    activity: "test custom task",
                                    actionPlanDetailId: 164,
                                    category: "Asset Conversions",
                                    dueDate: null,
                                    status: "Not Started",
                                    owner: "003D",
                                    ownerName: "Marrissa Texeira",
                                    vcfoOrAdvisor: "VCFO",
                                    department: "AFS-M&A - Deal Specialist",
                                    totalNote: 2,
                                },
                                {
                                    activity:
                                        "Decide which clients would be best suited to transition to advisory",
                                    actionPlanDetailId: 241,
                                    category: "Asset Conversions",
                                    dueDate: "2019-07-25T00:00:00",
                                    status: "Past Due",
                                    owner: "ashaikh",
                                    ownerName: "Anis Shaikh",
                                    vcfoOrAdvisor: "VCFO",
                                    department: "AFS-M&A - Deal Specialist",
                                    totalNote: 0,
                                },
                            ],
                        },
                        {
                            task: "Deal Structure Call",
                            actionPlanDetailId: 164,
                            description: "Set up a call for Valuation",
                            dueDate: "2020-06-10T00:00:00",
                            status: "In Progress",
                            owner: "Seller",
                            ownerName: "Vaishali Zachrich",
                            department: "AFS-M&A - Deal Specialist",
                            openActivities: 5,
                            completedActivities: 5,
                            vcfoOrAdvisor: "Advisor",
                            sla: 100,
                            totalNote: 0,
                            notes: [],
                            activities: [],
                        },
                        {
                            task: "Send call recap emails after every call",
                            actionPlanDetailId: 165,
                            description: "Set up a call for Valuation",
                            dueDate: "2020-07-20T00:00:00",
                            status: "In Progress",
                            owner: "Buyer",
                            ownerName: "Test Account",
                            department: "AFS-M&A - Deal Specialist",
                            openActivities: 5,
                            completedActivities: 5,
                            vcfoOrAdvisor: "Advisor",
                            sla: 100,
                            totalNote: 0,
                            notes: [],
                            activities: [],
                        },
                        {
                            task: "Discovery Call Buyer",
                            actionPlanDetailId: 166,
                            description: "Set up a call for Valuation",
                            dueDate: "2020-05-20T00:00:00",
                            status: "Not Started",
                            owner: "Deal Specialist",
                            ownerName: "Paul Ross",
                            department: "AFS-M&A - Deal Specialist",
                            openActivities: 5,
                            completedActivities: 5,
                            vcfoOrAdvisor: "Advisor",
                            sla: 100,
                            totalNote: 0,
                            notes: [],
                            activities: [],
                        },
                    ],
                },
            },
        };

        return mockJSON;
    }

    getDealDetails() {
        var mockJSON = {
            status: "success",
            statusMessage: "",
            data: {
                dealInfo: {
                    dealId: 10,
                    dealName: "Clark & Jigalin 2020",
                    dealSpecialist: "Paul Ross",
                    dealType: "LPL to LPL Acquisition",
                    activeStage: "Discovery",
                    status: "In Progress",
                    completionPercentage: "80",
                    completedTasks: 1,
                    stageDueDate: "Jun 20, 2020",
                    seller: [
                        {
                            sellerName: "Vaishali Zachrich",
                            repId: "T2XA",
                        },
                    ],
                    buyers: [
                        {
                            buyerName: "Test Account",
                            repId: "CCCA",
                        },
                        //,
                        //{
                        //    buyerName: "Vigilius Booke",
                        //    repId: "260A",
                        //},
                    ],
                    tasks: [
                        {
                            task: "Link accounts driving expenses",
                            actionPlanDetailId: 1386,
                            dueDate: "2020-05-14T06:03:11",
                            status: "Complete",
                            owner: "Deal Specialist",
                            ownerName: "Paul Ross",
                            department: "AFS-M&A - Deal Specialist",
                            vcfoOrAdvisor: "VCFO",
                            noteId: "",
                            note: "",
                            isVisibleToVCFO: "",
                            IsActive: "",
                            completedDate: "",
                        },
                    ],
                },
            },
        };

        return mockJSON;
    }
}
