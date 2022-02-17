import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "../../_shared/services/http.services";
import { AppSettings } from "../../_shared/constants/api-constant";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class MasterLibraryService {
    constructor(private httpService: HttpService, private router: Router) {}

    getAllCategories() {
        var mockData = {
            status: "success",
            statusMessage: "",
            data: [
                {
                    categoryId: 100,
                    category: "Discovery",
                    purpose: "Revenue Growth - Current Client",
                    createdBy: "",
                    createdOn: "",
                    modfiedBy: "",
                    modifiedOn: "",
                    isActive: "1",
                },
                {
                    categoryId: 101,
                    category: "Due Diligence",
                    purpose: "Increased Business Profitability",
                    createdBy: "",
                    createdOn: "",
                    modfiedBy: "",
                    modifiedOn: "",
                    isActive: "1",
                },
                {
                    categoryId: 102,
                    category: "Closing",
                    purpose: "Revenue Growth - New Clients",
                    createdBy: "",
                    createdOn: "",
                    modfiedBy: "",
                    modifiedOn: "",
                    isActive: "1",
                },
                {
                    categoryId: 103,
                    category: "Integration",
                    purpose: "Risk Reduction",
                    createdBy: "",
                    createdOn: "",
                    modfiedBy: "",
                    modifiedOn: "",
                    isActive: "1",
                },
            ],
        };

        return mockData;
    }

    getAllDealTypes() {
        var url = AppSettings.dealTypes;
        var separator = url.indexOf("?") === -1 ? "?" : "&";
        url = url + separator + "noCache=" + new Date().getTime();
        return this.httpService
            .get(url, {}, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    getAllStages(dealTypeId) {
        var url = AppSettings.getStages + dealTypeId;
        var separator = url.indexOf("?") === -1 ? "?" : "&";
        url = url + separator + "noCache=" + new Date().getTime();
        return this.httpService
            .get(url, {}, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    getAllGoals(categoryId, searchTxt) {
        //var uri = AppSettings.goals + '/' + categoryId;
        //if (searchTxt) {
        //    uri = uri + '?search=' + searchTxt;
        //    var separator = uri.indexOf('?') === -1 ? '?' : '&';
        //    uri = uri + separator + 'noCache=' + new Date().getTime();
        //}
        //return this.httpService
        //    .get(uri, {}, AppSettings.apiKey)
        //    .pipe(map(response => response));
    }

    getAllTasks(param) {
        var url = AppSettings.getMLTasks;
        var separator = url.indexOf("?") === -1 ? "?" : "&";
        url = url + separator + "noCache=" + new Date().getTime();
        return this.httpService
            .post(url, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    saveTask(param) {
        var url = AppSettings.saveMLTask;
        var separator = url.indexOf("?") === -1 ? "?" : "&";
        url = url + separator + "noCache=" + new Date().getTime();
        return this.httpService
            .post(url, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    saveDealLibraryTaskOrder(param){
        var url = AppSettings.saveDealTaskOrder;
        var separator = url.indexOf("?") === -1 ? "?" : "&";
        url = url + separator + "noCache=" + new Date().getTime();
        return this.httpService
            .post(url, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }
   
}
