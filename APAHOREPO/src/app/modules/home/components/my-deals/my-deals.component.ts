import { Component, OnInit } from '@angular/core';
import {HomeService } from '../../services/home.service'
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';


@Component({
  selector: 'app-my-deals',
  templateUrl: './my-deals.component.html',
  styleUrls: ['./my-deals.component.scss']
})
export class MyDealsComponent implements OnInit {

  constructor(private homeService : HomeService) { }

  public myDeals: any;
  public repItemStorage: any =[];
  public fromDate : any = [];
  public toDate : any = [];
  dataSource: any = {};

  ngOnInit() {
    this.initializeMyDeals();
  }

  initializeMyDeals(){
    this.dataSource.store = new CustomStore({
      key: "dealID",
      load: (loadOptions: any) => {
       //let param = this.generateParameter(loadOptions);
        return new Promise((resolve) => {
          var result =  this.homeService.getMatchingDealsData("");
          this.myDeals = result.data.dealList
          let data = result['data']; 
          data.dealList.forEach((item : any) => {
            item.showFilter = false;
          })              
          resolve({
            data: data['dealList']
          });
        });  
      }
    });
  }

  getTasks(key) {
    console.log('key', key);
    let item = this.repItemStorage.find((i) => i.key === key);
    if (!item) {
      var tasksDet = this.myDeals.filter(item => item.dealId == key)
        item = {
            key: key,
            dataSourceInstance: new DataSource({
                store: new ArrayStore({
                    data: tasksDet[0].tasks,
                    key: "taskKey"
                }),
                filter: ["taskKey", "=", key]
            })
        };
        this.repItemStorage.push(item)
    }
    return item.dataSourceInstance;
  }

  onValueChange(event, dateType, i) {
    let format = 'MMM d, yyyy';
    //console.log(event, dateType, i);
    //console.log(this.showFilter);
    // if(dateType === 'duedate'){
    //   this.tasks.dueDate = this.datePipe.transform(event, format);
    //   this.maxDate = new Date(this.tasks.dueDate);
    //   this.maxDate.setDate(this.maxDate.getDate() - 1); 
    // }   
    // else{
    //   ////console.log(event);
    //   if(event == 'Invalid Date')
    //     event = '';
    //   this.tasks.internalDueDate = this.datePipe.transform(event, format); 
    // }
  }

  calculateFilterExpression(value, selectedFilterOperations, target) {
    let column = this as any;
    if(target === "headerFilter" && value === "weekends") {
        return [[this.getTasks, "=", 0], "or", [this.getTasks, "=", 6]];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
}

orderHeaderFilter(data) {
    data.dataSource.postProcess = (results) => {
        results.push({
            text: "Weekends",
            value: "weekends"
        });
        return results;
    };
}

}
