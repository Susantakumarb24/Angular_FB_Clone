import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  @Input() name:string="";
  @Input() dob:string="";
  @Input() email:string="";
  @Input() image:string="";

  constructor(private service:SharedService) {
    console.log(this.service.userData)
   }

  ngOnInit(): void {
    let arrObj=JSON.parse(this.service.userData);
    console.log(arrObj);
    for(let i=0;i<arrObj.length;i++)
    {
        this.name=arrObj[i].FirstName+" "+arrObj[i].LastName;
        this.dob=arrObj[i].DOB;
        this.email=arrObj[i].Email;
        this.image="http://localhost:5000/Photos/"+arrObj[i].ProfilePicture;
    }
  }

}
