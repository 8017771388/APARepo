import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HttpService } from "../../_shared/services/http.services";
import { AppSettings } from "../../_shared/constants/api-constant";
import { mergeMap } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class DealService {
    constructor(private httpService: HttpService, private http: HttpClient) {}
    /**
     * A`POST` request that creates a box folder for Assurance Plan
     * based on Advisor Full Name + (Rep ID) and returns a response
     *
     *
     * @return An `Observable` of the response, with the response body as an `TBD`.
     */
    createBoxFolder(param) {
        return this.httpService.post(
            AppSettings.createBoxFolder, param, AppSettings.apiKey
        );
    }
    saveDeal(param) {
        return this.httpService
            .post(AppSettings.saveDeal, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    deleteNote(param) {
        return this.httpService
            .post(AppSettings.deleteNote, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    searchAdvisor(searchText) {
        var url = AppSettings.searchAdvisor + searchText;
        var separator = url.indexOf("?") === -1 ? "?" : "&";
        url = url + separator + "noCache=" + new Date().getTime();

        return this.httpService.get(url, {}, AppSettings.apiKey).pipe(
            map((resp: Response) => {
                console.log(resp["data"]);
                //if (resp["data"]["advisors"].length <= 0) return res["data"];
                return resp["data"];
            })
        );

        //console.log(res["data"]["advisors"]);
        //return res["data"]["advisors"];
    }

    checkDuplicateDeal(dealName){
        var url = AppSettings.duplicateDeal + dealName;
        var separator = url.indexOf("?") === -1 ? "?" : "&";
        //url = url + separator + "noCache=" + new Date().getTime();

        return this.httpService.get(url, {}, AppSettings.apiKey).pipe(
            map(response => response)
        ); 
    }

    getDealById(id) {
        var mockData = {
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

        return mockData.data.dealList.filter((item) => item.dealID == id);
    }

    // searchAdvisors(searchText) {
    //     var url = AppSettings.allVcfos + "?search=" + searchText;
    //     var separator = url.indexOf("?") === -1 ? "?" : "&";
    //     url = url + separator + "noCache=" + new Date().getTime();
    //     return this.httpService
    //         .get(url, {}, AppSettings.apiKey)
    //         .pipe(map((res: Response) => res["data"]));
    // }

    searchDealSpecialists(searchText) {
        var url = AppSettings.advInfo + searchText;
        var separator = url.indexOf("?") === -1 ? "?" : "&";
        url = url + separator + "noCache=" + new Date().getTime();

        return this.httpService
            .get(url, {}, AppSettings.apiKey)
            .pipe(map((res: Response) => res["data"]["users"]));
    }

    searchDealSpecailist(searchText) {
        let res = {
            status: "success",
            statusMessage: "",
            data: {
                users: [
                    {
                        username: "sthallas",
                        adGroup: [
                            "Intune_Mobile_Blocked",
                            "\\#PP_corportate_routing_group",
                            "Sdshare2",
                            "SG_SD_AllUsers",
                            "SDShare",
                            "\\# Contractors",
                            "\\# Contractors SD",
                            "PST_SDFILEPRD",
                            "SG_Entr_AllUsers",
                        ],
                        firstName: "Sumija",
                        middleName: "",
                        lastName: "Thallasery",
                        fullName: "Sumija Thallasery",
                        email: "alice.yuan@sddev.lpl.com",
                    },
                    {
                        username: "hghatak",
                        adGroup: [
                            "Intune_Mobile_Blocked",
                            "\\#PP_corportate_routing_group",
                            "Sdshare2",
                            "SG_SD_AllUsers",
                            "SDShare",
                            "\\# Contractors",
                            "\\# Contractors SD",
                            "PST_SDFILEPRD",
                            "SG_Entr_AllUsers",
                        ],
                        firstName: "Hiranmoy",
                        middleName: "",
                        lastName: "Ghatak",
                        fullName: "Hiranmoy Ghatak",
                        email: "adrian.zenteno@sddev.lpl.com",
                    },
                    {
                        username: "syadav",
                        adGroup: [
                            "Intune_Mobile_Blocked",
                            "\\#PP_corportate_routing_group",
                            "Sdshare2",
                            "SG_SD_AllUsers",
                            "SDShare",
                            "\\# Contractors",
                            "\\# Contractors SD",
                            "PST_SDFILEPRD",
                            "SG_Entr_AllUsers",
                        ],
                        firstName: "Sonam",
                        middleName: "",
                        lastName: "Yadav",
                        fullName: "Sonam Yadav",
                        email: null,
                    },
                    {
                        username: "tu969",
                        adGroup: [
                            "Intune_Mobile_Blocked",
                            "\\#PP_corportate_routing_group",
                            "Sdshare2",
                            "SG_SD_AllUsers",
                            "SDShare",
                            "\\# Contractors",
                            "\\# Contractors SD",
                            "PST_SDFILEPRD",
                            "SG_Entr_AllUsers",
                        ],
                        firstName: "A969",
                        middleName: "",
                        lastName: "B969",
                        fullName: "A969 B969",
                        email: "a969.b969@sddev.lpl.com",
                    },
                    {
                        username: "ttestuse",
                        adGroup: [
                            "Intune_Mobile_Blocked",
                            "\\#PP_corportate_routing_group",
                            "Sdshare2",
                            "SG_SD_AllUsers",
                            "SDShare",
                            "\\# Contractors",
                            "\\# Contractors SD",
                            "PST_SDFILEPRD",
                            "SG_Entr_AllUsers",
                        ],
                        firstName: "abhiman",
                        middleName: "",
                        lastName: "nahikarrha",
                        fullName: "abhiman nahikarrha",
                        email: "abhiman.nahikarrha@sddev.lpl.com",
                    },
                ],
            },
        };

        [
            {
                repID: "05JA",
                masterRepID: "05JA",
                firstName: "DYONE",
                middleName: "",
                lastName: "DEGROOTE",
                isActive: 1,
                email: "AVICUS.GOETTSCHE@lpl.com",
                repUsername: "AVICUS.GOETTSCHE",
                isTerminated: 0,
                hireDate: "",
                advisorRole: "Buyer",
            },
            {
                repID: "002D",
                masterRepID: "002D",
                firstName: "AVICUS",
                middleName: "",
                lastName: "GOETTSCHE",
                isActive: 1,
                email: "AVICUS.GOETTSCHE@lpl.com",
                repUsername: "AVICUS.GOETTSCHE",
                isTerminated: 0,
                hireDate: "",
                advisorRole: "Seller",
            },
            {
                repID: "011H",
                masterRepID: "011H",
                firstName: "CLETO",
                middleName: "",
                lastName: "DERUSHA",
                isActive: 1,
                email: "ARISTIDE.BOHLKEN@lpl.com",
                repUsername: "vaishali.zachrich",
                isTerminated: 0,
                hireDate: "",
                advisorRole: "Seller",
            },
        ];

        return res["data"]["users"];
    }

    saveDeals() {
        var abc = {
            username: "sthallas",
            dealJson: {
                masterAdvisorList: [
                    {
                        repID: "05JA",
                        masterRepID: "05JA",
                        firstName: "DYONE",
                        middleName: "",
                        lastName: "DEGROOTE",
                        isActive: 1,
                        email: "AVICUS.GOETTSCHE@lpl.com",
                        repUsername: "AVICUS.GOETTSCHE",
                        isTerminated: 0,
                        hireDate: "",
                        advisorRole: "Buyer",
                    },
                    {
                        repID: "1234",
                        masterRepID: "002D",
                        firstName: "AVICUS",
                        middleName: "",
                        lastName: "GOETTSCHE",
                        isActive: 1,
                        email: "AVICUS.GOETTSCHE@lpl.com",
                        repUsername: "AVICUS.GOETTSCHE",
                        isTerminated: 0,
                        hireDate: "",
                        advisorRole: "Seller",
                    },
                    {
                        repID: "011H",
                        masterRepID: "011H",
                        firstName: "CLETO",
                        middleName: "",
                        lastName: "DERUSHA",
                        isActive: 1,
                        email: "ARISTIDE.BOHLKEN@lpl.com",
                        repUsername: "vaishali.zachrich",
                        isTerminated: 0,
                        hireDate: "",
                        advisorRole: "Seller",
                    },
                ],
                dealSpecialistInfo: {
                    homeOfficeUserID: 1,
                    username: "sthallas",
                    firstName: "Sumija",
                    middleName: "",
                    lastName: "Thallassery",
                    roleCd: "DS",
                    email: "sumija.thallassery@lpl.com",
                },
                dealInfo: {
                    dealID: 1,
                    dealName: "AVICUS GOETTSCHE & CLETO DERUSHA",
                    dealTypeID: 1,
                    dealStartDate: "2020-06-12T00:00:00",
                    dealTargetCloseDate: "2022-07-04T00:00:00",
                    dealStatusCd: "IP",
                    dealStageID: 1,
                },
                dealNotes: {
                    note: "test",
                    isInternal: 1,
                    noteLevel: "DL",
                    isActive: 1,
                    readFlag: "R",
                },
            },
        };
    }
}
