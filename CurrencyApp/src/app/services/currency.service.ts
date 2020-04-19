import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private _httpClient:HttpClient) { }

  // currencyApiUrl:'http://localhost:8765/currency-conversion-service/currency-converter-feign/from/USD/to/INR/quantity/1000'
  
  getCurrency(symb,qty):Observable<any>{
    console.log("Check ",'http://localhost:8765/currency-conversion-service/currency-converter-feign/from/'+symb+'/to/INR/quantity/'+qty);
    
    return this._httpClient.get<any>('http://localhost:8765/currency-conversion-service/currency-converter-feign/from/'+symb+'/to/INR/quantity/'+qty );
  }
}
