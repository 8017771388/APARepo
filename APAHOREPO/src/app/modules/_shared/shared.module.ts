import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule} from 'ngx-bootstrap/modal';
//import { NgSelectModule } from '@ng-select/ng-select';
import { SafeHtmlPipe } from './pipes/pipe.safehtml';
import {BooleanConverterpipe} from './pipes/pipe.boolean.converter';
import { UpperCaseDirective } from './directives/uppercase';
import { PhoneNumberDirective } from './directives/phoneNumber';
import { ZipConverterDirective } from './directives/zipConverter';
import { FilterPipe } from './pipes/pipe.filter';
import { BooleanFilterPipe } from './pipes/pipe.boolean.filter';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component'; 
//import { DxGridComponent } from './components/dxGrid/dxgrid.component';
import { DxDataGridModule } from 'devextreme-angular';
import { AuthGuardService } from './guards/auth.guard';
import { RouterModule } from '@angular/router';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { DueDatePipe } from './pipes/due-date.pipe';
import { ShortNamePipe } from './pipes/short-name.pipe';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { AddTaskComponent } from '../_shared/components/add-task/add-task.component';
import { CompletedTasksComponent } from '../_shared/components/completed-tasks/completed-tasks.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { OneDigitDecimaNumberDirective } from './directives/decimalValidator';
import { CreateTasksComponent } from './components/create-tasks/create-tasks.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { AddStageComponent } from './components/add-stage/add-stage.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { AddAdvisorComponent } from './components/add-advisor/add-advisor.component';
import { ReassignTaskComponent } from './components/reassign-task/reassign-task.component';
import { TaskReorderComponent } from './components/task-reorder/task-reorder.component';
import { NotificationComponent } from './components/notification/notification.component';
import { DirtyCheckGuard } from './guards/dirty-check.guard';



@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        DxDataGridModule,     
        BsDatepickerModule.forRoot(), 
        DragDropModule,
        ModalModule.forRoot(),
        TypeaheadModule.forRoot(), 
        UiSwitchModule.forRoot({
            size: 'small',
            color: '#3f681c',
            switchColor: '#ffffff',
            defaultBgColor: '#ecebeb',
            defaultBoColor : '#094f00',
            checkedLabel: 'Deselect',
            uncheckedLabel: 'Select'
          }),  
    ],
    declarations: [
        SafeHtmlPipe,
        BooleanConverterpipe,
        UpperCaseDirective,
        PhoneNumberDirective,
        ZipConverterDirective,
        FilterPipe,
        BooleanFilterPipe,
        HeaderComponent,
        SideBarComponent,
        SignOutComponent,
        DueDatePipe,
        ShortNamePipe,
        ConfirmModalComponent,
        OneDigitDecimaNumberDirective,
        CreateTasksComponent,
        AddTaskComponent,
        AddStageComponent,
        AddDepartmentComponent,
        AddNoteComponent,
        AddAdvisorComponent,
        CompletedTasksComponent,
        ReassignTaskComponent,
        NotificationComponent,
        TaskReorderComponent
    ],
    exports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        UpperCaseDirective,
        PhoneNumberDirective,
        OneDigitDecimaNumberDirective,
        ZipConverterDirective,
        FilterPipe,
        BooleanFilterPipe,
        BooleanConverterpipe,
        DueDatePipe,
        ShortNamePipe,
        HeaderComponent,
        SideBarComponent,
        SignOutComponent
    
    ],
    entryComponents: [
        ConfirmModalComponent,
        AddTaskComponent,
        AddStageComponent,
        AddDepartmentComponent,
        AddNoteComponent,
        AddAdvisorComponent,
        CompletedTasksComponent,
        ReassignTaskComponent,
        TaskReorderComponent
    ],
    providers: [AuthGuardService, DirtyCheckGuard]
})

export class SharedModule { }
