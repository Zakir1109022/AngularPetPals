import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { AlliedService } from './aliend-service.service';
import { Pet } from '../shared/pet.model';
import { SearchService } from '../search/search.service';
import { Country } from '../search/country.model';
import { City } from '../search/city.model';
import { Area } from '../search/area.model';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-allied-service',
  templateUrl: './allied-service.component.html',
  styleUrls: ['./allied-service.component.css']
})
export class AlliedServiceComponent implements OnInit {

  alliedServiceList: Pet[] = [];
  loadedPetList: Pet[] = [];
  UserTypeList = [];
  countryList: Country[] = [];
  cityList: City[] = [];
  areaList: Area[] = [];
  selectedCityName = '';
  selectedCountryName = '';
  selectedAreaName = '';
  checkedAlliedPalsItems = [];

  showloadingImage: boolean = true;
  dataHasOrNot: boolean = false;
  showOrHideFilter = true;

  securityToken: string;
  pet: Pet;
  loginUserId: string;
  contactPetId:number;

  @ViewChild('searchInput') searchValue: ElementRef;

  currentPage: number = 1;
  scrollCallback;

  constructor(
    private alliedService: AlliedService,
    private searchService: SearchService,
    private sharedService:SharedService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {

    this.scrollCallback = this.getStories.bind(this);

    this.toastr.setRootViewContainerRef(vcr);
  }

  getStories() {
    var body = { "UserType": "Allied" };
    return this.sharedService.showServicesByPage(this.currentPage,body)
      .do(this.processData)
  }

  private processData = (results) => {
    this.currentPage++;
    this.alliedServiceList = this.alliedServiceList.concat(results);
    this.loadedPetList = this.alliedServiceList;
  }



  ngOnInit() {
    this.sharedService.searchPetList
      .subscribe((resultList: Pet[]) => {
        this.alliedServiceList = resultList;
        this.loadedPetList = this.alliedServiceList;
      })


      this.sharedService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })


      this.alliedService.showloadingImageSubject
      .subscribe((result:boolean)=>{
        this.showloadingImage=result;
      })


  }


  onFilterClick() {
    this.showOrHideFilter = !this.showOrHideFilter;
  }


  onDetailsClick(petId: number,petImage:string) {
    localStorage.setItem('petImage',petImage);
    this.router.navigate(['/allied-service-details/' + petId]);
  }


  onAlliedPalsClick() {
    this.searchService.getUserTypeList()
      .subscribe((UserTypeList) => {
        this.UserTypeList = UserTypeList;
      });
  }

  onAlliedChange(checkedValue: string, isCheked: boolean) {
    if (isCheked) {
      this.checkedAlliedPalsItems.push(checkedValue);
    }
    else {
      this.checkedAlliedPalsItems.splice(this.checkedAlliedPalsItems.indexOf(checkedValue), 1);
    }
  }


  onLocationClick() {
    this.searchService.getCountryList()
      .subscribe((countryList: Country[]) => {
        this.countryList = countryList;
      })
  }

  onCountryChange(selectedCountry: Country) {
    this.searchService.getCityList(selectedCountry)
      .subscribe((cityList: City[]) => {
        this.cityList = cityList;
      });

    this.selectedCountryName = selectedCountry.CountryName;
  }


  onCityChange(selectedCity: City) {
    this.searchService.getAreaList(selectedCity)
      .subscribe((areaList: Area[]) => {
        this.areaList = areaList;
      });

    this.selectedCityName = selectedCity.CityName;
  }

  onAreaChange(selectedArea: Area) {
    this.selectedAreaName = selectedArea.AreaName;
  }


  onAlliedPalsApply() {
    let searchItemList:Pet[] = [];
    this.showloadingImage=true;

    for (var i = 0; i < this.checkedAlliedPalsItems.length; i++) {
      this.alliedService.getPetByAlliedName(this.checkedAlliedPalsItems[i])
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);

          if (searchItemList.length == 0) {
           this.dataHasOrNot=true
          }
          else {
            this.dataHasOrNot=false
          }
        })
    }

    this.alliedServiceList = searchItemList;
  }


  onLocationApply() {
    let searchItemList:Pet[] = [];
    this.showloadingImage=true;

    if (this.selectedCountryName != '' && this.selectedCityName != '' && this.selectedAreaName != '') {
      this.alliedService.getPetByLocation(this.selectedCountryName, this.selectedCityName, this.selectedAreaName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);

          if (searchItemList.length == 0) {
            this.dataHasOrNot=true
           }
           else {
             this.dataHasOrNot=false
           }
        })

      this.selectedCountryName = '';
      this.selectedCityName = '';
      this.selectedAreaName = '';
    }


    if (this.selectedCityName != '' && this.selectedAreaName != '') {
      this.alliedService.getPetByCityAndArea(this.selectedCityName, this.selectedAreaName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);

          if (searchItemList.length == 0) {
            this.dataHasOrNot=true
           }
           else {
             this.dataHasOrNot=false
           }
        })

      this.selectedCityName = '';
      this.selectedAreaName = '';
    }



    if (this.selectedCountryName != '') {
      this.alliedService.getPetByCountry(this.selectedCountryName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);

          if (searchItemList.length == 0) {
            this.dataHasOrNot=true
           }
           else {
             this.dataHasOrNot=false
           }
        })

      this.selectedCountryName = '';
    }

    if (this.selectedCityName != '') {
      this.alliedService.getPetByCity(this.selectedCityName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);

          if (searchItemList.length == 0) {
            this.dataHasOrNot=true
           }
           else {
             this.dataHasOrNot=false
           }
        })

      this.selectedCityName = '';
    }

    if (this.selectedAreaName != '') {
      this.alliedService.getPetByArea(this.selectedAreaName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);

          if (searchItemList.length == 0) {
            this.dataHasOrNot=true
           }
           else {
             this.dataHasOrNot=false
           }
        })

      this.selectedAreaName = '';
    }


    this.alliedService.searchPetList.next(searchItemList);
    this.alliedServiceList = searchItemList;

  }



  assignCopy() {
    this.alliedServiceList = Object.assign([], this.loadedPetList);
  }

  onSearchKeyPress() {
    let value = this.searchValue.nativeElement.value;

    if (!value) this.assignCopy(); //when nothing has typed
    this.alliedServiceList = Object.assign([], this.loadedPetList).filter(
      item => item.AreaName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.CityName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.CountryName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.PetName.toLowerCase().indexOf(value.toLowerCase()) > -1
    )

    if(this.alliedServiceList.length ==0)
    {
      this.dataHasOrNot=true;
    }
    else{
      this.dataHasOrNot=false;
    }

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

          console.log(this.pet.PetId)
          var data = {
            "PetId": this.pet.PetId,
            "PetOwnerId": this.pet.PetOwnerId,
            "RequesterOwnerId": this.loginUserId,
            "RequesterPetId": ""
          }

           //set loader gif true
           this.showloadingImage=true;
          
          this.sharedService.Request(data, this.securityToken,'AlliedRequest',this.pet)
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
