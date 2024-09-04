import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../Base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }

  getAllProductsAPI():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseURL}/api/v1/products`)
  }

  getSpefProductAPI(pId:string|null):Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseURL}/api/v1/products/${pId}`)
  }


}
