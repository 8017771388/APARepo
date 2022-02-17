import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StageComponent } from './components/stage/stage.component';
import { DealTypeComponent } from './components/dealtype/dealtype.component';
import { MasterLibraryRoutingModule } from './master-library.routing.module';
import { MasterLibraryService } from './services/master-library.service';
import { MasterLibraryPageComponent } from './components/master-library-page/master-library-page.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TaskComponent } from './components/task/task.component';
import { AddMasterTasksComponent } from './components/add-master-tasks/add-master-tasks.component';
//import { AddCategoryComponent } from './components/add-category/add-category.component';
//import { AddGoalComponent } from './components/add-goal/add-goal.component';
//import { AddTaskComponent } from './components/add-task/add-task.component';

@NgModule({
    declarations: [StageComponent, MasterLibraryPageComponent, DealTypeComponent, TaskComponent, AddMasterTasksComponent],
    imports: [
        CommonModule,
        SharedModule,
        MasterLibraryRoutingModule,
        TabsModule.forRoot(),
        BsDatepickerModule.forRoot(),
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
    ],
    entryComponents: [AddMasterTasksComponent],
    providers: [MasterLibraryService]
})
export class MasterLibraryModule { }
