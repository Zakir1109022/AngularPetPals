import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  securityToken: string;
  emailId: string;

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
    localStorage.clear();
 //   this.securityToken= localStorage.getItem('token');

  this.authService.tokenValue
  .subscribe((result:string)=>{
    this.securityToken=result;
  })

  this.authService.emailValue
  .subscribe((result:string)=>{
    this.emailId=result;
  })

  }

  onSignOutClick() {
    localStorage.clear();
    this.securityToken = null;
    this.emailId=null;

  }

}