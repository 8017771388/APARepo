import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import { ValuationService } from '../../services/valuation.service';


@Component({
  selector: 'app-valuation-page',
  templateUrl: './valuation-page.component.html',
  styleUrls: ['./valuation-page.component.scss']
})
export class ValuationPageComponent implements OnInit {

  constructor(private vs : ValuationService) { }


  public valuationProfile: any;
  public repItemStorage: any =[];
  dataSource: any = {};

  ngOnInit() {
    this.initializeGrid();
  }


  initializeGrid(){
    this.dataSource.store = new CustomStore({
      key: "id",
      load: (loadOptions: any) => {
       //let param = this.generateParameter(loadOptions);
        return new Promise((resolve) => {
          var result =  this.vs.valuationProfileData()
          this.valuationProfile = result.data.valProf
          let data = result['data']; 
          resolve({
            data: data['valProf']
          });
        });  
      }
    });
  }

}
