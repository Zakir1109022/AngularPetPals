import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Pet } from '../../shared/pet.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { ToastsManager } from 'ng2-toastr';
import { FindPetLoveService } from '../find-pet-love.service';



@Component({
  selector: 'app-find-pet-love-details',
  templateUrl: './find-pet-love-details.component.html',
  styleUrls: ['./find-pet-love-details.component.css']
})
export class FindPetLoveDetailsComponent implements OnInit {

  petId: number;
  pet: Pet;
  showloadingImage: boolean = true;
  securityToken: string;
  loginUserId: string;


  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private findPetLoveService:FindPetLoveService,
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

    this.sharedService.getPetByPetId(this.petId)
      .subscribe((petResult: Pet[]) => {
        this.pet = petResult.find(p => p.PetId == this.petId);
        console.log(petResult);
      })


      //initially load loader
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
          this.pet = petResult[0];
          this.loginUserId = localStorage.getItem('RequesterOwnerId');

          let petOwner_petId: number;

          this.findPetLoveService.getFindPatLoveByPetOwnerId(this.pet.PetOwnerId)
            .subscribe((result) => {
              petOwner_petId = result.PetId;
            })

          var data = {
            "PetId": this.pet.PetId,
            "PetOwnerId": this.pet.PetOwnerId,
            "RequesterOwnerId": this.loginUserId,
            "RequesterPetId": petOwner_petId
          }

          //set loader gif true
          this.showloadingImage=true;
          
          this.sharedService.Request(data, this.securityToken,'RequestPetMatingRequest',this.pet)
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
