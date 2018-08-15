import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FindPetLoveService } from './find-pet-love.service';
import { Pet } from '../shared/pet.model';
import { ToastsManager } from 'ng2-toastr';
import { SharedService } from '../shared/shared.service';

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
  contactPetId:number;


  @ViewChild('searchInput') searchValue: ElementRef;

  currentPage: number = 1;
  scrollCallback;

  constructor(
    private findPetLoveService: FindPetLoveService,
    private sharedService:SharedService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {
    this.scrollCallback = this.getStories.bind(this);

    this.toastr.setRootViewContainerRef(vcr);
  }

  getStories() {
    var body = { "WillingToSell": 0 };
    return this.sharedService.showServicesByPage(this.currentPage,body)
      .do(this.processData)
  }

  private processData = (results) => {
    this.currentPage++;
    this.findPetLoveList = this.findPetLoveList.concat(results);
    this.loadedPetList = this.findPetLoveList;
  }



  ngOnInit() {
    this.sharedService.searchPetList
      .subscribe((ownPetList: Pet[]) => {
        this.findPetLoveList = ownPetList;
        this.loadedPetList = this.findPetLoveList;
      })



    this.sharedService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })


      this.sharedService.dataHasOrNotSubject
      .subscribe((trueorfalse: boolean) => {
        this.dataHasOrNot = trueorfalse;
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

    if(this.findPetLoveList.length ==0)
    {
      this.dataHasOrNot=true;
    }
    else{
      this.dataHasOrNot=false;
    }

  }

  onDetailsClick(petId: number) {
    this.router.navigate(['/find-pet-love-details/' + petId]);
  }

  onContactClick(petId:number){
    this.contactPetId=petId;
  }

  onRequestClick() {
    this.securityToken = localStorage.getItem('token');
    if (this.securityToken != null) {
      this.sharedService.getPetByPetId(this.contactPetId)
        .subscribe((petResult: Pet[]) => {
          this.pet = petResult[0];
          this.loginUserId = localStorage.getItem('RequesterOwnerId');

          let petOwner_petId: number;

          this.findPetLoveService.getFindPatLoveByPetOwnerId(this.pet.PetOwnerId)
            .subscribe((result) => {
              //get owner PetId
              petOwner_petId = result.PetId;
            });

            console.log(this.pet.PetId);

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
