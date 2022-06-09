import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Console } from 'console';
import { SharedService } from '../shared.service';
import * as crypto from "crypto-js";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  addr="http://localhost:4200/";
  PhotoUrl = "http://localhost:5000/Photos/";
  PhotoFilePath:any;
  PhotoFileName:any;
  registrationForm: FormGroup;
  

  constructor( private service:SharedService) {
    this.registrationForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      lastname: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      dob: new FormControl(''),
      email: new FormControl('', [Validators.required,Validators.email]),
      mobile: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[0-9]\d*$/)]),
      gender: new FormControl(''),
      password: new FormControl('',[Validators.required,Validators.maxLength(15)]),
      password2: new FormControl('',[Validators.required,Validators.maxLength(15)]),
      ProfilePicture: new FormControl('')
    });
    
   }

  ngOnInit(): void {
  }

  postData() {
    if (this.registrationForm.valid) {
       console.log(crypto.SHA256(this.registrationForm.value.password).toString());
      // console.log(this.registrationForm.value.ProfilePicture);
      this.registrationForm.value.password=crypto.SHA256(this.registrationForm.value.password).toString();
      console.log(this.registrationForm.value.password);
      this.service
        .post(
          this.registrationForm.value
        )
        .subscribe((data) => {
          console.log(data);
          alert('Registered');
          window.location.href=this.addr+"";
          // if(data)
          // {
          // alert('Registered');
          // window.location.href=this.addr+"";
          // }
          // else
          // alert("User Already Exists")
        });
    } else alert('Not Valid');
  }

  confirmPassword(){
    
    if(this.registrationForm.value.password!=this.registrationForm.value.password2)
    {
        alert("Password Did not match")
      this.registrationForm.setErrors({ 'invalid': true });
    }
   
  }

  uploadPhoto(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);
    console.log("uploadphoto method");
   
    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
      this.registrationForm.value.ProfilePicture=this.PhotoFileName;
      console.log(this.PhotoFileName);
      console.log(this.PhotoFilePath);
    })
  }

}
