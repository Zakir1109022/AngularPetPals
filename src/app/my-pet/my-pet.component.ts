import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { MyPetService } from './MyPet.service';
import { MyPet } from './MyPet.model';



@Component({
  selector: 'app-my-pet',
  templateUrl: './my-pet.component.html',
  styleUrls: ['./my-pet.component.css']
})
export class MyPetComponent implements OnInit {


  loadedMyPetList: MyPet[] = [];
  showloadingImage: boolean = true;


  securityToken: string;
  loginUserId: string;
  withdrawRequestId: number;

  // @ViewChild('searchInput') searchValue: ElementRef;

  constructor(
    private myPetService: MyPetService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {

    this.toastr.setRootViewContainerRef(vcr);

  }


  ngOnInit() {
    this.securityToken = localStorage.getItem("token")
    console.log(this.securityToken);

    this.myPetService.mypetList(this.securityToken)
      .subscribe((result: any) => {
        let status = result.Status;
        if (status != "Errored") {
          this.loadedMyPetList = result.Data;
          console.log(this.loadedMyPetList);
        }
        else {
          this.toastr.error(result.ErrorMessage, 'Error')
        }

      })

    this.myPetService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })

  }





  onDetailsClick(petId: number) {
    this.router.navigate(['/my-pet-details/' + petId]);
  }

  onLoveClick(petId: number) {
    this.myPetService.makePetFavourite(this.securityToken, petId)
      .subscribe((result: any) => {
        let status = result.Status;
        if (status != "Errored") {
          this.toastr.success(result.Data, 'Success')
        }
        else{
          this.toastr.error(result.ErrorMessage, 'Error')
        }
      })
    }

        onDeleteClick(_DeletePetId: number){
          this.withdrawRequestId = _DeletePetId;
        }

        // onEditPetClick(petId:number){
        //   this.router.navigate(['/my-pet/' + petId]);
        // }


        onDeletePet() {
          console.log(this.withdrawRequestId)
          this.myPetService.deleteMypet(this.securityToken, this.withdrawRequestId)
            .subscribe((result: any) => {
              let status = result.Status;
              if (status != "Errored") {
                this.toastr.success(result.Data, 'Success')

                this.myPetService.mypetList(this.securityToken)
                  .subscribe((result: any) => {
                    let status = result.Status;
                    if (status != "Errored") {
                      this.loadedMyPetList = result.Data;
                    }
                    else {
                      this.toastr.error(result.ErrorMessage, 'Error')
                    }

                  })

              }
              else {
                this.toastr.error(result.ErrorMessage, 'Error')
              }
            })
        }


      }

