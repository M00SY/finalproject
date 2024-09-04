import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../Base/Environment';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  userToken : any ={token : localStorage.getItem("userToken")}

  constructor(private _HttpClient:HttpClient) { }


  reqOrderAPI(cID:string ,formData : any):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/orders/checkout-session/${cID}?url=http://localhost:4200` , 

      {shippingAddress : formData } ,
      

    )
  }
}
