import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FindPetLoveService } from './find-pet-love.service';
import { Pet } from '../shared/pet.model';
import { OwnPetService } from '../own-a-pet/own-a-pet.service';

@Component({
  selector: 'app-find-pet-love',
  templateUrl: './find-pet-love.component.html',
  styleUrls: ['./find-pet-love.component.css'],
})
export class FindPetLoveComponent implements OnInit {

  findPetLoveList: Pet[] = [];
  loadedPetList: Pet[] = [];
  showloadingImage: boolean = true;
  dataHasOrNot: boolean = false;

  securityToken: string;
  pet: Pet;
  loginUserId: string;


  @ViewChild('searchInput') searchValue: ElementRef;

  currentPage: number = 1;
  scrollCallback;

  constructor(
    private findPetLoveService: FindPetLoveService,
    private router: Router
  ) {
    this.scrollCallback = this.getStories.bind(this);
  }

  getStories() {
    return this.findPetLoveService.showFindPatLoveByPage(this.currentPage)
      .do(this.processData)
  }

  private processData = (results) => {
    this.currentPage++;
    this.findPetLoveList = this.findPetLoveList.concat(results);
    this.loadedPetList = this.findPetLoveList;
  }



  ngOnInit() {
    this.findPetLoveService.searchPetList
      .subscribe((ownPetList: Pet[]) => {
        this.findPetLoveList = ownPetList;
        this.loadedPetList = this.findPetLoveList;
      })

    //initially load loader
    this.findPetLoveService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })

    //after search load loader
    this.findPetLoveService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })

  }

  assignCopy() {
    this.findPetLoveList = Object.assign([], this.loadedPetList);
  }


  onSearchKeyPress() {
    let value = this.searchValue.nativeElement.value;
    if (!value) this.assignCopy(); //when nothing has typed
    this.findPetLoveList = Object.assign([], this.loadedPetList).filter(
      item => item.BreedName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.AreaName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.CityName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
       // item.CountryName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.PetName.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  onDetailsClick(petId: number) {
    this.router.navigate(['/find-pet-love-details/' + petId]);
  }


  onRequestClick(petId: number) {
    this.securityToken = localStorage.getItem('token');
    if (this.securityToken != null) {
      this.findPetLoveService.getFindPatLoveByPetId(petId)
        .subscribe((petResult: Pet[]) => {
          this.pet = petResult.find(p => p.PetId == petId);
          this.loginUserId = localStorage.getItem('RequesterOwnerId');

        let  petOwner_petId:number;

          this.findPetLoveService.getFindPatLoveByPetOwnerId(this.pet.PetOwnerId)
          .subscribe((result)=>{
            petOwner_petId=result.PetId;
          })

          var data = {
            "PetId": this.pet.PetId,
            "PetOwnerId": this.pet.PetOwnerId,
            "RequesterOwnerId": this.loginUserId,
            "RequesterPetId": petOwner_petId
          }

          this.findPetLoveService.findPetLoveRequest(data, this.securityToken)
            .subscribe((result:any) => {
              var status=result.Status;
              var errorMessage=result.ErrorMessage;
              if(status !='Errored')
              {
                console.log(status)
              }
              else{
                console.log(errorMessage)
              }
             
            });

        });
    }
    else {
      this.router.navigate(['/sign-in']);
    }

  }

  onContactClick() {
    this.securityToken = localStorage.getItem('token');
    if (this.securityToken != null) {
      this.router.navigate(['/contact-us']);
    }
    else {
      this.router.navigate(['/sign-in']);
    }
  }
}
