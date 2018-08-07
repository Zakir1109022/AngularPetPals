import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Pet } from '../../shared/pet.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-allied-service-details',
  templateUrl: './allied-service-details.component.html',
  styleUrls: ['./allied-service-details.component.css']
})
export class AlliedServiceDetailsComponent implements OnInit {

  petId: number;
  pet: Pet;
  public petImage:string;
  showloadingImage: boolean = true;

  securityToken: string;
  loginUserId: string;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private toastr:ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) { 

    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.petId = params['id'];
      })

      this.petImage=localStorage.getItem('petImage');


    this.sharedService.getPetByPetId(this.petId)
      .subscribe((petResult: Pet[]) => {
        this.pet = petResult.find(p => p.PetId == this.petId);
        console.log(this.pet);
      })


    this.sharedService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })

  }

  
  onRequestClick(petId: number) {
    this.securityToken = localStorage.getItem('token');
    if (this.securityToken != null) {
      this.sharedService.getPetByPetId(petId)
        .subscribe((petResult: Pet[]) => {
          this.pet = petResult.find(p => p.PetId == petId);
          this.loginUserId = localStorage.getItem('RequesterOwnerId');

          var data = {
            "PetId": this.pet.PetId,
            "PetOwnerId": this.pet.PetOwnerId,
            "RequesterOwnerId": this.loginUserId,
            "RequesterPetId": ""
          }

           //set loader gif true
           this.showloadingImage=true;
          
          this.sharedService.Request(data, this.securityToken,'AlliedRequest')
            .subscribe((result: any) => {
              var status = result.Status;
              var errorMessage = result.ErrorMessage;
              if (status != 'Errored') {
                this.toastr.success(status, '');
              }
              else {
                this.toastr.warning(errorMessage, '');
              }

            });

        });
    }
    else {
      this.router.navigate(['/sign-in']);
    }

  }

}
