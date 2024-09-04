import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink ,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isLoading : boolean = false

  errMessage : string = ''

  loginForm : FormGroup = new FormGroup({
    
    email : new FormControl(null ,  [Validators.required , Validators.email ] ),
    password : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][0-9]{6}/)]),
    
  } )

  constructor(private _AuthService:AuthService , private _Router:Router){}


   // submit el button
   loginSubmit()
   {

    this.isLoading = true

    this._AuthService.sendLogin(this.loginForm.value).subscribe({

      next : (res)=>{
      
        this.isLoading = false

        //1- token , app , refresh
        localStorage.setItem("userToken" , res.token);

        // 2- call method userInfom()
        this._AuthService.userInform()

        // 3- navigate
        this._Router.navigate(['home'])

      },
      error : (err)=>{
        this.errMessage = err.error.message
        this.isLoading = false
        
      }
    })

   }


}
