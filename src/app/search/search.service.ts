import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable, Subject } from 'rxjs'
import { Country } from "./country.model";
import { City } from "./city.model";
import { Area } from "./area.model";
import { Pet } from "../shared/pet.model";

@Injectable()
export class SearchService {

    private baseUrl="http://staging.mypetfriends.in/api/";


    showloadingImageSubject = new Subject<boolean>();
    dataHasOrNotSubject = new Subject<boolean>();

    constructor(private http: Http) { }


    getPetList() {
        return this.http.get(this.baseUrl+'Utils/GetAllPetTypes')
            .map((response: Response) => {
                const petList = response.json().Data;
                return petList;
            })
            .catch((error: Response) => Observable.throw(error));
    }

    getBreedList() {
        return this.http.get(this.baseUrl+'Utils/GetBreedListByString')
            .map((response: Response) => {
                const breedList = response.json().Data;
                return breedList;
            })
            .catch((error: Response) => Observable.throw(error));
    }

    getUserTypeList() {
        return this.http.get(this.baseUrl+'Utils/GetAllUserTypes')
            .map((response: Response) => {
                const UserTypeList = response.json().Data;
                return UserTypeList;
            })
            .catch((error: Response) => Observable.throw(error));
    }

    getCountryList() {
        return this.http.get(this.baseUrl+'Utils/GetAllCountryList')
            .map((response: Response) => {
                const countryList = response.json().Data;
                let transfercountryList: Country[] = [];
                for (let country of countryList) {
                    transfercountryList.push(new Country(
                        country.CountryId,
                        country.CountryName
                    ));
                }
                return transfercountryList;
            })
            .catch((error: Response) => Observable.throw(error));
    }

    getCityList(country: Country) {
        return this.http.get(this.baseUrl+'Utils/GetCityListByCountry?countryid=' + country.CountryId)
            .map((response: Response) => {
                const cityList = response.json().Data;
                let transferCityList: City[] = [];
                for (let city of cityList) {
                    transferCityList.push(new City(
                        city.CityId,
                        city.CityName
                    ));
                }
                return transferCityList;
            })
            .catch((error: Response) => Observable.throw(error));
    }


    getAreaList(city: City) {
        return this.http.get(this.baseUrl+'Utils/GetAreaListByCity?cityid=' + city.CityId)
            .map((response: Response) => {
                const areaList = response.json().Data;
                let transferAreaList: Area[] = [];
                for (let area of areaList) {
                    transferAreaList.push(new Area(
                        area.Areaid,
                        area.AreaName
                    ));
                }
                return transferAreaList;
            })
            .catch((error: Response) => Observable.throw(error));
    }





    getPetByLocation(country: string, city: string, area: string, componentName: string) {
        var body = {};
        if (componentName == "OwnAPetComponent") {
            body = { "WillingToSell": 1, "AreaName": area, "CityName": city, "CountryName": country }
        }
        if (componentName == "FindPetLoveComponent") {
            body = { "WillingToSell": 0, "AreaName": area, "CityName": city, "CountryName": country }
        }

        if (componentName == "AdoptionComponent") {
            body = { "AvilableForAdotpion": 1, "AreaName": area, "CityName": city, "CountryName": country }
        }


        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl+'Utils/SearchPets?token=' + token, body, { headers: headers })
            .map((response: Response) => {
                const petList = response.json().Data;
                let transferPetList: Pet[] = [];
                for (let pet of petList) {
                    transferPetList.push(new Pet(
                        pet.AcceptedCount,
                        pet.AreaId,
                        pet.AreaName,
                        pet.AvilableForAdotpion,
                        pet.BreedId,
                        pet.BreedName,
                        pet.CityId,
                        pet.CityName,
                        pet.CountryId,
                        pet.Colors,
                        pet.CountryName,
                        pet.Description,
                        pet.Dummy,
                        pet.ExerciseNeeds,
                        pet.GoodWithDogs,
                        pet.GroomingNeeds,
                        pet.HeatingCycleFrom,
                        pet.HeatingCycleTo,
                        pet.Height,
                        pet.IsFavorite,
                        pet.KCIDetails,
                        pet.KCIRegistered,
                        pet.LastApprovedDate,
                        pet.LastRequstedDate,
                        pet.Latitude,
                        pet.Longitude,
                        pet.OfferPriceFrom,
                        pet.OfferPriceTo,
                        pet.PetDob,
                        pet.PetGender,
                        pet.PetId,
                        pet.PetName,
                        pet.PetOwnerId,
                        pet.PetType,
                        pet.PictrueName,
                        pet.RequestedCount,
                        pet.UserType,
                        pet.WatchdogAbility,
                        pet.Wight,
                        pet.WillingToSell,
                        pet.searchText
                    ));
                }

                this.showloadingImageSubject.next(false);
                
                return transferPetList;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }


    getPetByCountry(country: string, componentName: string) {
        var body = {};
        if (componentName == "OwnAPetComponent") {
            body = { "WillingToSell": 1, "CountryName": country }
        }
        if (componentName == "FindPetLoveComponent") {
            body = { "WillingToSell": 0, "CountryName": country }
        }

        if (componentName == "AdoptionComponent") {
            body = { "AvilableForAdotpion": 1, "CountryName": country }
        }

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl+'Utils/SearchPets?token=' + token, body, { headers: headers })
            .map((response: Response) => {
                const petList = response.json().Data;
                let transferPetList: Pet[] = [];
                for (let pet of petList) {
                    transferPetList.push(new Pet(
                        pet.AcceptedCount,
                        pet.AreaId,
                        pet.AreaName,
                        pet.AvilableForAdotpion,
                        pet.BreedId,
                        pet.BreedName,
                        pet.CityId,
                        pet.CityName,
                        pet.CountryId,
                        pet.Colors,
                        pet.CountryName,
                        pet.Description,
                        pet.Dummy,
                        pet.ExerciseNeeds,
                        pet.GoodWithDogs,
                        pet.GroomingNeeds,
                        pet.HeatingCycleFrom,
                        pet.HeatingCycleTo,
                        pet.Height,
                        pet.IsFavorite,
                        pet.KCIDetails,
                        pet.KCIRegistered,
                        pet.LastApprovedDate,
                        pet.LastRequstedDate,
                        pet.Latitude,
                        pet.Longitude,
                        pet.OfferPriceFrom,
                        pet.OfferPriceTo,
                        pet.PetDob,
                        pet.PetGender,
                        pet.PetId,
                        pet.PetName,
                        pet.PetOwnerId,
                        pet.PetType,
                        pet.PictrueName,
                        pet.RequestedCount,
                        pet.UserType,
                        pet.WatchdogAbility,
                        pet.Wight,
                        pet.WillingToSell,
                        pet.searchText
                    ));
                }

                this.showloadingImageSubject.next(false);
               
                return transferPetList;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }


    getPetByCity(city: string, componentName: string) {
        var body = {};
        if (componentName == "OwnAPetComponent") {
            body = { "WillingToSell": 1, "CityName": city }
        }
        if (componentName == "FindPetLoveComponent") {
            body = { "WillingToSell": 0, "CityName": city }
        }

        if (componentName == "AdoptionComponent") {
            body = { "AvilableForAdotpion": 1, "CityName": city }
        }

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl+'Utils/SearchPets?token=' + token, body, { headers: headers })
            .map((response: Response) => {
                const petList = response.json().Data;
                let transferPetList: Pet[] = [];
                for (let pet of petList) {
                    transferPetList.push(new Pet(
                        pet.AcceptedCount,
                        pet.AreaId,
                        pet.AreaName,
                        pet.AvilableForAdotpion,
                        pet.BreedId,
                        pet.BreedName,
                        pet.CityId,
                        pet.CityName,
                        pet.CountryId,
                        pet.Colors,
                        pet.CountryName,
                        pet.Description,
                        pet.Dummy,
                        pet.ExerciseNeeds,
                        pet.GoodWithDogs,
                        pet.GroomingNeeds,
                        pet.HeatingCycleFrom,
                        pet.HeatingCycleTo,
                        pet.Height,
                        pet.IsFavorite,
                        pet.KCIDetails,
                        pet.KCIRegistered,
                        pet.LastApprovedDate,
                        pet.LastRequstedDate,
                        pet.Latitude,
                        pet.Longitude,
                        pet.OfferPriceFrom,
                        pet.OfferPriceTo,
                        pet.PetDob,
                        pet.PetGender,
                        pet.PetId,
                        pet.PetName,
                        pet.PetOwnerId,
                        pet.PetType,
                        pet.PictrueName,
                        pet.RequestedCount,
                        pet.UserType,
                        pet.WatchdogAbility,
                        pet.Wight,
                        pet.WillingToSell,
                        pet.searchText
                    ));
                }

                this.showloadingImageSubject.next(false);
                

                return transferPetList;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }


    getPetByArea(area: string, componentName: string) {
        var body = {};
        if (componentName == "OwnAPetComponent") {
            body = { "WillingToSell": 1, "AreaName": area }
        }
        if (componentName == "FindPetLoveComponent") {
            body = { "WillingToSell": 0, "AreaName": area }
        }

        if (componentName == "AdoptionComponent") {
            body = { "AvilableForAdotpion": 1, "AreaName": area }
        }

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl+'Utils/SearchPets?token=' + token, body, { headers: headers })
            .map((response: Response) => {
                const petList = response.json().Data;
                let transferPetList: Pet[] = [];
                for (let pet of petList) {
                    transferPetList.push(new Pet(
                        pet.AcceptedCount,
                        pet.AreaId,
                        pet.AreaName,
                        pet.AvilableForAdotpion,
                        pet.BreedId,
                        pet.BreedName,
                        pet.CityId,
                        pet.CityName,
                        pet.CountryId,
                        pet.Colors,
                        pet.CountryName,
                        pet.Description,
                        pet.Dummy,
                        pet.ExerciseNeeds,
                        pet.GoodWithDogs,
                        pet.GroomingNeeds,
                        pet.HeatingCycleFrom,
                        pet.HeatingCycleTo,
                        pet.Height,
                        pet.IsFavorite,
                        pet.KCIDetails,
                        pet.KCIRegistered,
                        pet.LastApprovedDate,
                        pet.LastRequstedDate,
                        pet.Latitude,
                        pet.Longitude,
                        pet.OfferPriceFrom,
                        pet.OfferPriceTo,
                        pet.PetDob,
                        pet.PetGender,
                        pet.PetId,
                        pet.PetName,
                        pet.PetOwnerId,
                        pet.PetType,
                        pet.PictrueName,
                        pet.RequestedCount,
                        pet.UserType,
                        pet.WatchdogAbility,
                        pet.Wight,
                        pet.WillingToSell,
                        pet.searchText
                    ));
                }

                this.showloadingImageSubject.next(false);
               

                return transferPetList;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }


    getPetByCityAndArea(city: string, area: string, componentName: string) {
        var body = {};
        if (componentName == "OwnAPetComponent") {
            body = { "WillingToSell": 1, "AreaName": area, "CityName": city }
        }
        if (componentName == "FindPetLoveComponent") {
            body = { "WillingToSell": 0, "AreaName": area, "CityName": city }
        }

        if (componentName == "AdoptionComponent") {
            body = { "AvilableForAdotpion": 1, "AreaName": area, "CityName": city }
        }

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl+'Utils/SearchPets?token=' + token, body, { headers: headers })
            .map((response: Response) => {
                const petList = response.json().Data;
                let transferPetList: Pet[] = [];
                for (let pet of petList) {
                    transferPetList.push(new Pet(
                        pet.AcceptedCount,
                        pet.AreaId,
                        pet.AreaName,
                        pet.AvilableForAdotpion,
                        pet.BreedId,
                        pet.BreedName,
                        pet.CityId,
                        pet.CityName,
                        pet.CountryId,
                        pet.Colors,
                        pet.CountryName,
                        pet.Description,
                        pet.Dummy,
                        pet.ExerciseNeeds,
                        pet.GoodWithDogs,
                        pet.GroomingNeeds,
                        pet.HeatingCycleFrom,
                        pet.HeatingCycleTo,
                        pet.Height,
                        pet.IsFavorite,
                        pet.KCIDetails,
                        pet.KCIRegistered,
                        pet.LastApprovedDate,
                        pet.LastRequstedDate,
                        pet.Latitude,
                        pet.Longitude,
                        pet.OfferPriceFrom,
                        pet.OfferPriceTo,
                        pet.PetDob,
                        pet.PetGender,
                        pet.PetId,
                        pet.PetName,
                        pet.PetOwnerId,
                        pet.PetType,
                        pet.PictrueName,
                        pet.RequestedCount,
                        pet.UserType,
                        pet.WatchdogAbility,
                        pet.Wight,
                        pet.WillingToSell,
                        pet.searchText
                    ));
                }

                this.showloadingImageSubject.next(false);
            
                
                return transferPetList;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }





    getOwnaPatByPetId(petId: number,componentName:string) {
        var body = {};
        if (componentName == "OwnAPetComponent") {
            body = { "WillingToSell": 1, "PetId": petId }
        }
        if (componentName == "FindPetLoveComponent") {
            body = { "WillingToSell": 0, "PetId": petId }
        }

        if (componentName == "AdoptionComponent") {
            body = { "AvilableForAdotpion": 1,"PetId": petId }
        }
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl+'Utils/SearchPets?token=' + token, body, { headers: headers })
            .map((response: Response) => {
                const petList = response.json().Data;
                let transferPetList: Pet[] = [];
                for (let pet of petList) {
                    transferPetList.push(new Pet(
                        pet.AcceptedCount,
                        pet.AreaId,
                        pet.AreaName,
                        pet.AvilableForAdotpion,
                        pet.BreedId,
                        pet.BreedName,
                        pet.CityId,
                        pet.CityName,
                        pet.CountryId,
                        pet.Colors,
                        pet.CountryName,
                        pet.Description,
                        pet.Dummy,
                        pet.ExerciseNeeds,
                        pet.GoodWithDogs,
                        pet.GroomingNeeds,
                        pet.HeatingCycleFrom,
                        pet.HeatingCycleTo,
                        pet.Height,
                        pet.IsFavorite,
                        pet.KCIDetails,
                        pet.KCIRegistered,
                        pet.LastApprovedDate,
                        pet.LastRequstedDate,
                        pet.Latitude,
                        pet.Longitude,
                        pet.OfferPriceFrom,
                        pet.OfferPriceTo,
                        pet.PetDob,
                        pet.PetGender,
                        pet.PetId,
                        pet.PetName,
                        pet.PetOwnerId,
                        pet.PetType,
                        pet.PictrueName,
                        pet.RequestedCount,
                        pet.UserType,
                        pet.WatchdogAbility,
                        pet.Wight,
                        pet.WillingToSell,
                        pet.searchText
                    ));
                }
                this.showloadingImageSubject.next(false);
                return transferPetList;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }



    getPetByPetType(petType: string,componentName:string) {
        var body = {};
        if (componentName == "OwnAPetComponent") {
            body = { "WillingToSell": 1, "PetType": petType}
        }
        if (componentName == "FindPetLoveComponent") {
            body = { "WillingToSell": 0, "PetType": petType }
        }

        if (componentName == "AdoptionComponent") {
            body = { "AvilableForAdotpion": 1,"PetType": petType}
        }

        this.dataHasOrNotSubject.next(false);
        this.showloadingImageSubject.next(true);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl+'Utils/SearchPets?token=' + token, body, { headers: headers })
            .map((response: Response) => {
                const petList = response.json().Data;
                let transferPetList: Pet[] = [];
                for (let pet of petList) {
                    transferPetList.push(new Pet(
                        pet.AcceptedCount,
                        pet.AreaId,
                        pet.AreaName,
                        pet.AvilableForAdotpion,
                        pet.BreedId,
                        pet.BreedName,
                        pet.CityId,
                        pet.CityName,
                        pet.CountryId,
                        pet.Colors,
                        pet.CountryName,
                        pet.Description,
                        pet.Dummy,
                        pet.ExerciseNeeds,
                        pet.GoodWithDogs,
                        pet.GroomingNeeds,
                        pet.HeatingCycleFrom,
                        pet.HeatingCycleTo,
                        pet.Height,
                        pet.IsFavorite,
                        pet.KCIDetails,
                        pet.KCIRegistered,
                        pet.LastApprovedDate,
                        pet.LastRequstedDate,
                        pet.Latitude,
                        pet.Longitude,
                        pet.OfferPriceFrom,
                        pet.OfferPriceTo,
                        pet.PetDob,
                        pet.PetGender,
                        pet.PetId,
                        pet.PetName,
                        pet.PetOwnerId,
                        pet.PetType,
                        pet.PictrueName,
                        pet.RequestedCount,
                        pet.UserType,
                        pet.WatchdogAbility,
                        pet.Wight,
                        pet.WillingToSell,
                        pet.searchText
                    ));
                }

                this.showloadingImageSubject.next(false);
               
                return transferPetList;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }


    getPetByBreedName(breedName: string,componentName:string) {
        var body = {};
        if (componentName == "OwnAPetComponent") {
            body = { "WillingToSell": 1, "BreedName": breedName}
        }
        if (componentName == "FindPetLoveComponent") {
            body = { "WillingToSell": 0, "BreedName": breedName}
        }

        if (componentName == "AdoptionComponent") {
            body = { "AvilableForAdotpion": 1,"BreedName": breedName}
        }

        this.dataHasOrNotSubject.next(false);
        this.showloadingImageSubject.next(true);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl+'Utils/SearchPets?token=' + token, body, { headers: headers })
            .map((response: Response) => {
                const petList = response.json().Data;
                let transferPetList: Pet[] = [];
                for (let pet of petList) {
                    transferPetList.push(new Pet(
                        pet.AcceptedCount,
                        pet.AreaId,
                        pet.AreaName,
                        pet.AvilableForAdotpion,
                        pet.BreedId,
                        pet.BreedName,
                        pet.CityId,
                        pet.CityName,
                        pet.CountryId,
                        pet.Colors,
                        pet.CountryName,
                        pet.Description,
                        pet.Dummy,
                        pet.ExerciseNeeds,
                        pet.GoodWithDogs,
                        pet.GroomingNeeds,
                        pet.HeatingCycleFrom,
                        pet.HeatingCycleTo,
                        pet.Height,
                        pet.IsFavorite,
                        pet.KCIDetails,
                        pet.KCIRegistered,
                        pet.LastApprovedDate,
                        pet.LastRequstedDate,
                        pet.Latitude,
                        pet.Longitude,
                        pet.OfferPriceFrom,
                        pet.OfferPriceTo,
                        pet.PetDob,
                        pet.PetGender,
                        pet.PetId,
                        pet.PetName,
                        pet.PetOwnerId,
                        pet.PetType,
                        pet.PictrueName,
                        pet.RequestedCount,
                        pet.UserType,
                        pet.WatchdogAbility,
                        pet.Wight,
                        pet.WillingToSell,
                        pet.searchText
                    ));
                }
                this.showloadingImageSubject.next(false);
               
                return transferPetList;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }

    getPetByGender(gender: string,componentName:string) {
        var body = {};
        if (componentName == "OwnAPetComponent") {
            body = { "WillingToSell": 1, "PetGender": gender}
        }
        if (componentName == "FindPetLoveComponent") {
            body = { "WillingToSell": 0, "PetGender": gender}
        }

        if (componentName == "AdoptionComponent") {
            body = { "AvilableForAdotpion": 1,"PetGender": gender}
        }

        this.dataHasOrNotSubject.next(false);
        this.showloadingImageSubject.next(true);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl+'Utils/SearchPets?token=' + token, body, { headers: headers })
            .map((response: Response) => {
                const petList = response.json().Data;
                let transferPetList: Pet[] = [];
                for (let pet of petList) {
                    transferPetList.push(new Pet(
                        pet.AcceptedCount,
                        pet.AreaId,
                        pet.AreaName,
                        pet.AvilableForAdotpion,
                        pet.BreedId,
                        pet.BreedName,
                        pet.CityId,
                        pet.CityName,
                        pet.CountryId,
                        pet.Colors,
                        pet.CountryName,
                        pet.Description,
                        pet.Dummy,
                        pet.ExerciseNeeds,
                        pet.GoodWithDogs,
                        pet.GroomingNeeds,
                        pet.HeatingCycleFrom,
                        pet.HeatingCycleTo,
                        pet.Height,
                        pet.IsFavorite,
                        pet.KCIDetails,
                        pet.KCIRegistered,
                        pet.LastApprovedDate,
                        pet.LastRequstedDate,
                        pet.Latitude,
                        pet.Longitude,
                        pet.OfferPriceFrom,
                        pet.OfferPriceTo,
                        pet.PetDob,
                        pet.PetGender,
                        pet.PetId,
                        pet.PetName,
                        pet.PetOwnerId,
                        pet.PetType,
                        pet.PictrueName,
                        pet.RequestedCount,
                        pet.UserType,
                        pet.WatchdogAbility,
                        pet.Wight,
                        pet.WillingToSell,
                        pet.searchText
                    ));
                }
                this.showloadingImageSubject.next(false);
                
                return transferPetList;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }



    getPetByGeneral(KCI: boolean,componentName:string) {
        var body = {};
        if (componentName == "OwnAPetComponent") {
            body = { "WillingToSell": 1, "KCIRegistered ": KCI }
        }
        if (componentName == "FindPetLoveComponent") {
            body = { "WillingToSell": 0, "KCIRegistered ": KCI }
        }

        if (componentName == "AdoptionComponent") {
            body = { "AvilableForAdotpion": 1,"KCIRegistered ": KCI }
        }

        this.dataHasOrNotSubject.next(false);
        this.showloadingImageSubject.next(true);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl+'Utils/SearchPets?token=' + token, body, { headers: headers })
            .map((response: Response) => {
                const petList = response.json().Data;
                let transferPetList: Pet[] = [];
                for (let pet of petList) {
                    transferPetList.push(new Pet(
                        pet.AcceptedCount,
                        pet.AreaId,
                        pet.AreaName,
                        pet.AvilableForAdotpion,
                        pet.BreedId,
                        pet.BreedName,
                        pet.CityId,
                        pet.CityName,
                        pet.CountryId,
                        pet.Colors,
                        pet.CountryName,
                        pet.Description,
                        pet.Dummy,
                        pet.ExerciseNeeds,
                        pet.GoodWithDogs,
                        pet.GroomingNeeds,
                        pet.HeatingCycleFrom,
                        pet.HeatingCycleTo,
                        pet.Height,
                        pet.IsFavorite,
                        pet.KCIDetails,
                        pet.KCIRegistered,
                        pet.LastApprovedDate,
                        pet.LastRequstedDate,
                        pet.Latitude,
                        pet.Longitude,
                        pet.OfferPriceFrom,
                        pet.OfferPriceTo,
                        pet.PetDob,
                        pet.PetGender,
                        pet.PetId,
                        pet.PetName,
                        pet.PetOwnerId,
                        pet.PetType,
                        pet.PictrueName,
                        pet.RequestedCount,
                        pet.UserType,
                        pet.WatchdogAbility,
                        pet.Wight,
                        pet.WillingToSell,
                        pet.searchText
                    ));
                }
                this.showloadingImageSubject.next(false);
               
                return transferPetList;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }


    getPetByPrice(priceFrom: number, priceTo: number,componentName:string) {
        var body = {};
        if (componentName == "OwnAPetComponent") {
            body = { "WillingToSell": 1, "OfferPriceFrom": priceFrom, "OfferPriceTo": priceTo}
        }
        if (componentName == "FindPetLoveComponent") {
            body = { "WillingToSell": 0, "OfferPriceFrom": priceFrom, "OfferPriceTo": priceTo}
        }

        if (componentName == "AdoptionComponent") {
            body = { "AvilableForAdotpion": 1,"OfferPriceFrom": priceFrom, "OfferPriceTo": priceTo}
        }

        this.dataHasOrNotSubject.next(false);
        this.showloadingImageSubject.next(true);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl+'Utils/SearchPets?token=' + token, body, { headers: headers })
            .map((response: Response) => {
                const petList = response.json().Data;
                let transferPetList: Pet[] = [];
                for (let pet of petList) {
                    transferPetList.push(new Pet(
                        pet.AcceptedCount,
                        pet.AreaId,
                        pet.AreaName,
                        pet.AvilableForAdotpion,
                        pet.BreedId,
                        pet.BreedName,
                        pet.CityId,
                        pet.CityName,
                        pet.CountryId,
                        pet.Colors,
                        pet.CountryName,
                        pet.Description,
                        pet.Dummy,
                        pet.ExerciseNeeds,
                        pet.GoodWithDogs,
                        pet.GroomingNeeds,
                        pet.HeatingCycleFrom,
                        pet.HeatingCycleTo,
                        pet.Height,
                        pet.IsFavorite,
                        pet.KCIDetails,
                        pet.KCIRegistered,
                        pet.LastApprovedDate,
                        pet.LastRequstedDate,
                        pet.Latitude,
                        pet.Longitude,
                        pet.OfferPriceFrom,
                        pet.OfferPriceTo,
                        pet.PetDob,
                        pet.PetGender,
                        pet.PetId,
                        pet.PetName,
                        pet.PetOwnerId,
                        pet.PetType,
                        pet.PictrueName,
                        pet.RequestedCount,
                        pet.UserType,
                        pet.WatchdogAbility,
                        pet.Wight,
                        pet.WillingToSell,
                        pet.searchText
                    ));
                }
                this.showloadingImageSubject.next(false);
               
                return transferPetList;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }



}