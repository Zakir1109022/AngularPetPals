import { FindPetLoveService } from './../find-pet-love.service';
import { Component, OnInit } from '@angular/core';
import { Pet } from '../../shared/pet.model';
import { ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-find-pet-love-details',
  templateUrl: './find-pet-love-details.component.html',
  styleUrls: ['./find-pet-love-details.component.css']
})
export class FindPetLoveDetailsComponent implements OnInit {

  petId: number;
  pet: Pet;
  showloadingImage: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private findPetService: FindPetLoveService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.petId = params['id'];
      })

    this.findPetService.getFindPatLoveByPetId(this.petId)
      .subscribe((petResult: Pet[]) => {
        this.pet = petResult.find(p => p.PetId == this.petId);
        console.log(petResult);
      })


      //initially load loader
    this.findPetService.showloadingImageSubject
    .subscribe((trueorfalse: boolean) => {
      this.showloadingImage = trueorfalse;
    })

  }

}
