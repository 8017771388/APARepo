import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HttpService } from "../../_shared/services/http.services";
import { AppSettings } from "../../_shared/constants/api-constant";
import { CommunicationService } from "../../_shared/services/communication.services";

@Injectable({
    providedIn: "root",
})
export class AssurancePlanService {
    constructor(
        private httpService: HttpService,
        private http: HttpClient,
        private cs: CommunicationService
    ) {}

    /**
     * A`POST` request that creates a box folder for Assurance Plan
     * based on Advisor Full Name + (Rep ID) and returns a response
     *
     *
     * @return An `Observable` of the response, with the response body as an `TBD`.
     */
    createBoxFolder(param) {
        return this.httpService.post(
            AppSettings.createBoxFolder,
            param,
            AppSettings.apiKey
        );
    }

    getPlanList(param) {
        console.log(param);
        var mockData = {
            status: "success",
            statusMessage: "",
            data: {
                totalCount: 1,
                advisorProfileList: [
                    {
                        profileID: 1,
                        advisorName: "Test Account",
                        repID: "CCCA",
                        isProfileActive: 1,
                        isActive: 1,
                        contractEndDate: "2020-07-21T09:50:01",
                        boxLink: "",
                        valuation: {
                            valuationID: 1,
                            estimatedMarketValue: 100,
                            estimatedMarketValueDate: "2020-07-21T09:50:01",
                            lplGuaranteedPayment: 111,
                            lplGuaranteedPaymentDate: 111,
                            isActive: 1,
                        },

                        notes: [
                            {
                                noteID: 107,
                                note: "test",
                                IsInternal: "",
                                createdByUsername: "sthallas",
                                createdByName: "Sumija Thallassery",
                                createdOn: "2020-07-21T09:50:29",
                                isActive: 1,
                            },
                            {
                                noteID: 106,
                                noteLevel: "TL ",
                                note: "test note for defect",
                                IsInternal: "",
                                createdByUsername: "sthallas",
                                createdByName: "Sumija Thallassery",
                                createdOn: "2020-07-21T09:50:01",
                                isActive: 1,
                            },
                        ],
                        potentialSuccessor: {
                            successorID: 1,
                            successorFullName: "Sumija Thallassery",
                            successorMasterRepID: "",
                            isActive: 1,
                        },
                        beneficiary: [
                            {
                                beneficiaryID: 1,
                                beneficiaryPercentage: 100,
                                beneficiaryFullName: "Sumija Thallassery",
                                beneficiarySequence: 1,
                                isActive: 1,
                            },
                            {
                                beneficiaryID: 2,
                                beneficiaryPercentage: 100,
                                beneficiaryName: "Sonam Yadav",
                                beneficiarySequence: 2,
                                isActive: 1,
                            },
                        ],
                    },
                ],
            },
        };
        return this.httpService
            .post(AppSettings.getAsPlnAdvisorProfile, param, AppSettings.apiKey)
            .pipe(
                map((response) => {
                    //response
                    return response;
                })
            );

        //return mockData;
    }

    getFilterValues(param) {
        console.log(param);
        return this.httpService
            .post(AppSettings.filterValues, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    searchAdvisorAP(searchText) {
        var url = AppSettings.getAssociatedReps + searchText;
        var separator = url.indexOf("?") === -1 ? "?" : "&";
        url = url + separator + "noCache=" + new Date().getTime();

        return this.httpService.get(url, {}, AppSettings.apiKey).pipe(
            map((resp: Response) => {
                resp["data"]["masterRep"].map((val) => {
                    val.repIdWithName =
                        val.repIdWithName + " | " + val.firstName;
                });
                this.cs.setrRepDetails(resp["data"]);
                return resp["data"]["masterRep"];
            })
        );
    }

    searchMoreAdvisorPB(searchText, buyerId) {
        var url = AppSettings.searchAdvisorBP + searchText+'?'+'buyerProfileID=' + buyerId;
        var separator = url.indexOf("?") === -1 ? "?" : "&";
        url = url + separator + "noCache=" + new Date().getTime();

        return this.httpService.get(url, {}, AppSettings.apiKey).pipe(
            map((resp: Response) => {
                console.log(resp["data"]);
                //if (resp["data"]["advisors"].length <= 0) return res["data"];
                return resp["data"]["advisors"];
            })
        );
    }

    saveProfile(param) {
        return this.httpService
            .post(AppSettings.saveProfile, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    deleteBeneficiary(param) {
        return this.httpService
            .post(AppSettings.deleteBeneficiary, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    getAssociatedRep(repId) {
        var url = AppSettings.getAssociatedReps + repId;
        var separator = url.indexOf("?") === -1 ? "?" : "&";
        url = url + separator + "noCache=" + new Date().getTime();

        return this.httpService.get(url, {}, AppSettings.apiKey).pipe(
            map((resp: Response) => {
                return resp["data"];
            })
        );
    }
}
