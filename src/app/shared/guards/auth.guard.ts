import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {


  let _AuthService : AuthService  = inject(AuthService);

  let _Router : Router = inject(Router)

  if(typeof localStorage !== 'undefined')
  {
    if(localStorage.getItem('userToken') != null)
      {
    
        _AuthService.userInform()
        return true;
      }
      else
      {
        _Router.navigate(['login'])
        return false
      }
  }

  return false;

  


};
