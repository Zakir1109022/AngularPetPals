import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showloadingImage: boolean = false;

  @ViewChild('userName') userNameValue: ElementRef;
  @ViewChild('password') passwordValue: ElementRef;
  @ViewChild('email') emailId: ElementRef;

  constructor
    (
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
    ) { }

  ngOnInit() {


  }


  onSignInClick() {
    this.showloadingImage = true;

    const userName = this.userNameValue.nativeElement.value;
    const password = this.passwordValue.nativeElement.value;

    this.authService.signIn(userName, password)
      .subscribe((result: any) => {
        if (result != null) {

          this.authService.saveUser(result,result.SecurityToken)
          .subscribe((result)=>{
            console.log(result)
          });

          localStorage.setItem('token', result.SecurityToken);
          localStorage.setItem('emailId', result.EmailId);
          localStorage.setItem('emailId', result.EmailId);
          localStorage.setItem('RequesterOwnerId', result.UserId);
          console.log(result)
          
          this.router.navigate(['/contact-us']);
        }
        else {
          window.alert('an error occured');
          this.showloadingImage = false;
        }

      });

  }

  onSendForgotPassword(){
    const email = this.emailId.nativeElement.value;
    
    this.authService.forgotPassword(email)
    .subscribe((result)=>{
      console.log(result);
    })
  }

}
