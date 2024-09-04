import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../Base/Environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  userHeader : any = {token : localStorage.getItem('userToken')}

  constructor(private _HttpClient:HttpClient) { }

  addToCartAPI(pId:string):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/cart`,{productId:pId} )
  }

  updateCartAPI(pId:string , count : number):Observable<any>
  {
    return this._HttpClient.put(`${Environment.baseURL}/api/v1/cart/${pId}`,{count:count})
  }

  getCartAPI():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseURL}/api/v1/cart`)
  }

  removeItemCartAPI(pId:string):Observable<any>
  {
    return this._HttpClient.delete(`${Environment.baseURL}/api/v1/cart/${pId}`)
  }

  clearCartAPI():Observable<any>
  {
    return this._HttpClient.delete(`${Environment.baseURL}/api/v1/cart`)
  }

  
}
