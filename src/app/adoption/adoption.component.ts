import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Pet } from '../shared/pet.model';
import { AdoptionService } from './adoption.service';
import { Router } from '@angular/router';
import { OwnPetService } from '../own-a-pet/own-a-pet.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {

  adoptionList: Pet[] = [];
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
    private adoptionService: AdoptionService,
    private ownpetService: OwnPetService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {
    this.scrollCallback = this.getStories.bind(this);

    this.toastr.setRootViewContainerRef(vcr);
  }


  getStories() {
    return this.adoptionService.showAdoptionsbyPage(this.currentPage)
      .do(this.processData)
  }

  private processData = (results) => {
    this.currentPage++;
    this.adoptionList = this.adoptionList.concat(results);
    this.loadedPetList = this.adoptionList;

  }




  ngOnInit() {
    this.adoptionService.searchPetList
      .subscribe((adaptionList: Pet[]) => {
        this.adoptionList = adaptionList;
        this.loadedPetList = this.adoptionList;
      });

    //initially load loader
    this.adoptionService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })

    //after search load loader
    this.ownpetService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })


  }

  assignCopy() {
    this.adoptionList = Object.assign([], this.loadedPetList);
  }


  onSearchKeyPress() {
    let value = this.searchValue.nativeElement.value;
    if (!value) this.assignCopy(); //when nothing has typed
    this.adoptionList = Object.assign([], this.loadedPetList).filter(
      item => item.BreedName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.AreaName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.CityName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        // item.CountryName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.PetName.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  onDetailsClick(petId: number) {
    this.router.navigate(['/adoption-details/' + petId]);
  }


  onRequestClick(petId: number) {
    this.securityToken = localStorage.getItem('token');
    if (this.securityToken != null) {
      this.adoptionService.getAdoptionsByPetId(petId)
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
          

          this.adoptionService.adoptionRequest(data, this.securityToken)
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
