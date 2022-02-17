import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss']
})
export class MyTaskComponent implements OnInit {

  constructor(private homeService : HomeService) { }

  public myTaskList: any;
  dataSource: any = {};

  ngOnInit() {
    this.initializeGrid();
  }

  initializeGrid(){
    this.dataSource.store = new CustomStore({
      key: "taskId",
      load: (loadOptions: any) => {
       //let param = this.generateParameter(loadOptions);
        return new Promise((resolve) => {
          var result =  this.homeService.getTasks();
          this.myTaskList = result.data.taskList;
          let data = result['data'];      
          resolve({
            data: data['taskList']
          });
           
        });  
      }
    });
  }

}
