import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HttpService } from "../../_shared/services/http.services";
import { AppSettings } from "../../_shared/constants/api-constant";
import { CommunicationService } from "../../_shared/services/communication.services";

@Injectable({
    providedIn: "root",
})
export class PremiumBuyerService {
    constructor(
        private httpService: HttpService,
        private http: HttpClient,
        private cs: CommunicationService
    ) {}

   
    getPremiumBuyer(param) {
          
         return this.httpService
            .post(AppSettings.getPremiumBuyerList, param, AppSettings.apiKey)
            .pipe(
                map((response) => {
                    response
                    return response;
                })
            );

       // return mockData;
    }

    getFilterValues(param) {
        //console.log(param);
        return this.httpService
            .post(AppSettings.filterValues, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    saveBuyerProfile(param) {
        return this.httpService
            .post(AppSettings.saveBuyerProfile, param, AppSettings.apiKey)
            .pipe(map((response) => response));
    }

    saveSellerOpportunity(param) {
      return this.httpService
          .post(AppSettings.saveSellerOpportunity, param, AppSettings.apiKey)
          .pipe(map((response) => response));
    }

    getSellers(param){     

      return this.httpService
        .post(AppSettings.getSellerList, param, AppSettings.apiKey)
        .pipe(
            map((response) => {
                response
                return response;
            })
        );          

    }

    getOpportunityDetails(param){
      return this.httpService.get(AppSettings.getOpprtunityDetails+ "/" + param)
      //return this.httpService
      //.post(AppSettings.getOpprtunityDetails, param, AppSettings.apiKey)
      .pipe(map((response) => response));

    }

    inlineUpdateBuyerProfile(param) {

        return this.httpService
            .post(AppSettings.inlineUpdateBuyerProfile, param, AppSettings.apiKey)
            .pipe(
                map((response) => {
                    response
                    return response;
                })
            );

        // return mockData;
    }
    inlineUpdateSellerProfile(param) {

        return this.httpService
            .post(AppSettings.inlineUpdateSellerProfile, param, AppSettings.apiKey)
            .pipe(
                map((response) => {
                    response
                    return response;
                })
            );

        // return mockData;
    }
}
