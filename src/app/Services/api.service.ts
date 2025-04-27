import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { 
    this.getBaseUrl()
  }
  baseUrl:String = 'https://localhost:7205/api/v1';
  
  getBaseUrl():String{
   
    return this.baseUrl
  }
  
}
