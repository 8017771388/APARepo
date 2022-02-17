import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, Observable } from "rxjs";
import { threadId } from "worker_threads";

@Injectable()
export class CommunicationService {
    private loggedin = new BehaviorSubject(null);
    private userInfo = new BehaviorSubject<any>(null);
    private loader = new BehaviorSubject<boolean>(false);
    private logger = new Subject<any>();
    private accessType = new BehaviorSubject(null);
    private dealData = new BehaviorSubject<any>(null);
    private allCfos = new BehaviorSubject<any>(null);
    public masterAdvisor = new BehaviorSubject<any>(null);
    public splitAdvisor = new BehaviorSubject<any>(null);
    public dealAdvisor = new BehaviorSubject<any>(null);
    public dealDetail = new BehaviorSubject<any>(null);
    public dealType = new BehaviorSubject<any>("add");
    public editDealFrom = new BehaviorSubject<any>(null);
    public notificationBell = new BehaviorSubject<boolean>(false);
    public repDetails = new BehaviorSubject<any>(null);
    public notificationDealObj = new BehaviorSubject<any>(null);
    public isDirtyCheck = new BehaviorSubject<boolean>(false);
    public buyerProfileStatusFlag = new BehaviorSubject<boolean>(false);
    public sellerStageFlag = new BehaviorSubject<boolean>(false);

    constructor() {}

    setAccessType(accessType) {
        this.accessType.next(accessType);
    }

    getAccessType(): Observable<boolean> {
        return this.accessType.asObservable();
    }

    getLoggedInType(): Observable<boolean> {
        return this.loggedin.asObservable();
    }

    setLoggedinType(type: boolean): void {
        this.loggedin.next(type);
    }

    clearLoggedinType(): void {
        this.loggedin.next(null);
    }

    getUserInfo(): Observable<any> {
        return this.userInfo.asObservable();
    }

    setUserInfo(data: any): void {
        this.userInfo.next(data);
    }

    clearUserInfo(): void {
        this.userInfo.next(null);
    }

    getLoader(): Observable<boolean> {
        return this.loader.asObservable();
    }

    displayLoader(data: boolean): void {
        this.loader.next(data);
    }

    clearLoader(): void {
        this.loader.next(false);
    }

    setIsDirty(data: boolean): void {
        this.isDirtyCheck.next(data);
    }
    getIsDirty(): Observable<boolean> {
        return this.isDirtyCheck.asObservable();
    }
    clearIsDirty(): void {
        this.isDirtyCheck.next(false);
    }
    getLogger(): Observable<any> {
        return this.logger.asObservable();
    }

    setLogger(data): void {
        this.logger.next(data);
    }

    clearLogger(): void {
        this.logger.next(false);
    }

    getDealData(): Observable<any> {
        return this.dealData.asObservable();
    }

    setDealData(data): void {
        this.dealData.next(data);
    }

    getCFO(): Observable<any> {
        return this.allCfos.asObservable();
    }

    setCFO(data): void {
        this.allCfos.next(data);
    }

    setMasterAdvisor(data): void {
        this.masterAdvisor.next(data);
    }

    getMasterAdvisor(): Observable<any> {
        return this.masterAdvisor.asObservable();
    }

    setSplitAdvisor(data): void {
        this.splitAdvisor.next(data);
    }

    getSplitAdvisor(): Observable<any> {
        return this.splitAdvisor.asObservable();
    }

    setDealAdvisor(data): void {
        this.dealAdvisor.next(data);
    }

    getDealAdvisor(): Observable<any> {
        return this.dealAdvisor;
    }

    setDealDetail(data): void {
        this.dealDetail.next(data);
    }

    getDealDetail(): Observable<any> {
        return this.dealDetail;
    }

    setDealType(data): void {
        this.dealType.next(data);
    }

    getDealType(): Observable<any> {
        return this.dealType;
    }

    setEditDealFrom(data): void {
        this.editDealFrom.next(data);
    }

    getEditDealFrom(): Observable<any> {
        return this.editDealFrom;
    }

    showNotiIcon(data: boolean): void {
        this.notificationBell.next(data);
    }

    hideNotiIcon(): void {
        this.notificationBell.next(false);
    }

    getNotiIcon(): Observable<any> {
        return this.notificationBell.asObservable();
    }

    setrRepDetails(data): void {
        this.repDetails.next(data);
    }

    getRepDetails(): Observable<any> {
        return this.repDetails;
    }

    setNotificationDeal(data): void {
        this.notificationDealObj.next(data);
    }

    getNotificationDeal(): Observable<any> {
        return this.notificationDealObj;
    }
    resetNotificationDeal(): void{
        this.notificationDealObj.next(null);
    }

    setBuyerProfileStatusFlag(data: boolean): void {
        this.buyerProfileStatusFlag.next(data);
    }
    getBuyerProfileStatusFlag(): Observable<boolean> {
        return this.buyerProfileStatusFlag.asObservable();
    }

    setSellerStageFlag(data: boolean): void {
        this.sellerStageFlag.next(data);
    }
    getSellerStageFlag(): Observable<boolean> {
        return this.sellerStageFlag.asObservable();
    }
}
