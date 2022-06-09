// import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  otpForm: FormGroup;
  showModalBox: boolean = false;
  otp:any;
  otpError:any;
  value:any;

  constructor(private router:Router) { 
    this.otpForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      // Mobile: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  sendOtp()
  {
    if(this.otpForm.valid)
    {
      this.otp = Math.floor(1000 + Math.random() * 9000).toString();
      var res=confirm(this.otp);
      if(res){
        this.showModalBox = true;
      } else {
         this.showModalBox = false;
      }
    }
  }

  verifyOTP()
  {
    const input = document.getElementById('otpValue') as HTMLInputElement | null;
     this.value = input?.value;
    if(this.value==this.otp)
    this.router.navigate(['/resetPassword'])
    else
    {
      this.otpError = "<b>Incorrect OTP Entered</b>";
    }
    
  }

}
