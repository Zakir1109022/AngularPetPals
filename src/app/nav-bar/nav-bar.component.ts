import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  securityToken: string;
  emailId: string;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {

    this.sharedService.securityToken
      .subscribe((token: string) => {
        this.securityToken = token;
      })

      this.sharedService.emailId
      .subscribe((email: string) => {
        this.emailId = email;
      })

  }

  onSignOutClick() {
    localStorage.clear();
    this.securityToken = null;
    this.emailId=null;
  }

}