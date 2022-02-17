import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.scss']
})
export class AddStageComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  public title: any;

  ngOnInit() {
  }

}
