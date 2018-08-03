import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

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
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
    ) {

    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {


  }


  onSignInClick() {
    this.showloadingImage = true;

    const userName = this.userNameValue.nativeElement.value;
    const password = this.passwordValue.nativeElement.value;

    this.authService.signIn(userName, password)
      .subscribe((result: any) => {

          if (result != null) {
            this.authService.saveUser(result, result.SecurityToken)
              .subscribe((result) => {
                console.log(result)
              });

            localStorage.setItem('token', result.SecurityToken);
            localStorage.setItem('emailId', result.EmailId);
            localStorage.setItem('RequesterOwnerId', result.UserId);

            this.router.navigate(['/contact-us']);
          }
          else {
            this.toastr.error('Invalid Credential', '');
            this.showloadingImage = false;
          }
      
      });

  }

  onSendForgotPassword() {
    const email = this.emailId.nativeElement.value;

    this.authService.forgotPassword(email)
      .subscribe((result) => {
        console.log(result);
      })
  }

}
