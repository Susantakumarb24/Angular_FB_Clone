import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import * as crypto from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private service: SharedService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  loginValidate() {
    this.loginForm.value.password = crypto
      .SHA256(this.loginForm.value.password)
      .toString();
    // this.service
    //     .get()
    //     .subscribe((data) => {
    //       console.log("all data from database")
    //       console.log(JSON.stringify(data));
    //     });
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // console.log(this.service.validateUser(this.loginForm.value));
      this.service.validateUser(this.loginForm.value).subscribe((data) => {
        console.log('all data from validation user');
        console.log(this.service.get());
        if (data) {
          console.log(this.loginForm.value)
          this.service.getUserData(this.loginForm.value).subscribe((udata) => {
            console.log("here");
            console.log(JSON.stringify(udata));
            this.service.userData=JSON.stringify(udata);
            this.router.navigate(['/homepage']);
          });
        } else alert('Incorrect Username or Password');
      });
    } else alert('Not Valid');
  }
}
