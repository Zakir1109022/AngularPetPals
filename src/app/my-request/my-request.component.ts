
import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Pet } from '../shared/pet.model';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { SharedService } from '../shared/shared.service';
import { Requests } from './Requests.model';



@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.css']
})
export class MyRequestComponent implements OnInit {


  loadedRequestList: Requests[] = [];
  showloadingImage: boolean = true;
  dataHasOrNot: boolean = false;

  securityToken: string;
  loginUserId: string;
  withdrawRequestId:number;

  // @ViewChild('searchInput') searchValue: ElementRef;

  constructor(
    private sharedService: SharedService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {

    this.toastr.setRootViewContainerRef(vcr);

  }


  ngOnInit() {

    this.securityToken = localStorage.getItem('token')

    this.sharedService.getAllRequest(this.securityToken)
      .subscribe((result: Requests[]) => {
        this.loadedRequestList = result;
        console.log(this.loadedRequestList)

        if (this.loadedRequestList.length == 0) {
          this.dataHasOrNot = true;
          console.log(this.dataHasOrNot);
        }
      })

      this.sharedService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })

  }





  onDetailsClick(petId: number) {
    //this.router.navigate(['/own-a-pet-details/' + petId]);
  }

  onContactRequest(_withdrawRequestId:number){
    this.withdrawRequestId=_withdrawRequestId;
  }

  onWithdrawRequest() {
    console.log(this.withdrawRequestId)
    
    this.sharedService.WidrawRequest(this.withdrawRequestId, this.securityToken)
      .subscribe((result: any) => {
        let status = result.Status;
        if (status != "Errored") {
          this.toastr.success(result.Data, 'Success')

          this.sharedService.getAllRequest(this.securityToken)
            .subscribe((result: Requests[]) => {
              this.loadedRequestList = result;

              if (this.loadedRequestList.length == 0) {
                this.dataHasOrNot = true;
              }
            })

        }
        else {
          this.toastr.error(result.ErrorMessage, 'Error')
        }
      })
  }


}
