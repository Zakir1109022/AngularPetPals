import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  securityToken: string;
  emailId: string;

  constructor() { }

  ngOnInit() {


  }

  onSignOutClick() {
    localStorage.clear();
    this.securityToken = null;
    this.emailId=null;
  }

}