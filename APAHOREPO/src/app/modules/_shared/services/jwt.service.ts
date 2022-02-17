import { Injectable } from '@angular/core';
import { HttpService } from './http.services'
import { CW_IMAGE_URL } from '../constants/api-constant';

@Injectable({
    providedIn: 'root'
})
export class JWTService {

    constructor(private httpService: HttpService) {}

    getJWTtoken(): string {
        return this.httpService.getCookie('hozjwt');
    }

    getParsedJwt(token?: string): any {
        token = token || this.getJWTtoken();
        if (!token) {
            return null;
        }
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        return JSON.parse(jsonPayload);
    }

    isExpire(token?: string): boolean {
        let expired = false;
        const jwtToken = this.getParsedJwt(token);
        //console.log(jwtToken)
        expired = !jwtToken ? true : Math.round(new Date().getTime() / 1000) >= jwtToken.exp ? true : false;
        //console.log(jwtToken.exp);
        //console.log(Math.round(new Date().getTime() / 1000));
        //console.log(expired);
        return expired;
    }

    refreshToken() {
        return this.httpService.getCookieImage(CW_IMAGE_URL);
    }
}
