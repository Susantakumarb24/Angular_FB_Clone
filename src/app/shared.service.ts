import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl="http://localhost:5000/api";
 
readonly PhotoUrl = "http://localhost:5000/Photos/";

  constructor(private http:HttpClient) { }


  validateUser(val:any){
    // console.log("from service");
    // console.log(this.http.post(this.APIUrl+'/User/LoginData',val))
    return this.http.post(this.APIUrl+'/User/LoginData',val);
  }
  
  get()
  {
    return this.http.get(this.APIUrl+'/User');
  }

  post(val:any)
  {
    return this.http.post(this.APIUrl+'/User',val);
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/User/SaveFile',val);
  }
}
