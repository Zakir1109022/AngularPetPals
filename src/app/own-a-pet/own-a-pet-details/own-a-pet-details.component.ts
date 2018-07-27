import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OwnPetService } from '../own-a-pet.service';
import { Pet } from '../../shared/pet.model';

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
    private ownPetService: OwnPetService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.petId = params['id'];
      })

    this.ownPetService.getOwnaPatByPetId(this.petId)
      .subscribe((petResult: Pet[]) => {
        this.pet = petResult.find(p => p.PetId == this.petId);
        
      })

    this.ownPetService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })
  }

}
