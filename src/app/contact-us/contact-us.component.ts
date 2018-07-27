import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ContactUsService } from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  @ViewChild('subject') subjectValue: ElementRef;
  @ViewChild('message') MessageValue: ElementRef;

  constructor(private contactUsService:ContactUsService) { }

  ngOnInit() {
  }

  onContactClick(){
    const securityToken = localStorage.getItem('token');
    const subject=this.subjectValue.nativeElement.value;
    const message=this.MessageValue.nativeElement.value;

    this.contactUsService.contactUs(subject,message,securityToken)
    .subscribe((result:any)=>{
      window.alert('Success');
      console.log(result);
    })

  }

}
