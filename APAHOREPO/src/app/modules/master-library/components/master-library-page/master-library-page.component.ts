import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../_shared/services/communication.services';

@Component({
  selector: 'app-master-library-page',
  templateUrl: './master-library-page.component.html',
  styleUrls: ['./master-library-page.component.scss']
})
export class MasterLibraryPageComponent implements OnInit {

  constructor( private communicationService : CommunicationService) { }

  ngOnInit() {
    this.communicationService.hideNotiIcon();
  }

}
