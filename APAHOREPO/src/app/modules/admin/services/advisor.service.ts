import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HttpService } from "../../_shared/services/http.services";
import { AppSettings } from "../../_shared/constants/api-constant";

@Injectable({
    providedIn: "root",
})
export class AdvisorService {
    constructor(private httpService: HttpService, private http: HttpClient) {}

    getData() {
        var mockJson = {
            status: "success",
            statusMessage: "",
            data: {
                totalCount: 3,
                advisorList: [
                    {
                        advisorName: "Zachrich, Vaishali",
                        repId: "T2XA",
                        cwAccess: "Access Granted",
                        ownershipPerc: 100,
                        totalDeals: 1,
                        activeDeals: 1,
                        status: "In Progress",
                        dealList: [
                            {
                                dealId: 1,
                                dealName: "Clark & Jigalin 2020",
                                dealSpecialist: "Paul Ross",
                                dealType: "LPL to LPL Acquisition",
                                stage: "Discovery",
                                status: "Not Started",
                                startDate: "May 15, 2020",
                                advisorRole: "SELLER",
                            },
                        ],
                    },
                    {
                        advisorName: "Account, Test",
                        repId: "CCCA",
                        cwAccess: "Access Granted",
                        ownershipPerc: 100,
                        totalDeals: 1,
                        activeDeals: 1,
                        status: "Completed",
                        dealList: [
                            {
                                dealId: 2,
                                dealName: "Clark & Jigalin 2020",
                                dealSpecialist: "Paul Ross",
                                dealType: "LPL to LPL Acquisition",
                                stage: "Discovery",
                                status: "Not Started",
                                startDate: "May 15, 2020",
                                advisorRole: "BUYER",
                            },
                        ],
                    },
                    {
                        advisorName: "Booke, Viligius",
                        repId: "260A",
                        cwAccess: "Access Granted",
                        ownershipPerc: 100,
                        totalDeals: 1,
                        activeDeals: 1,
                        status: "Not Started",
                        dealList: [
                            {
                                dealId: 1,
                                dealName: "Clark & Jigalin 2020",
                                dealSpecialist: "Paul Ross",
                                dealType: "LPL to LPL Acquisition",
                                stage: "Discovery",
                                status: "Not Started",
                                startDate: "May 15, 2020",
                                advisorRole: "BUYER",
                            },
                        ],
                    },
                ],
            },
        };

        var mockJsonFinal = {
            status: "success",
            statusMessage: "",
            data: {
                totalCount: 3,
                advisorList: [
                    {
                        advisorName: "Zachrich, Vaishali",
                        repId: "T2XA",
                        cwAccess: "Active",
                        ownershipPerc: 100,
                        totalDeals: 1,
                        activeDeals: 1,
                        cwAccessCode: 1,
                        key: 1,
                    },
                    {
                        advisorName: "Account, Test",
                        repId: "CCCA",
                        cwAccess: "Active",
                        ownershipPerc: 100,
                        totalDeals: 1,
                        activeDeals: 1,
                        cwAccessCode: 1,
                        key: 2,
                    },
                    {
                        advisorName: "BOOKE, VIGILIUS",
                        repId: "260A",
                        cwAccess: "Active",
                        ownershipPerc: 100,
                        totalDeals: 1,
                        activeDeals: 1,
                        cwAccessCode: 1,
                        key: 3,
                    },
                ],

                dealList: [
                    {
                        dealId: 1,
                        dealName: "Clark & Jigalin 2020",
                        dealSpecialist: "Paul Ross",
                        dealType: "LPL to LPL Acquisition",
                        stage: "Discovery",
                        status: "Not Started",
                        startDate: "2020-05-10T00:00:00",
                        advisorRole: "SELLER",
                        key: 1,
                    },
                    {
                        dealId: 1,
                        dealName: "Clark & Jigalin 2020",
                        dealSpecialist: "Paul Ross",
                        dealType: "LPL to LPL Acquisition",
                        stage: "Discovery",
                        status: "Not Started",
                        startDate: "2020-05-10T00:00:00",
                        advisorRole: "BUYER",
                        key: 2,
                    },
                    {
                        dealId: 1,
                        dealName: "Clark & Jigalin 2020",
                        dealSpecialist: "Paul Ross",
                        dealType: "LPL to LPL Acquisition",
                        stage: "Discovery",
                        status: "Not Started",
                        startDate: "2020-05-10T00:00:00",
                        advisorRole: "BUYER",
                        key: 3,
                    },
                ],
            },
        };
        return mockJsonFinal;
        //return this.httpService
        // .post(AppSettings.profiles, param, AppSettings.apiKey)
        // .pipe(map(response => response));
    }

    // getFilters(param) {
    //     return this.httpService
    //         .post(AppSettings.homePage + "/filter", param, AppSettings.apiKey)
    //         .pipe(map((response) => response));
    // }

    // saveAdvisorDetails(param) {
    //     return this.httpService
    //         .post(AppSettings.advisordetails, param, AppSettings.apiKey)
    //         .pipe(map((response) => response));
    // }

    // getAdvisorData(repid) {
    //     var url = AppSettings.advisordetailsEdit + repid;
    //     var separator = url.indexOf("?") === -1 ? "?" : "&";
    //     url = url + separator + "noCache=" + new Date().getTime();
    //     return this.httpService
    //         .get(url, "", AppSettings.apiKey)
    //         .pipe(map((response) => response));
    // }

    // searchVcfos(searchText) {
    //     var url = AppSettings.allVcfos + "?search=" + searchText;
    //     var separator = url.indexOf("?") === -1 ? "?" : "&";
    //     url = url + separator + "noCache=" + new Date().getTime();
    //     return this.httpService
    //         .get(url, {}, AppSettings.apiKey)
    //         .pipe(map((res: Response) => res["data"]));
    // }

    // getRepList(param) {
    //     var path = AppSettings.repList + "/" + param;
    //     var separator = path.indexOf("?") === -1 ? "?" : "&";
    //     path = path + separator + "noCache=" + new Date().getTime();
    //     var arr = [];
    //     return this.httpService.get(path, {}, AppSettings.apiKey).pipe(
    //         map((res: Response) => {
    //             if (res["data"]["primaryrepid"]["name"] !== null) {
    //                 arr.push(res["data"]);
    //             }
    //             return arr;
    //         })
    //     );
    // }

    // getAdDetail(input) {
    //     var path = AppSettings.adDetail + "/" + input;
    //     var separator = path.indexOf("?") === -1 ? "?" : "&";
    //     path = path + separator + "noCache=" + new Date().getTime();

    //     return this.httpService
    //         .get(path, {}, AppSettings.apiKey)
    //         .pipe(map((response) => response));
    // }

    // saveHomeOfficeUser(param) {
    //     return this.httpService
    //         .post(AppSettings.homeOfficeUsers, param, AppSettings.apiKey)
    //         .pipe(map((response) => response));
    // }

    // getAdvisorsByVcfoId(vcfoId) {
    //     var url = AppSettings.searchAdvisor + "?vcfoId=" + vcfoId;
    //     var separator = url.indexOf("?") === -1 ? "?" : "&";
    //     url = url + separator + "noCache=" + new Date().getTime();

    //     return this.httpService
    //         .get(url, {}, AppSettings.apiKey)
    //         .pipe(map((res) => res));
    // }

    // saveAsatFlag(param) {
    //     return this.httpService
    //         .post(AppSettings.enableCWAccess, param, AppSettings.apiKey)
    //         .pipe(map((response) => response));
    // }
}
