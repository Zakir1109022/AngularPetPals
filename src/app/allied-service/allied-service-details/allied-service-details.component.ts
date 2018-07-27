import { Component, OnInit } from '@angular/core';
import { Pet } from '../../shared/pet.model';
import { ActivatedRoute, Params } from '@angular/router';
import { AlliedService } from '../aliend-service.service';

@Component({
  selector: 'app-allied-service-details',
  templateUrl: './allied-service-details.component.html',
  styleUrls: ['./allied-service-details.component.css']
})
export class AlliedServiceDetailsComponent implements OnInit {

  petId: number;
  pet: Pet;
  showloadingImage: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private alliedService: AlliedService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.petId = params['id'];
      })

    this.alliedService.getAlliedPetByPetId(this.petId)
      .subscribe((petResult: Pet[]) => {
        this.pet = petResult.find(p => p.PetId == this.petId);
        console.log(petResult);
      })

    this.alliedService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })

  }

}
