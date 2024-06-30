import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalHttpErrorSettings } from './global-httpError-settings';
import { OnInit } from '@angular/core';


/**
 * GlobalHttpErrorInterceptor catches all http error responses from the server in a single location
 * checks if http state is 401 for session expired
 * checks if http state is 400 for false credentials
 */
@Injectable()
export class GlobalHttpErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private notificationService: NotificationService) {}

    //next.handle passes the outgoing request to the next interceptor in the chain 
    //request: the outgoing request object to handle
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {      
        return next.handle(request).pipe(catchError(err => {    
            if ([GlobalHttpErrorSettings.SESSION_EXPIRED_STATUS].includes(err.status) && this.authService.getCurrentUser()) {
                // auto logout if 401 response returned from api
                this.authService.logoutSessionExpired();
            }
            if([GlobalHttpErrorSettings.FALSE_CREDENTIALS_STATUS].includes(err.status)){
                this.authService.falseCredentials();
            }
            if([GlobalHttpErrorSettings.OK_NOT_FOUND_STATUS].includes(err.status)){
                setTimeout(() => {
                    this.notificationService.openSnackBar("Dataset for that Date was not found!");
                  });
            }
            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(() => error);
        }))
    }
}