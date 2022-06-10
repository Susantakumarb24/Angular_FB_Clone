import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public email: string = '';
  public userData:any;

  readonly APIUrl="http://localhost:5000/api";
 
readonly PhotoUrl = "http://localhost:5000/Photos/";

  constructor(private http:HttpClient) { }


  validateUser(val:any){
    // console.log("from service");
    // console.log(this.http.post(this.APIUrl+'/User/LoginData',val))
    return this.http.post(this.APIUrl+'/User/LoginData',val);
  }


  getUserData(val2:any){
    // console.log("from service");
    // console.log(this.http.post(this.APIUrl+'/User/LoginData',val))
    return this.http.post(this.APIUrl+'/User/UserData',val2);
  }

  emailVerify(val:any){
    return this.http.post(this.APIUrl+'/User/EmailVerify',val);
  }
  
  get()
  {
    return this.http.get(this.APIUrl+'/User');
  }

  getTwo(val:any)
  {
    return this.http.get(this.APIUrl+'/User/GetOne',val);
  }

  changePassword(val:any){
    return this.http.post(this.APIUrl+'/User/RstPwd',val)

  }

  post(val:any)
  {
    return this.http.post(this.APIUrl+'/User',val);
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/User/SaveFile',val);
  }
}
