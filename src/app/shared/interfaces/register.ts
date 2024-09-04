
export interface login
{
  email : string ;
  password : string;
}

export interface Register extends login {
    name : string ;
  
  phone:string ;
  
  rePassword : string;
}
