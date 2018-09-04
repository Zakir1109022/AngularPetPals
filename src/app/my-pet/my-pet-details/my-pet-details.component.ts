import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pet } from '../../shared/pet.model';
import { SharedService } from '../../shared/shared.service';
import { ToastsManager } from 'ng2-toastr';
import { MyPetService } from '../MyPet.service';
import { MyPet } from '../MyPet.model';

@Component({
  selector: 'app-my-pet-details',
  templateUrl: './my-pet-details.component.html',
  styleUrls: ['./my-pet-details.component.css']
})
export class MyPetDetailsComponent implements OnInit {

  petId: number;
  pet: MyPet;
  showloadingImage: boolean = true;
  securityToken: string;
  loginUserId: string;


  constructor(
    private route: ActivatedRoute,
    private toastr:ToastsManager,
    vcr: ViewContainerRef,
    private myPetService:MyPetService,
    private router: Router
  ) {

    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.petId = params['id'];
      })

      const token = localStorage.getItem("token");
    this.myPetService.mypetByPetId(token,this.petId)
      .subscribe((petResult: any) => {
        console.log(petResult.Data[0])
        this.pet = petResult.Data[0];
        console.log(this.pet);
        
      })

    this.myPetService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })
  }

  onEditClick(petId:number){
    this.router.navigate(['/my-pet/' + petId]);
  }

}

