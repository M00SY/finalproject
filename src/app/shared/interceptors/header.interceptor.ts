import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if(typeof localStorage !== 'undefined')
  {
    if(localStorage.getItem('userToken') !== null)
    {
      let userToken : any = {token : localStorage.getItem("userToken")}

  req = req.clone({
    setHeaders  : userToken 
  })
    }

  }

  return next(req);


};
