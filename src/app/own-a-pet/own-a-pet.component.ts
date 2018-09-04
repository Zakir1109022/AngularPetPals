import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { OwnPetService } from './own-a-pet.service';
import { Pet } from '../shared/pet.model';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { SharedService } from '../shared/shared.service';
import { SearchService } from '../search/search.service';


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
  contactPetId:number;

  @ViewChild('searchInput') searchValue: ElementRef;

  currentPage: number = 1;
  scrollCallback;
  constructor(
    private sharedService:SharedService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {
    this.scrollCallback = this.getStories.bind(this);

    this.toastr.setRootViewContainerRef(vcr);

  }
  getStories() {
    var body = { "WillingToSell": 1 };
    return this.sharedService.showServicesByPage(this.currentPage,body)
      .do(this.processData)
  }
  private processData = (results) => {
    this.currentPage++;
    this.ownPetList = this.ownPetList.concat(results);
    this.loadedPetList = this.ownPetList;
  }


  ngOnInit() {

    //filter dat
    this.sharedService.searchPetList
      .subscribe((ownPetList: Pet[]) => {
        this.ownPetList = ownPetList;
        this.loadedPetList = ownPetList;

      });


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
    this.ownPetList = Object.assign([], this.loadedPetList);
  }


  onSearchKeyPress() {
    let value = this.searchValue.nativeElement.value;
    if (!value) this.assignCopy(); //when nothing has typed
    this.ownPetList = Object.assign([], this.loadedPetList).filter(
      item => item.BreedName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.AreaName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.CityName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        // item.CountryName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.PetName.toLowerCase().indexOf(value.toLowerCase()) > -1
    )

    if(this.ownPetList.length ==0)
    {
      this.dataHasOrNot=true;
    }
    else{
      this.dataHasOrNot=false;
    }
  }

  onDetailsClick(petId: number) {
    this.router.navigate(['/own-a-pet-details/' + petId]);
  }

  onContactClick(petId:number){
    this.contactPetId=petId;
  }

  onRequestClick() {
    this.securityToken = localStorage.getItem('token');
    if (this.securityToken != null) {
      this.sharedService.getPetByPetId(this.contactPetId)
        .subscribe((petResult: Pet[]) => {
          this.pet = petResult.find(p => p.PetId == this.contactPetId);
          this.loginUserId = localStorage.getItem('RequesterOwnerId');

          var data = {
            "PetId": this.pet.PetId,
            "PetOwnerId": this.pet.PetOwnerId,
            "RequesterOwnerId": this.loginUserId,
            "RequesterPetId": ""
          }

          //set loader gif true
          this.showloadingImage=true;

          this.sharedService.Request(data, this.securityToken,'BuyPetRequest',this.pet)
          .subscribe((result:any) => {
            var status=result.Status;
            var errorMessage=result.ErrorMessage;
            if(status !='Errored')
            {
              this.toastr.success(status, '');
              this.router.navigate(['/my-request']);
            }
            else{
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
