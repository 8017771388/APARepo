import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from './component/error.component';
import { SharedModule } from '../_shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        ErrorComponent
    ],
    exports: [
        ErrorComponent
    ],
    providers: [],
})
export class ErrorModule { }
