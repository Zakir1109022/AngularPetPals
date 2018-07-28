import { Http, Response, Headers } from '@angular/http'
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable, Subject } from 'rxjs'
import { Pet } from '../shared/pet.model';

@Injectable()
export class FindPetLoveService {

    private baseUrl="http://staging.mypetfriends.in/api/";
    private PetList: Pet[] = [];
    searchPetList = new Subject<Pet[]>();

    showloadingImageSubject = new Subject<boolean>();
    dataHasOrNotSubject = new Subject<boolean>();

    constructor(private http: Http) {

    }

    showFindPatLoveByPage(pageNumber: number) {
        var body = { "WillingToSell": 0 }
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl+'Utils/SearchPets?token=' + token + '&pageNumber=' + pageNumber, body, { headers: headers })
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


    getFindPatLoveByPetId(petId: number) {
        var body = { "WillingToSell": 0, "PetId": petId }
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


    getFindPatLoveByPetOwnerId(petOwnerId: number) {
        var body = { "WillingToSell": 0, "PetOwnerId": petOwnerId }
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



    getFindPatLoveByPetType(petType: string) {
        var body = { "WillingToSell": 0, "PetType": petType }
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


    getFindPatLoveByBreedName(breedName: string) {
        var body = { "WillingToSell": 0, "BreedName": breedName }
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

    getFindPatLoveByGender(gender: string) {
        var body = { "WillingToSell": 0, "PetGender": gender }
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

    getFindPatLoveByLocation(country: string, city: string, area: string) {
        var body = { "WillingToSell": 0, "AreaName": area, "CityName": city, "CountryName": country }
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


    getFindPatLoveByGeneral(isKCI: boolean) {
        var body = { "WillingToSell": 0, "KCIRegistered": isKCI }
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


    getFindPatLoveByPrice(priceFrom: number, priceTo: number) {
        var body = { "WillingToSell": 0, "OfferPriceFrom": priceFrom, "OfferPriceTo": priceTo }
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


    findPetLoveRequest(body: any, userToken: string) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('SecurityToken',userToken)
        headers.append('Authorization','Bearer '+userToken)

        this.baseUrl=' http://app.petpals.love/staging/api/'

        return this.http.post(this.baseUrl + 'Utils/RequestPetMatingRequest', body, { headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json();
                this.showloadingImageSubject.next(false);
                return jsonResult;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }

}