import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValuationPageComponent } from './components/valuation-page/valuation-page.component'
import { QuestionaireComponent } from './components/questionaire/questionaire.component';


const routes: Routes = [    
    {
        path: '',
        component: ValuationPageComponent
    },
    {
        path: 'valuation-details',
        component: QuestionaireComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ValuationRoutingModule { }
