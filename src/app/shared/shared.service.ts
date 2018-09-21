import { Http, Response, Headers } from '@angular/http'
import { Injectable } from "@angular/core";
import 'rxjs';
import { Subject, Observable } from "rxjs";
import { Pet } from "./pet.model";
import { ConfigService } from './api_settings/config.service';

@Injectable()
export class SharedService {

    private baseUrl;

    searchPetList = new Subject<Pet[]>();
    showloadingImageSubject = new Subject<boolean>();
    dataHasOrNotSubject = new Subject<boolean>();


    constructor
        (
        private http: Http,
        private apiConfig: ConfigService
        ) {
        this.baseUrl = apiConfig.getApiURI();
    }


    getPetByPetId(petId: number) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.baseUrl + 'Utils/GetPetDetails?petId=' + petId, { headers: headers })
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


    Request(body: any, userToken: string, requestType: string, requestedPet: Pet) {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('SecurityToken', userToken)
        headers.append('Authorization', 'Bearer ' + userToken)

        return this.http.post(this.baseUrl + 'Utils/' + requestType, body, { headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json();
                this.showloadingImageSubject.next(false);

                return jsonResult;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }



    getAllRequest(token: string) {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('SecurityToken', token)
        headers.append('Authorization', 'Bearer ' + token)

        return this.http.get(this.baseUrl + 'Utils/MessageList', { headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json().Data;
                this.showloadingImageSubject.next(false);

                return jsonResult;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }


    WidrawRequest(requestId: number, token: string) {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('SecurityToken', token)
        headers.append('Authorization', 'Bearer ' + token)

        return this.http.get(this.baseUrl + 'Utils/WithdrawRequest?PetMatingRequestId=' + requestId, { headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json();
                return jsonResult;
            })
            .catch((error: Response) => {
                window.alert(error.json().Message);
                return Observable.throw(error.json())
            });
    }



    showServicesByPage(pageNumber: number, _body: object) {
        var body = _body;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl + 'Utils/SearchPets?token=' + token + '&pageNumber=' + pageNumber, body, { headers: headers })
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