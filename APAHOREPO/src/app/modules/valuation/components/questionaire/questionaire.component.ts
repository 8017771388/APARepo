import { Component, OnInit } from '@angular/core';
//import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from 'src/app/modules/_shared/components/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.scss']
})
export class QuestionaireComponent implements OnInit {

  constructor( private modalService: BsModalService) { }

  public formType: any;
  public states : any = 'AL'; 
  public selectedQuestioire : string = "Buy a practice";
  public activeBtn : string = 'buy';
  public bsModalRef: BsModalRef;

  ngOnInit() {
    this.formType = "basic";
  }

  setFormType(form){
    this.formType = form;
  }

  setQuestionire(selectedQuestioire, activeBtn){
    this.selectedQuestioire = selectedQuestioire; 
    this.activeBtn = activeBtn;
  }

  openConfirmation(){
    let initialState = {
      title: 'Confirm your action',
      confirmTxt: 'Are you confirm? Click on confirm button to proceed.'
      };
      
      this.bsModalRef = this.modalService.show(ConfirmModalComponent, {initialState, backdrop: 'static', class: 'modal-lg'});
      this.bsModalRef.content.closeBtnName = 'Close';
      this.bsModalRef.content.confirm.subscribe(value => {
        if (value === "true"){ 
        }
        else{
        }
    })
  }

}
