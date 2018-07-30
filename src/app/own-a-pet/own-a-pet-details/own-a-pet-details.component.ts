import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pet } from '../../shared/pet.model';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-own-a-pet-details',
  templateUrl: './own-a-pet-details.component.html',
  styleUrls: ['./own-a-pet-details.component.css']
})
export class OwnAPetDetailsComponent implements OnInit {

  petId: number;
  pet: Pet;
  showloadingImage: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private sharedService:SharedService
  ) { }

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

}
