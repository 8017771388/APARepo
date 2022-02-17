import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule } from 'devextreme-angular';
//import { NgSelectModule } from '@ng-select/ng-select';
import { ValuationRoutingModule } from './valuation.routing.module';
import { ValuationService } from './services/valuation.service';
import { ValuationPageComponent } from './components/valuation-page/valuation-page.component'
import { QuestionaireComponent } from './components/questionaire/questionaire.component'
import { FinancialInformationComponent } from './components/financial-information/financial-information.component'
import { BasicQuestionsComponent } from './components/basic-questions/basic-questions.component';


@NgModule({
  declarations: [
    ValuationPageComponent,
    QuestionaireComponent,
    BasicQuestionsComponent,
    FinancialInformationComponent
  ],
  imports: [
    CommonModule,
    ValuationRoutingModule ,
    DxDataGridModule,
    FormsModule,
    ReactiveFormsModule
    //NgSelectModule
  ],
  providers : [ValuationService]
})
export class ValuationModule { }
