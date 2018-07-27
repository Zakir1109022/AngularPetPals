import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Breed } from './breed.model';
import { SearchService } from './search.service';
import { Response } from '@angular/http';
import { Country } from './country.model';
import { City } from './city.model';
import { Area } from './area.model';
import { OwnPetService } from '../own-a-pet/own-a-pet.service';
import { Pet } from '../shared/pet.model';
import { ActivatedRoute, Params } from '@angular/router';
import { FindPetLoveService } from '../find-pet-love/find-pet-love.service';
import { AdoptionService } from '../adoption/adoption.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  breedList = [];
  countryList: Country[] = [];
  cityList: City[] = [];
  areaList: Area[] = [];
  petList = [];
  checkedPetTypeItems = [];
  checkedBreedItems = [];
  selectedGender = '';
  selectedCityName = '';
  selectedCountryName = '';
  selectedAreaName = '';
  selectedKCI = false;
  ComponentName = '';
  screenWidth: number;
  showOrHideFilter = true;

  @ViewChild('priceTo') priceToValue: ElementRef;
  @ViewChild('priceFrom') priceFromValue: ElementRef;

  showloadingImage: boolean = true;

  constructor(
    private searchService: SearchService,
    private ownPetService: OwnPetService,
    private findPetLoveService: FindPetLoveService,
    private adoptionService: AdoptionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //get component Name from url
    this.ComponentName = this.route.routeConfig.component.name;
  }


  onFilterClick() {
    this.showOrHideFilter = !this.showOrHideFilter;
  }


  onPetTypeClick() {
    this.searchService.getPetList()
      .subscribe((petList) => {
        this.petList = petList;
      })


  }

  onBreedClick() {
    this.searchService.getBreedList()
      .subscribe((breedList) => {
        this.breedList = breedList;
      });
  }

  onLocationClick() {
    this.searchService.getCountryList()
      .subscribe((countryList: Country[]) => {
        this.countryList = countryList;
      })
  }


  onPetTypeChange(checkedValue: string, isCheked: boolean) {
    if (isCheked) {
      this.checkedPetTypeItems.push(checkedValue);
    }
    else {
      this.checkedPetTypeItems.splice(this.checkedPetTypeItems.indexOf(checkedValue), 1);
    }

  }


  onBreedChange(checkedValue: string, isCheked: boolean) {
    if (isCheked) {
      this.checkedBreedItems.push(checkedValue);
    }
    else {
      this.checkedBreedItems.splice(this.checkedBreedItems.indexOf(checkedValue), 1);
    }
  }




  onGenderChange(gender: string) {
    this.selectedGender = gender;
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


  onKCIChange(isCheked: boolean) {
    this.selectedKCI = isCheked;
  }




  onPetTypeApply() {
    const searchItemList = [];
    for (var i = 0; i < this.checkedPetTypeItems.length; i++) {
      this.ownPetService.getPetByPetType(this.checkedPetTypeItems[i])
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);
        })
    }

    //call service
    if (this.ComponentName == "OwnAPetComponent") {
      this.ownPetService.searchPetList.next(searchItemList);

    }
    if (this.ComponentName == "FindPetLoveComponent") {
      this.findPetLoveService.searchPetList.next(searchItemList);

    }

    if (this.ComponentName == "AdoptionComponent") {
      this.adoptionService.searchPetList.next(searchItemList);

    }


  }


  onBreedApply() {
    const searchItemList = [];
    for (var i = 0; i < this.checkedBreedItems.length; i++) {
      this.ownPetService.getPetByBreedName(this.checkedBreedItems[i])
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);
        })
    }


    //call service
    if (this.ComponentName == "OwnAPetComponent") {
      this.ownPetService.searchPetList.next(searchItemList);

    }
    if (this.ComponentName == "FindPetLoveComponent") {
      this.findPetLoveService.searchPetList.next(searchItemList);

    }

    if (this.ComponentName == "AdoptionComponent") {
      this.adoptionService.searchPetList.next(searchItemList);

    }


  }



  onGenderApply() {
    let searchItemList = [];

    this.ownPetService.getPetByGender(this.selectedGender)
      .subscribe((resultList: Pet[]) => {
        searchItemList.push(...resultList);
      })



    //call service
    if (this.ComponentName == "OwnAPetComponent") {
      this.ownPetService.searchPetList.next(searchItemList);

    }
    if (this.ComponentName == "FindPetLoveComponent") {
      this.findPetLoveService.searchPetList.next(searchItemList);

    }

    if (this.ComponentName == "AdoptionComponent") {
      this.adoptionService.searchPetList.next(searchItemList);

    }

  }

  onLocationApply() {
    let searchItemList = [];

    if (this.selectedCountryName != '' && this.selectedCityName != '' && this.selectedAreaName != '') {
      this.searchService.getPetByLocation(this.selectedCountryName, this.selectedCityName, this.selectedAreaName, this.ComponentName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);
        })

      this.selectedCountryName = '';
      this.selectedCityName = '';
      this.selectedAreaName = '';
    }


    if (this.selectedCityName != '' && this.selectedAreaName != '') {
      this.searchService.getPetByCityAndArea(this.selectedCityName, this.selectedAreaName, this.ComponentName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);
        })

      this.selectedCityName = '';
      this.selectedAreaName = '';
    }


    if (this.selectedCountryName != '') {
      this.searchService.getPetByCountry(this.selectedCountryName, this.ComponentName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);
        })

      this.selectedCountryName = '';
    }

    if (this.selectedCityName != '') {
      this.searchService.getPetByCity(this.selectedCityName, this.ComponentName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);
        })

      this.selectedCityName = '';
    }

    if (this.selectedAreaName != '') {
      this.searchService.getPetByArea(this.selectedAreaName, this.ComponentName)
        .subscribe((resultList: Pet[]) => {
          searchItemList.push(...resultList);
        })

      this.selectedAreaName = '';
    }



    //call service
    if (this.ComponentName == "OwnAPetComponent") {
      this.ownPetService.searchPetList.next(searchItemList);

    }
    if (this.ComponentName == "FindPetLoveComponent") {
      this.findPetLoveService.searchPetList.next(searchItemList);
    }

    if (this.ComponentName == "AdoptionComponent") {
      this.adoptionService.searchPetList.next(searchItemList);

    }
  }

  onGeneralApply() {
    let searchItemList = [];
    this.ownPetService.getPetByGeneral(this.selectedKCI)
      .subscribe((resultList: Pet[]) => {
        searchItemList.push(...resultList);
      })



    //call service
    if (this.ComponentName == "OwnAPetComponent") {
      this.ownPetService.searchPetList.next(searchItemList);

    }
    if (this.ComponentName == "FindPetLoveComponent") {
      this.findPetLoveService.searchPetList.next(searchItemList);

    }

    if (this.ComponentName == "AdoptionComponent") {
      this.adoptionService.searchPetList.next(searchItemList);

    }

  }


  onPriceApply() {
    const priceFrom = this.priceFromValue.nativeElement.value;
    const priceTo = this.priceToValue.nativeElement.value;
    let searchItemList = [];

    this.ownPetService.getPetByPrice(priceFrom, priceTo)
      .subscribe((resultList: Pet[]) => {
        searchItemList.push(...resultList);
      })



    //call service
    if (this.ComponentName == "OwnAPetComponent") {
      this.ownPetService.searchPetList.next(searchItemList);

    }
    if (this.ComponentName == "FindPetLoveComponent") {
      this.findPetLoveService.searchPetList.next(searchItemList);

    }

    if (this.ComponentName == "AdoptionComponent") {
      this.adoptionService.searchPetList.next(searchItemList);

    }
  }

}
