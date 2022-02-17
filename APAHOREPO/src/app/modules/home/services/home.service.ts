import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
//import {  Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpService } from "../../_shared/services/http.services";
import { AppSettings } from "../../_shared/constants/api-constant";

@Injectable({
    providedIn: "root",
})
export class HomeService {
    constructor(private httpService: HttpService, private http: HttpClient) {}

    getDealList(param) {
        return this.httpService
            .post(AppSettings.dealList, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }
    getFilterValues(param) {
        return this.httpService
            .post(AppSettings.filterValues, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }
    getMatchingDealsData(param) {
        //console.log(param);
        var mockDataFinal = {
            status: "success",
            statusMessage: "",
            data: {
                totalCount: 2,
                dealList: [
                    {
                        dealID: 1,
                        dealName: "AVICUS GOETTSCHE & CLETO DERUSHA",
                        dealType: "LPL to LPL Acquisition",
                        dealTypeID: 1,
                        dealStatus: "In Progress",
                        dealStatusCd: "INPR",
                        dealStage: "Discovery",
                        dealStageID: 1,
                        dealStartDate: "2020-06-12T00:00:00",
                        dealTargetEndDate: "2022-07-04T00:00:00",
                        dealSpecialistInfo: {
                            homeOfficeUserID: 1,
                            dsFullName: "Sumija Thallassery",
                            dsUsername: "sthallas",
                            dsFirstName: "Sumija",
                            dsMiddleName: "",
                            dsLastName: "Thallassery",
                            dsEmail: "",
                            roleCd: "",
                            advisors: [
                                {
                                    advisorName: "AVICUS GOETTSCHE",
                                    repFirstName: "AVICUS",
                                    repMiddleName: "",
                                    repLastName: "GOETTSCHE",
                                    repId: "1234",
                                    advisorRole: "Seller",
                                    repEmail: "AVICUS.GOETTSCHE@lpl.com",
                                    IsTerminated: 0,
                                    repUsername: "AVICUS.GOETTSCHE",
                                    hireDate: "1900-01-01T00:00:00",
                                },
                                {
                                    advisorName: "CLETO DERUSHA",
                                    repFirstName: "CLETO",
                                    repMiddleName: "",
                                    repLastName: "DERUSHA",
                                    repId: "011H",
                                    advisorRole: "Seller",
                                    repEmail: "ARISTIDE.BOHLKEN@lpl.com",
                                    IsTerminated: 0,
                                    repUsername: "vaishali.zachrich",
                                    hireDate: "1900-01-01T00:00:00",
                                },
                                {
                                    advisorName: "DYONE DEGROOTE",
                                    repFirstName: "DYONE",
                                    repMiddleName: "",
                                    repLastName: "DEGROOTE",
                                    repId: "05JA",
                                    advisorRole: "Buyer",
                                    repEmail: "AVICUS.GOETTSCHE@lpl.com",
                                    IsTerminated: 0,
                                    repUsername: "AVICUS.GOETTSCHE",
                                    hireDate: "1900-01-01T00:00:00",
                                },
                                {
                                    advisorName: "VINCENTE AVENA",
                                    repFirstName: "VINCENTE",
                                    repMiddleName: "",
                                    repLastName: "AVENA",
                                    repId: "002D",
                                    advisorRole: "Seller",
                                    repEmail: "VINCENTE.AVENA@lpl.com",
                                    IsTerminated: 0,
                                    repUsername: "VINCENTE.AVENA",
                                    hireDate: "1900-01-01T00:00:00",
                                },
                            ],
                            notes: [
                                {
                                    noteID: 17,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sumkumar",
                                    createdByName: null,
                                    createdOn: "2020-06-18T18:49:57",
                                },
                                {
                                    noteID: 16,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sumkumar",
                                    createdByName: null,
                                    createdOn: "2020-06-18T18:45:07",
                                },
                                {
                                    noteID: 14,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sthallas",
                                    createdByName: "Sumija Thallassery",
                                    createdOn: "2020-06-16T17:50:42",
                                },
                                {
                                    noteID: 13,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sumkumar",
                                    createdByName: null,
                                    createdOn: "2020-06-16T13:24:36",
                                },
                                {
                                    noteID: 12,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sumkumar",
                                    createdByName: null,
                                    createdOn: "2020-06-16T13:24:36",
                                },
                                {
                                    noteID: 11,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sumkumar",
                                    createdByName: null,
                                    createdOn: "2020-06-16T12:38:37",
                                },
                                {
                                    noteID: 10,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sumkumar",
                                    createdByName: null,
                                    createdOn: "2020-06-16T12:30:56",
                                },
                                {
                                    noteID: 9,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sumkumar",
                                    createdByName: null,
                                    createdOn: "2020-06-16T10:53:53",
                                },
                                {
                                    noteID: 8,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sthallas",
                                    createdByName: "Sumija Thallassery",
                                    createdOn: "2020-06-16T10:52:34",
                                },
                                {
                                    noteID: 7,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sthallas",
                                    createdByName: "Sumija Thallassery",
                                    createdOn: "2020-06-16T07:15:05",
                                },
                                {
                                    noteID: 6,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sthallas",
                                    createdByName: "Sumija Thallassery",
                                    createdOn: "2020-06-16T07:14:28",
                                },
                                {
                                    noteID: 5,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sthallas",
                                    createdByName: "Sumija Thallassery",
                                    createdOn: "2020-06-16T06:57:50",
                                },
                                {
                                    noteID: 4,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sthallas",
                                    createdByName: "Sumija Thallassery",
                                    createdOn: "2020-06-16T06:18:19",
                                },
                                {
                                    noteID: 3,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sthallas",
                                    createdByName: "Sumija Thallassery",
                                    createdOn: "2020-06-16T06:14:29",
                                },
                                {
                                    noteID: 2,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sthallas",
                                    createdByName: "Sumija Thallassery",
                                    createdOn: "2020-06-12T13:59:55",
                                },
                            ],
                        },
                    },
                    {
                        dealID: 2,
                        dealName: "WARNER.LEBER & VINCENTE.AVENA",
                        dealType: "LPL to LPL Acquisition",
                        dealTypeID: 1,
                        dealStatus: "In Progress",
                        dealStatusCd: "INPR",
                        dealStage: "Discovery",
                        dealStageID: 1,
                        dealStartDate: "2020-06-12T00:00:00",
                        dealTargetEndDate: "2022-07-04T00:00:00",
                        dealSpecialistInfo: {
                            homeOfficeUserID: 1,
                            dsFullName: "Sumija Thallassery",
                            dsUsername: "sthallas",
                            dsFirstName: "Sumija",
                            dsMiddleName: "",
                            dsLastName: "Thallassery",
                            dsEmail: "",
                            roleCd: "",
                            advisors: [
                                {
                                    advisorName: "VINCENTE AVENA",
                                    repFirstName: "VINCENTE",
                                    repMiddleName: "",
                                    repLastName: "AVENA",
                                    repId: "002D",
                                    advisorRole: "Seller",
                                    repEmail: "VINCENTE.AVENA@lpl.com",
                                    IsTerminated: 0,
                                    repUsername: "VINCENTE.AVENA",
                                    hireDate: "1900-01-01T00:00:00",
                                },
                                {
                                    advisorName: "WARNER LEBER",
                                    repFirstName: "WARNER",
                                    repMiddleName: "",
                                    repLastName: "LEBER",
                                    repId: "A9MA",
                                    advisorRole: "Buyer",
                                    repEmail: "WARNER.LEBER@lpl.com",
                                    IsTerminated: 0,
                                    repUsername: "WARNER.LEBER",
                                    hireDate: "1900-01-01T00:00:00",
                                },
                            ],
                            notes: [
                                {
                                    noteID: 15,
                                    noteLevel: "DL ",
                                    note: "test",
                                    IsInternal: "",
                                    createdByUsername: "sthallas",
                                    createdByName: "Sumija Thallassery",
                                    createdOn: "2020-06-17T01:08:41",
                                },
                            ],
                        },
                    },
                ],
            },
        };

        var mockData = {
            status: "success",
            statusMessage: "",
            data: {
                totalCount: 2,
                dealList: [
                    {
                        dealId: 1,
                        dealName: "Clark & Jigalin 2020",
                        dealType: "LPL to LPL Acquisition",
                        valuationProfile: 15,
                        dealSpecialist: "Paul Ross",
                        startDate: "2019-07-01T00:00:00",
                        dealStatus: "Not Started",
                        dealStatusId: 1,
                        stage: "Discovery",
                        dealTargetEndDate: "2021-07-03T00:00:00",
                        status: "Not Started",
                        advisors: [
                            {
                                advisorName: "Zachrich, Vaishali",
                                repId: "T2XA",
                                advisorRole: "SELLER",
                                cwAccess: "Active",
                                advKey: 1,
                            },
                            {
                                advisorName: "Account, Test",
                                repId: "T2XA",
                                advisorRole: "BUYER",
                                cwAccess: "Active",
                                advKey: 1,
                            },
                        ],

                        tasks: [
                            {
                                task: "Valuation call",
                                duedate: "2019-07-05T00:00:00",
                                status: "Past Due",
                                stage: "Discovery",
                                owner: "Sumija",
                                department: "AFS - M&A - Deal Specialist",
                                actionPlanId: 1,
                                taskKey: 1,
                            },
                            {
                                task: "Deal Valuation",
                                duedate: "2019-07-05T00:00:00",
                                status: "Due within Week",
                                stage: "Discovery",
                                owner: "Marissa",
                                department: "AFS - M&A - Sr. Analyst",
                                actionPlanId: 4,
                                taskKey: 1,
                            },
                        ],
                    },
                    {
                        dealId: 2,
                        dealName: "AVICUS & DREDEN 2020",
                        dealType: "LPL to LPL Acquisition",
                        valuationProfile: 85,
                        dealSpecialist: "Paul Ross",
                        startDate: "2019-07-03T00:00:00",
                        dealStatus: "In Progress",
                        dealStatusId: 1,
                        stage: "Discovery",
                        status: "In Progress",
                        dealTargetEndDate: "2021-07-04T00:00:00",
                        advisors: [
                            {
                                advisorName: "GOETTSCHE, AVICUS",
                                repId: "002D",
                                advisorRole: "SELLER",
                                advKey: 2,
                            },
                            {
                                advisorName: "MANILOW, DREDEN",
                                repId: "003E",
                                advisorRole: "BUYER",
                                advKey: 2,
                            },
                        ],
                        tasks: [
                            {
                                task: "Valuation call",
                                duedate: "2019-07-05T00:00:00",
                                status: "Past Due",
                                stage: "Discovery",
                                owner: "Sumija",
                                department: "AFS - M&A - Deal Specialist",
                                actionPlanId: 1,
                                taskKey: 2,
                            },
                            {
                                task: "Deal Valuation",
                                duedate: "2019-07-05T00:00:00",
                                status: "Due within Week",
                                stage: "Not Started",
                                owner: "Marissa",
                                department: "AFS - M&A - Sr. Analyst",
                                actionPlanId: 4,
                                taskKey: 2,
                            },
                        ],
                    },
                    {
                        dealId: 3,
                        dealName: "ALDIS & DUNSTIN 2020",
                        dealType: "LPL to LPL Acquisition",
                        valuationProfile: 85,
                        dealSpecialist: "Paul Ross",
                        startDate: "2019-07-35T00:00:00",
                        dealStatus: "In Progress",
                        dealStatusId: 1,
                        stage: "Discovery",
                        status: "Completed",
                        dealTargetEndDate: "2021-07-05T00:00:00",
                        advisors: [
                            {
                                advisorName: "ODDY, ALDIS",
                                repId: "DK5A",
                                advisorRole: "SELLER",
                                advKey: 3,
                            },
                            {
                                advisorName: "BROE, DUNSTIN",
                                repId: "VJ3A",
                                advisorRole: "BUYER",
                                advKey: 3,
                            },
                        ],
                        tasks: [
                            {
                                task: "Valuation call",
                                duedate: "2019-07-05T00:00:00",
                                status: "Past Due",
                                stage: "Discovery",
                                owner: "Sumija",
                                department: "AFS - M&A - Deal Specialist",
                                actionPlanId: 1,
                                taskKey: 2,
                            },
                            {
                                task: "Deal Valuation",
                                duedate: "2019-07-05T00:00:00",
                                status: "Due within Week",
                                stage: "Not Started",
                                owner: "Marissa",
                                department: "AFS - M&A - Sr. Analyst",
                                actionPlanId: 4,
                                taskKey: 2,
                            },
                        ],
                    },
                ],
            },
        };

        return mockDataFinal;
    }

    getStageTask() {
        var mockJson = {
            status: "success",
            statusMessage: "",
            data: {
                stageList: [
                    {
                        stage: "Discovery",
                        stageid: 1003,
                        tasks: [
                            {
                                task: "Valuation Call",
                                taskId: 1000,
                                owner: "Buyer",
                                department: "AFS - M&A - Deal Specialist",
                                duedate: "2019-07-05T00:00:00",
                            },
                            {
                                task: "Deal Structure Call",
                                taskId: 1001,
                                owner: "Seller",
                                department: "AFS - M&A - Deal Specialist",
                                duedate: "2019-07-05T00:00:00",
                            },
                            {
                                task: "Deal Valuations",
                                taskId: 1051,
                                department: "AFS - M&A - Sr. Analyst",
                                duedate: "2019-07-05T00:00:00",
                            },
                            {
                                task: "Test Goal test update 1",
                                taskId: 1052,
                                department: "",
                                duedate: "2019-07-05T00:00:00",
                            },
                            {
                                task: "Test goal 123",
                                taskId: 1058,
                                department: "test",
                                duedate: "2019-07-05T00:00:00",
                            },
                        ],
                    },
                    {
                        stage: "Due Diligence",
                        stageid: 101,
                        tasks: [
                            {
                                task: "Valuation Call",
                                taskId: 1000,
                                owner: "Buyer",
                                department: "AFS - M&A - Deal Specialist",
                                duedate: "2019-07-05T00:00:00",
                            },
                            {
                                task: "Deal Structure Call",
                                taskId: 1001,
                                owner: "Seller",
                                department: "AFS - M&A - Deal Specialist",
                                duedate: "2019-07-05T00:00:00",
                            },
                            {
                                task: "Deal Valuations",
                                taskId: 1051,
                                department: "AFS - M&A - Sr. Analyst",
                                duedate: "2019-07-05T00:00:00",
                            },
                        ],
                    },

                    {
                        stage: "Closing",
                        stageid: 103,
                        tasks: [
                            {
                                task: "Valuation Call",
                                taskId: 1000,
                                owner: "Buyer",
                                department: "AFS - M&A - Deal Specialist",
                                duedate: "2019-07-05T00:00:00",
                            },
                            {
                                task: "Deal Structure Call",
                                taskId: 1001,
                                owner: "Seller",
                                department: "AFS - M&A - Deal Specialist",
                                duedate: "2019-07-05T00:00:00",
                            },
                            {
                                task: "Deal Valuations",
                                taskId: 1051,
                                department: "AFS - M&A - Sr. Analyst",
                                duedate: "2019-07-05T00:00:00",
                            },
                            {
                                task: "Test goal 123",
                                taskId: 1058,
                                department: "test",
                                duedate: "2019-07-05T00:00:00",
                            },
                        ],
                    },
                    {
                        stage: "Integration",
                        stageid: 129,
                        tasks: [
                            {
                                task: "Valuation Call",
                                taskId: 1000,
                                owner: "Buyer",
                                department: "AFS - M&A - Deal Specialist",
                                duedate: "2019-07-05T00:00:00",
                            },
                            {
                                task: "Deal Structure Call",
                                taskId: 1001,
                                owner: "Seller",
                                department: "AFS - M&A - Deal Specialist",
                                duedate: "2019-07-05T00:00:00",
                            },
                            {
                                task: "Deal Valuations",
                                taskId: 1051,
                                department: "AFS - M&A - Sr. Analyst",
                                duedate: "2019-07-05T00:00:00",
                            },
                            {
                                task: "Test Goal test update 1",
                                taskId: 1052,
                                department: "",
                                duedate: "2019-07-05T00:00:00",
                            },
                        ],
                    },
                ],
            },
        };

        return mockJson;
    }

    getTasks() {
        var mockJson = {
            status: "success",
            statusMessage: "",
            data: {
                taskList: [
                    {
                        taskId: 10,
                        task: "Latest Task",
                        department: "AFS - M&A - Deal Specialist",
                        sla: 100,
                        stage: "Discovery",
                        duedate: "May 15, 2020",
                        status: "Past Due",
                        dealName: "Clark & Jigalin 2020",
                        dealType: "LPL to LPL Acquisition",
                        dealStartDate: "May 5, 2020",
                        assignedTo: "Sonam Yadav",
                    },
                    {
                        taskId: 19,
                        task:
                            "Prepare report of valuation impact from asset conversion",
                        department: "AFS - M&A - Deal Specialist",
                        sla: 100,
                        stage: "Closing",
                        duedate: "Jul 5, 2019",
                        status: "Past Due",
                        dealName: "Clark & Jigalin 2020",
                        dealType: "LPL to LPL Acquisition",
                        dealStartDate: "May 5, 2020",
                        assignedTo: "Sonam Yadav",
                    },
                    {
                        taskId: 19,
                        task: "Review valuation with advisor",
                        department: "AFS - M&A - Sr. Analyst",
                        sla: 100,
                        stage: "Due Diligence",
                        duedate: "Jul 5, 2019",
                        status: "Past Due",
                        dealName: "Clark & Jigalin 2020",
                        dealType: "LPL to LPL Acquisition",
                        dealStartDate: "May 5, 2020",
                        assignedTo: "Sonam Yadav",
                    },
                    {
                        taskId: 43,
                        task: "abc199",
                        department: "AFS - M&A - Sr. Analyst",
                        sla: 121,
                        stage: "Integration",
                        duedate: "Jul 5, 2019",
                        status: "Past Due",
                        dealName: "Clark & Jigalin 2020",
                        dealType: "LPL to LPL Acquisition",
                        dealStartDate: "May 5, 2020",
                        assignedTo: "Sonam Yadav",
                    },
                ],
            },
        };
        return mockJson;
    }

    getNotes() {
        var mockJson = {
            status: "success",
            statusMessage: "",
            data: {
                noteList: [
                    {
                        noteId: 10,
                        note: "Note your dummy dask",
                        createdBy: "Marissa",
                    },
                    {
                        noteId: 11,
                        note:
                            "Prepare report of valuation impact from asset conversion",
                        createdBy: "Kevin",
                    },
                    {
                        noteId: 1,
                        note: "Review valuation with advisor",
                        createdBy: "Finbar",
                    },
                    {
                        noteId: 10,
                        note: "Note your dummy dask",
                        createdBy: "Marissa",
                    },
                    {
                        noteId: 11,
                        note:
                            "Prepare report of valuation impact from asset conversion",
                        createdBy: "Kevin",
                    },
                    {
                        noteId: 11,
                        note:
                            "Prepare report of valuation impact from asset conversion",
                        createdBy: "Kevin",
                    },
                ],
            },
        };
        return mockJson;
    }

    getStagesList(param) {
        var url = AppSettings.dealTask;
        var separator = url.indexOf("?") === -1 ? "?" : "&";
        url = url + separator + "noCache=" + new Date().getTime();
        return this.httpService
            .get(url, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    saveDealPlan(param) {
        return this.httpService
            .post(AppSettings.saveDealPlan, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }
    saveDealTask(param) {
        return this.httpService
            .post(AppSettings.saveDealTask, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    getAllNotes(param) {
        var url = AppSettings.allNotes + param;
        return this.httpService
            .get(url, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    saveNotes(param) {
        return this.httpService
            .post(AppSettings.saveNote, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    getAllNotifications(username){
        var url = AppSettings.getAllNotification + username;
        return this.httpService
            .get(url, {}, AppSettings.apiKey)
            .pipe(map((response) => response));

        var md = {
            "status": "success",
            "statusMessage": "",
            "data": {
                "dealList": [{
                        "dealInfo": {
                            "dealID": 4,
                            "dealTypeID": 1,
                            "dealType": "LPL to LPL Acquisition",
                            "dealName": "QA Test Deal T2XA and 00KB",
                            "notification": {
                                "notificationID": 63,
                                "notification": "New Note - Buyer Signs Letter of Intent",
                                "notificationType": "NL",
                                "dealTaskID": 172,
                                "noteID": 195,
                                "readFlag": "U",
                                "readOn": "2020-10-29T14:19:53",
                                "isDismissed": false,
                                "dismissedOn": null,
                                "role": "Buyer",
                                "notificationTo": "T2XA",
                                "note": "ksjhfgwejhgkrjhwg",
                                "noteCreatedOn": "2020-10-27T09:33:40",
                                "taskCompletedOn": "2020-10-27T09:33:40",
                                "taskOwnerCd": "BUY",
                                "taskOwner": "Buyer",
                                "notecreatedBy": "Sumija Thallassery",
                                "noteOwnerRole": "Deal Specialist"
                            }
                        }
                    },
                    {
                        "dealInfo": {
                            "dealID": 4,
                            "dealTypeID": 1,
                            "dealType": "LPL to LPL Acquisition",
                            "dealName": "T2XA and CCCA",
                            "notification": {
                                "notificationID": 64,
                                "notification": "New Note - Buyer Signs Letter of Intent",
                                "notificationType": "NL",
                                "dealTaskID": 172,
                                "noteID": 195,
                                "readFlag": "R",
                                "readOn": "2020-10-29T14:19:53",
                                "isDismissed": false,
                                "dismissedOn": null,
                                "role": "Buyer",
                                "notificationTo": "T2XA",
                                "note": "ksjhfgwejhgkrjhwg",
                                "noteCreatedOn": "2020-10-27T09:33:40",
                                "taskCompletedOn": "2020-10-27T09:33:40",
                                "taskOwnerCd": "BUY",
                                "taskOwner": "Buyer",
                                "notecreatedBy": "Sumija Thallassery",
                                "noteOwnerRole": "Deal Specialist"
                            }
        
                        }
                    }
                ]
            }
        
        }
        //return md;
    }

    updateNotification(param) {
        
        return this.httpService
          .post(AppSettings.updateNotiifcation, param, AppSettings.apiKey)
          .pipe(map((response) => response));
      }
}
