import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../models/userInfo.model';
import { Observable } from 'rxjs';
import { USER_ROLE_URL } from '../constants/api-constant';
import { CLOG_PREFIX, STORAGE_KEY } from '../constants/global.constant';

@Injectable()
export class UserInfo {
    public _cLogPrefix = CLOG_PREFIX;
    public _storageKey = STORAGE_KEY;
    public _serviceUrl = '';
    public _imageUrl = '';
    public _imageRefreshInMinutes = 300000;
    public _currentUser: any = {};
    public userName: string;
    public userType : string;
    public userService: UserService;

    public _imageRefreshInMinutesFn(minutes) {
        if (minutes) {
            this._imageRefreshInMinutes = Number(minutes * 60000);
        }
        return this._imageRefreshInMinutes;
    }

    public _imageUrlFn(url) {
        if (url) {
            this._imageUrl = url;
        }
        return this._imageUrl;
    }

    public _serviceUrlFn(url) {
        if (url) {
            this._serviceUrl = url;
        }
        return this._serviceUrl;
    }

    public _currentUserFn() {
        return this._currentUser;
    }

    constructor(private http: HttpClient) {
        this.userService = new UserService();
        this.userService.config.imageRefreshInMinutes = this._imageRefreshInMinutesFn;
        this.userService.config.imageUrl = this._imageUrlFn;
        this.userService.config.serviceUrl = this._serviceUrlFn;
        this.userService.init = this._init;
        this.userService.currentUser = this._currentUserFn;
        this.userService.dummyToProtectCommas = 0;
    }

    public _currentUserFromStorage() {
        this._currentUser = JSON.parse(sessionStorage.getItem(this._storageKey));
        this._currentUser.hasRole = role => {
            let result = false;
            for (let i = 0; i < this._currentUser.groups.length; i++) {
                if (role.toLowerCase() === this._currentUser.groups[i].name.toLowerCase()) {
                    result = true;
                    break;
                }
            }
            return result;
        };
        return this._currentUser;
    }

    public _getCookieImage() {
        return new Promise((resolve, reject) => {
            const hozCookieImage = new Image();
            hozCookieImage.onload = () => {
                resolve();
            };
            hozCookieImage.onerror = () => {
                const er = this._cLogPrefix + 'getCookieImage: Image failed to load, unknown user';
                console.error(er);
                reject(er);
            };
            hozCookieImage.src = this._imageUrl + '?' + new Date().getTime();
        });
    }

    public _getUser() {
        return new Promise((resolve, reject) => {
            this.http.get(this._serviceUrl, { withCredentials: true }).subscribe(
                xhrResponse => {
                    const cu = JSON.parse(JSON.stringify(xhrResponse)).data;
                    sessionStorage.setItem(this._storageKey, JSON.stringify(cu));
                    // required so that sessionStorage matches AngularJS implementation
                    resolve(this._currentUserFromStorage());
                },
                () => reject('HTTP Error')
            );
        });
    }

    public _init() {
        return new Promise((resolve, reject) => {
            if (sessionStorage.getItem(this._storageKey)) {
                resolve(this._currentUserFromStorage());
            } else {
                this._getCookieImage().then(
                    () => {
                        this._getUser().then(
                            rs1 => {
                                resolve(rs1);
                            },
                            er => {
                                reject(er);
                            }
                        );
                    },
                    er => {
                        reject(er);
                    }
                );
            }
        });
    }

    public getUserRoles(): Observable<any> {
        return this.http.get(USER_ROLE_URL);
    }
}
