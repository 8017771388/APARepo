import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValuationService {

  constructor() { }

  valuationProfileData(){
    var mockData = {
      "status": "success",
      "statusMessage": "",
      "data": {
        "valProf": [{
            "id": 0,
            "buyerRepid": "DK5A",
            "sellerRepid": "N3VB",
            "buyer": "ODDY, ALDIS (DK5A)",
            "seller": "BOHLKEN, ARISTIDE (N3VB)",
            "valuationProfile" : 15,
            "currentStage":"Discovery",
            "openTasks": 2,
            "completedTasks": 7
          },
          {
            "id": 1,
            "buyerRepid": "DK5A",
            "sellerRepid": "N3VB",
            "buyer": "OEN, KANIYA (T2WA)",
            "seller": "KNOUS, NANCY (T2XA)",
            "valuationProfile" : 85,
            "currentStage": "Discovery",
            "openTasks": 2,
            "completedTasks": 7
          }
        ]
      }
    }

    return mockData;
  }


}
