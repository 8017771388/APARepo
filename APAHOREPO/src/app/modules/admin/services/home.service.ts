import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpService } from '../../_shared/services/http.services';
import { AppSettings } from '../../_shared/constants/api-constant';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpService : HttpService,private http : HttpClient) { }

  getData(){
    return this.httpService
     .get(AppSettings.hoUsers, '', AppSettings.apiKey)
     .pipe(map(response => response));
  }
}
