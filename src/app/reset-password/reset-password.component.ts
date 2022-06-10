import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import * as crypto from "crypto-js";
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  
  resetForm:FormGroup;
  constructor( private service:SharedService,private router:Router) {
    console.log(this.service.email)
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      email: new FormControl('')
    });
   }

  ngOnInit(): void {
  }


  resetPassword()
  {
     this.resetForm.value.email=this.service.email;
     this.resetForm.value.password=crypto.SHA256(this.resetForm.value.password).toString();
    console.log("restPassword")
    console.log(this.resetForm.value)
    this.service.changePassword(this.resetForm.value).subscribe((data) => {

      if(data){
        console.log(data)
        alert("Password Changed Successfully");
        this.router.navigate(['']);
      }
      else
      alert("Error")
      
    });
    
  }

}
