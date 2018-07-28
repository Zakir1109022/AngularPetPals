import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { AlliedService } from './aliend-service.service';
import { Pet } from '../shared/pet.model';
import { SearchService } from '../search/search.service';
import { Country } from '../search/country.model';
import { City } from '../search/city.model';
import { Area } from '../search/area.model';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

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

  @ViewChild('searchInput') searchValue: ElementRef;

  currentPage: number = 1;
  scrollCallback;

  constructor(
    private alliedService: AlliedService,
    private searchService: SearchService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {

    this.scrollCallback = this.getStories.bind(this);

    this.toastr.setRootViewContainerRef(vcr);
  }

  getStories() {
    return this.alliedService.showAlliedServicesByPage(this.currentPage)
      .do(this.processData)
  }

  private processData = (results) => {
    this.currentPage++;
    this.alliedServiceList = this.alliedServiceList.concat(results);
    this.loadedPetList = this.alliedServiceList;
  }



  ngOnInit() {

    this.alliedService.searchPetList
      .subscribe((resultList: Pet[]) => {
        this.alliedServiceList = resultList;
        this.loadedPetList = this.alliedServiceList;
      })

    this.alliedService.showloadingImageSubject
      .subscribe((trueorfalse: boolean) => {
        this.showloadingImage = trueorfalse;
      })

  }


  onFilterClick() {
    this.showOrHideFilter = !this.showOrHideFilter;
  }


  onDetailsClick(petId: number) {
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
    const searchItemList = [];
    for (var i = 0; i < this.checkedAlliedPalsItems.length; i++) {
      this.alliedService.getPetByAlliedName(this.checkedAlliedPalsItems[i])
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);
        })
    }

    this.alliedServiceList = searchItemList;
    console.log(searchItemList);
  }


  onLocationApply() {
    const searchItemList = [];

    if (this.selectedCountryName != '' && this.selectedCityName != '' && this.selectedAreaName != '') {
      this.alliedService.getPetByLocation(this.selectedCountryName, this.selectedCityName, this.selectedAreaName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);
        })

      this.selectedCountryName = '';
      this.selectedCityName = '';
      this.selectedAreaName = '';
    }


    if (this.selectedCityName != '' && this.selectedAreaName != '') {
      this.alliedService.getPetByCityAndArea(this.selectedCityName, this.selectedAreaName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);
        })

      this.selectedCityName = '';
      this.selectedAreaName = '';
    }



    if (this.selectedCountryName != '') {
      this.alliedService.getPetByCountry(this.selectedCountryName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);
        })

      this.selectedCountryName = '';
    }

    if (this.selectedCityName != '') {
      this.alliedService.getPetByCity(this.selectedCityName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);
        })

      this.selectedCityName = '';
    }

    if (this.selectedAreaName != '') {
      this.alliedService.getPetByArea(this.selectedAreaName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);
        })

      this.selectedAreaName = '';
    }


    this.alliedService.searchPetList.next(searchItemList);

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

  }


  onRequestClick(petId: number) {
    this.securityToken = localStorage.getItem('token');
    if (this.securityToken != null) {
      this.alliedService.getAlliedPetByPetId(petId)
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
          
          this.alliedService.aliedServiceRequest(data, this.securityToken)
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
