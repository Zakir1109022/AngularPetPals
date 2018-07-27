import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pet } from '../../shared/pet.model';
import { AdoptionService } from '../adoption.service';

@Component({
  selector: 'app-adoption-details',
  templateUrl: './adoption-details.component.html',
  styleUrls: ['./adoption-details.component.css']
})
export class AdoptionDetailsComponent implements OnInit {

  petId: number;
  pet: Pet;
  showloadingImage: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private adoptionService: AdoptionService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.petId = params['id'];
      })

    this.adoptionService.getAdoptionsByPetId(this.petId)
      .subscribe((petResult: Pet[]) => {
        this.pet = petResult.find(p => p.PetId == this.petId);
        console.log(petResult);
      })

    //initially load loader
    this.adoptionService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })

  }

}
