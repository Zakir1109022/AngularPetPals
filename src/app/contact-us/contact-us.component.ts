import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { ContactUsService } from './contact-us.service';
import { ToastsManager } from '../../../node_modules/ng2-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  @ViewChild('subject') subjectValue: ElementRef;
  @ViewChild('message') MessageValue: ElementRef;

  constructor(
    private contactUsService:ContactUsService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  onContactClick(){
    const securityToken = localStorage.getItem('token');
    const subject=this.subjectValue.nativeElement.value;
    const message=this.MessageValue.nativeElement.value;

    this.contactUsService.contactUs(subject,message,securityToken)
    .subscribe((result:any)=>{
      console.log(result)
      let status = result.Status;
      if (status != "Errored") {
        this.toastr.success(result.Data, 'Success')
     }
     else{
      this.toastr.error(result.ErrorMessage, 'Error')
     }
    })

  }

}
