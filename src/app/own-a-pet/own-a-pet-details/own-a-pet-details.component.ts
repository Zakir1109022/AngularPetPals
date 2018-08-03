import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pet } from '../../shared/pet.model';
import { SharedService } from '../../shared/shared.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-own-a-pet-details',
  templateUrl: './own-a-pet-details.component.html',
  styleUrls: ['./own-a-pet-details.component.css']
})
export class OwnAPetDetailsComponent implements OnInit {

  petId: number;
  pet: Pet;
  showloadingImage: boolean = true;
  securityToken: string;
  loginUserId: string;


  constructor(
    private route: ActivatedRoute,
    private toastr:ToastsManager,
    vcr: ViewContainerRef,
    private sharedService:SharedService,
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
        console.log(petResult);
        this.pet = petResult[0];
        
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

          this.sharedService.Request(data, this.securityToken,'BuyPetRequest')
          .subscribe((result:any) => {
            var status=result.Status;
            var errorMessage=result.ErrorMessage;
            if(status !='Errored')
            {
              this.toastr.success(status, '');
            }
            else{
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
