import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  public title: any;
  public department : any = {
    "deptName": '',
    "dlName": "",
    "owner": "",
    "adGroup":""    
  };

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
