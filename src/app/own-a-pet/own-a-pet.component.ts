import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OwnPetService } from './own-a-pet.service';
import { Pet } from '../shared/pet.model';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { User } from '../auth/user.model';


@Component({
  selector: 'app-own-a-pet',
  templateUrl: './own-a-pet.component.html',
  styleUrls: ['./own-a-pet.component.css']
})
export class OwnAPetComponent implements OnInit {



  ownPetList: Pet[] = [];
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
    private ownPetService: OwnPetService,
    private router: Router
  ) {
    this.scrollCallback = this.getStories.bind(this);

  }
  getStories() {
    return this.ownPetService.showOwnaPatByPage(this.currentPage)
      .do(this.processData)
  }
  private processData = (results) => {
    this.currentPage++;
    this.ownPetList = this.ownPetList.concat(results);
    this.loadedPetList = this.ownPetList;
  }


  ngOnInit() {
    this.ownPetService.searchPetList
      .subscribe((ownPetList: Pet[]) => {
        this.ownPetList = ownPetList;
        this.loadedPetList = ownPetList;
      });


    this.ownPetService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })

  }

  assignCopy() {
    this.ownPetList = Object.assign([], this.loadedPetList);
  }


  onSearchKeyPress() {
    let searchValue = this.searchValue.nativeElement.value;
    let value = this.searchValue.nativeElement.value;
    if (!value) this.assignCopy(); //when nothing has typed
    this.ownPetList = Object.assign([], this.loadedPetList).filter(
      item => item.BreedName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.AreaName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.CityName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        // item.CountryName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.PetName.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  onDetailsClick(petId: number) {
    this.router.navigate(['/own-a-pet-details/' + petId]);
  }


  onRequestClick(petId: number) {
    this.securityToken = localStorage.getItem('token');
    if (this.securityToken != null) {
      this.ownPetService.getOwnaPatByPetId(petId)
        .subscribe((petResult: Pet[]) => {
          this.pet = petResult.find(p => p.PetId == petId);
          this.loginUserId = localStorage.getItem('RequesterOwnerId');

          var data = {
            "PetId": this.pet.PetId,
            "PetOwnerId": this.pet.PetOwnerId,
            "RequesterOwnerId": this.loginUserId,
            "RequesterPetId": ""
          }

          this.ownPetService.OwnPetRequest(data, this.securityToken)
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
