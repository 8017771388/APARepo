import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpService } from "./modules/_shared/services/http.services";
import { CommunicationService } from "./modules/_shared/services/communication.services";
import { PageTitle } from "./modules/_shared/services/page-title.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HozXhrInterceptor } from "./modules/_shared/services/hozXhrInterceptor.service";
import { AuthenticationService } from "./modules/_shared/services/authentication.service";
import { UserInfo } from "./modules/_shared/services/userInfo.service";
import { SharedModule } from "./modules/_shared/shared.module";
import { AuthGuardService } from "./modules/_shared/guards/auth.guard";
import { JWTService } from "./modules/_shared/services/jwt.service";
import { ModalModule } from "ngx-bootstrap/modal";
import { MasterLibraryModule } from "./modules/master-library/master-library.module";
import { ValuationModule } from "./modules/valuation/valuation.module";
import { ErrorModule } from "./modules/error/error.module";
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { DirtyCheckGuard } from "./modules/_shared/guards/dirty-check.guard";


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        SharedModule,
        ErrorModule,
        ModalModule.forRoot(),
        MasterLibraryModule,
        ValuationModule,
         ToastrModule.forRoot({
             timeOut: 3500,
             positionClass: 'toast-bottom-full-width',
             preventDuplicates: true,
         }),
        // ToastContainerModule
    ],
    providers: [
        HttpService,
        CommunicationService,
        PageTitle,
        AuthenticationService,
        UserInfo,
        HttpClientModule,
        AuthGuardService,
        DirtyCheckGuard,
        JWTService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HozXhrInterceptor,
            multi: true,
        },
        Title,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
