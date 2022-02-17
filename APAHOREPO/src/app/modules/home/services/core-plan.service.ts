import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "../../_shared/services/http.services";
import { AppSettings } from "../../_shared/constants/api-constant";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CorePlanService {
    constructor(private httpService: HttpService, private router: Router) {}

    //   getActionPlan(param) {
    //       var uri = AppSettings.getActionPlan + "?repId=" + param.repId + '&goalStatus=' + param.status;
    //       var separator = uri.indexOf('?') === -1 ? '?' : '&';
    //       uri = uri + separator + 'noCache=' + new Date().getTime();
    //   return this.httpService
    //   .get(uri, {}, AppSettings.apiKey)
    //   .pipe(map(response => response));

    // }

    // updateActionPlanGoal(param){
    //   return this.httpService
    //   .post(AppSettings.updateActionPlanGoal, param, AppSettings.apiKey)
    //   .pipe(map(response => response));
    // }

    // modifyTask(param){
    //   return this.httpService
    //   .post(AppSettings.saveActionPlan, param, AppSettings.apiKey)
    //   .pipe(map(response => response));

    // }

    // completeTask(param){
    //   return this.httpService
    //   .post(AppSettings.completeTask, param, AppSettings.apiKey)
    //   .pipe(map(response => response));
    // }

    // getCategoryGoalsList(){
    //   var url = AppSettings.categoryGoalsList;
    //   var separator = url.indexOf('?') === -1 ? '?' : '&';
    //   url = url + separator + 'noCache=' + new Date().getTime();
    //   return this.httpService
    //   .get(url, {}, AppSettings.apiKey)
    //   .pipe(map(response => response));
    // }

    // getTasks(goalId){
    //   var url = AppSettings.tasks + "/" + goalId;
    //   var separator = url.indexOf('?') === -1 ? '?' : '&';
    //   url = url + separator + 'noCache=' + new Date().getTime();
    //   return this.httpService
    //   .get(url, {}, AppSettings.apiKey)
    //   .pipe(map(response => response));
    // }

    // deleteGoal(param) {
    //   var url = AppSettings.updateActionPlanGoal +
    //       "?actionPlanId=" + param.actionPlanId +
    //       "&actionPlanDetailId=" + param.actionPlanDetailId +
    //       "&username=" + param.username +
    //       "&goal=" + encodeURIComponent(param.goal) +
    //       "&categoryId=" + param.categoryId;
    //   return this.httpService
    //   .delete(url, null, AppSettings.apiKey)
    //   .pipe(map(response => response))
    // }

    // editTask(param){
    //   return this.httpService
    //   .post(AppSettings.actionPlanTask, param, AppSettings.apiKey)
    //   .pipe(map(response => response));
    // }

    // deleteTask(param) {
    //   var url = AppSettings.actionPlanTask +
    //       "?actionPlanId=" + param.actionPlanId +
    //       "&actionPlanDetailId=" + param.actionPlanDetailId +
    //       "&username=" + param.username;
    //   return this.httpService
    //   .delete(url, null, AppSettings.apiKey)
    //   .pipe(map(response => response))
    // };

    // getAllNotes(param, read : string = null){
    //   var path = AppSettings.getAllNote + '/' + param.taskId;
    //   path = path + '?repId=';
    //   if(read == 'U'){
    //     path = path + '&readIndicator='+read;
    //   }
    //     var separator = path.indexOf('?') === -1 ? '?' : '&';
    //     path = path + separator + 'noCache=' + new Date().getTime();
    //   return this.httpService
    //   .get(path, {}, AppSettings.apiKey)
    //   .pipe(map(response => response))

    // }

    // addNote(param){
    //   return this.httpService
    //   .post(AppSettings.addNote, param, AppSettings.apiKey)
    //   .pipe(map(response => response))
    // }

    // getAllVcfos(searchName){
    //   var url = AppSettings.allVcfos + "?search=" + searchName
    //   var separator = url.indexOf('?') === -1 ? '?' : '&';
    //   url = url + separator + 'noCache=' + new Date().getTime();

    //   return this.httpService
    //   .get(url, {}, AppSettings.apiKey)
    //   .pipe(map(response => response));
    // }

    // getGoalDetails = function (param) {
    //   if (param.goalId != null) {
    //       var url = AppSettings.goalDetails + '?actionPlanId=' + param.actionPlanId + '&goal=' + encodeURIComponent(param.goal) + '&goalId=' + param.goalId + '&categoryId=' + param.categoryId + '&category=' + encodeURIComponent(param.category) + '&status=' + param.status;
    //   }
    //   else {
    //       var url = AppSettings.goalDetails + '?actionPlanId=' + param.actionPlanId + '&goal=' + encodeURIComponent(param.goal) + '&categoryId=' + param.categoryId + '&category=' + encodeURIComponent(param.category) + '&status=' + param.status;
    //   }

    //   var separator = url.indexOf('?') === -1 ? '?' : '&';
    //   url = url + separator + 'noCache=' + new Date().getTime();

    //   return this.httpService
    //   .get(url, {}, AppSettings.apiKey)
    //   .pipe(map(response => response));
    // }

    // searchAdvisor(searchText){
    //   var url = AppSettings.searchAdvisor + "?search=" + searchText
    //   var separator = url.indexOf('?') === -1 ? '?' : '&';
    //   url = url + separator + 'noCache=' + new Date().getTime();

    //   return this.httpService
    //   .get(url, {}, AppSettings.apiKey)
    //   .pipe(map((res: Response) => res["data"]))
    // }

    // saveGoalOrder(param) {
    //   return this.httpService
    //   .post(AppSettings.saveGoalOrder, param, AppSettings.apiKey)
    //   .pipe(map(response => response))
    // }

    // getAllAnalysts(){
    //   return this.httpService
    //   .get(AppSettings.allAnalysts, {}, AppSettings.apiKey)
    //   .pipe(map(response => response));
    // }

    // getInternalStatus(param){
    //   var uri = AppSettings.internalStatus + "?subjectArea=" + param;
    //       var separator = uri.indexOf('?') === -1 ? '?' : '&';
    //       uri = uri + separator + 'noCache=' + new Date().getTime();
    //   return this.httpService
    //   .get(uri, {}, AppSettings.apiKey)
    //   .pipe(map(response => response));
    // }
}
