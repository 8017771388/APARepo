import { Injectable} from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Observable';
import { throwError} from 'rxjs';
import { JWTService } from './jwt.service';
import { CW_IMAGE_URL, AUTH_URL } from '../constants/api-constant';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class HozXhrInterceptor implements HttpInterceptor {

    constructor(private jwtService: JWTService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return from(this.handleAccess(request, next));

        if (
            request.url.toLocaleLowerCase().indexOf('.json') >= 0 ||
            request.url === AUTH_URL ||
            request.url === CW_IMAGE_URL
        ) {
            return next.handle(request);
        }

        if (this.jwtService.isExpire()) {
            return this.jwtService.refreshToken().pipe(switchMap(() => {
                request = request.clone({
                    setHeaders: {
                        // This is where you can use your various tokens
                        'hoz-jwt': `${this.jwtService.getJWTtoken()}`
                    }
                });
                return next.handle(request);
            }));
        }

        request = request.clone({
            setHeaders: {
                // This is where you can use your various tokens
                'hoz-jwt': `${this.jwtService.getJWTtoken()}`
            }
        });

        return next.handle(request).pipe(catchError(error => {
            // intercept the respons error and displace it to the console . Stop the Loader and message shown
            // return the error to the method that called it
            return throwError(error);
        })) as any;
    }
}
