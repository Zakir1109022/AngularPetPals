import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs';
import { Observable, Subject } from 'rxjs'
import { City } from "../search/city.model";
import { Area } from "../search/area.model";
import { MyPet } from "./MyPet.model";

@Injectable()
export class MyPetService {

    private baseUrl = "http://staging.mypetfriends.in/api/";
    private baseUrl2 = "http://app.petpals.love/staging/api/"


    showloadingImageSubject = new Subject<boolean>();
    dataHasOrNotSubject = new Subject<boolean>();

    constructor(private http: Http) { }


    getPetTypeList() {
        return this.http.get(this.baseUrl + 'Utils/GetAllPetTypes')
            .map((response: Response) => {
                const petList = response.json().Data;
                return petList;
            })
            .catch((error: Response) => Observable.throw(error));
    }

    getBreedList() {
        return this.http.get(this.baseUrl + 'Utils/GetBreedListByString')
            .map((response: Response) => {
                const breedList = response.json().Data;
                return breedList;
            })
            .catch((error: Response) => Observable.throw(error));
    }



    getCityList(countryId: number) {
        return this.http.get(this.baseUrl + 'Utils/GetCityListByCountry?countryid=' + countryId)
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


    getAreaList(cityId:number) {
        return this.http.get(this.baseUrl + 'Utils/GetAreaListByCity?cityid=' + cityId)
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




    saveMypet(myPet: MyPet, token: string,petImage:string) {
        console.log(petImage)
        var body = {
            "PetName": myPet.PetName,
            "BreedName": myPet.BreedName,
            "Height": myPet.Height,
            "Wight": myPet.Wight,
            "Colors": myPet.Colors,
            "GroomingNeeds": myPet.GroomingNeeds,
            "ExerciseNeeds": myPet.ExerciseNeeds,
            "GoodWithDogs": myPet.GoodWithDogs,
            "WatchdogAbility": myPet.WatchdogAbility,
            "CountryName": myPet.CountryName,
            "CityName": myPet.CityName,
            "AreaName": myPet.AreaName,
            "HeatingCycleFrom": myPet.HeatingCycleFrom,
            "HeatingCycleTo": myPet.HeatingCycleTo,
            "PetGender": myPet.PetGender,
            "PictrueName": petImage,
            "PetDob": myPet.PetDob,
            "PetType": myPet.PetType,
            "KCIRegistered": myPet.KCIRegistered,
            "KCIDetails": myPet.KCIDetails,
            "AvilableForAdotpion": myPet.AvilableForAdotpion,
            "OfferPriceFrom": myPet.OfferPriceFrom,
            "OfferPriceTo": myPet.OfferPriceTo,
            "Parenting": myPet.Parenting,
            "Taken": myPet.Taken,
            "Latitude": myPet.Latitude,
            "Longitude": myPet.Longitude

        }

        console.log(body)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('SecurityToken', token)
        headers.append('Authorization', 'Bearer ' + token)


        return this.http.post(this.baseUrl2 + 'Utils/AddPet', body, { headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json();
                return jsonResult;
            })
            .catch((error: Response) => {
                window.alert('Internal server error! please try again.')
                return Observable.throw(error.json())
            });
    }


    updateMypet(myPet: MyPet, token: string,petImage:string) {
        console.log(petImage)
        var body = {
            "PetId": myPet.PetId,
            "PetName": myPet.PetName,
            "BreedName": myPet.BreedName,
            "Height": myPet.Height,
            "Wight": myPet.Wight,
            "Colors": myPet.Colors,
            "GroomingNeeds": myPet.GroomingNeeds,
            "ExerciseNeeds": myPet.ExerciseNeeds,
            "GoodWithDogs": myPet.GoodWithDogs,
            "WatchdogAbility": myPet.WatchdogAbility,
            "CountryName": myPet.CountryName,
            "CityName": myPet.CityName,
            "AreaName": myPet.AreaName,
            "HeatingCycleFrom": myPet.HeatingCycleFrom,
            "HeatingCycleTo": myPet.HeatingCycleTo,
            "PetGender": myPet.PetGender,
            "PictrueName": petImage,
            "PetDob": myPet.PetDob,
            "PetType": myPet.PetType,
            "KCIRegistered": myPet.KCIRegistered,
            "KCIDetails": myPet.KCIDetails,
            "AvilableForAdotpion": myPet.AvilableForAdotpion,
            "OfferPriceFrom": myPet.OfferPriceFrom,
            "OfferPriceTo": myPet.OfferPriceTo,
            "Parenting": myPet.Parenting,
            "Taken": myPet.Taken,
            "Latitude": myPet.Latitude,
            "Longitude": myPet.Longitude

        }

        console.log(body)
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('SecurityToken', token)
        headers.append('Authorization', 'Bearer ' + token)


        return this.http.post(this.baseUrl2 + 'Utils/UpdatePet', body, { headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json();
                return jsonResult;
            })
            .catch((error: Response) => {
                window.alert('Internal server error! please try again.')
                return Observable.throw(error.json())
            });
    }


    mypetByPetId(token: string,petId:number) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('SecurityToken', token)
        headers.append('Authorization', 'Bearer ' + token)


        return this.http.get('http://app.petpals.love/staging/api/Utils/GetPetDetails?petId='+petId,{ headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json();
                this.showloadingImageSubject.next(false)
                return jsonResult;
            })
            .catch((error: Response) => {
                window.alert(error.json().ErrorMessage)
                return Observable.throw(error.json())
            });
    }





    mypetList(token: string) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('SecurityToken', token)
        headers.append('Authorization', 'Bearer ' + token)

        var body = {};

        return this.http.post('http://app.petpals.love/staging/api/Utils/mypets', body, { headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json();
                this.showloadingImageSubject.next(false)
                return jsonResult;
            })
            .catch((error: Response) => {
                window.alert(error.json().ErrorMessage)
                return Observable.throw(error.json())
            });
    }



    deleteMypet(token: string, petId: number) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('SecurityToken', token)
        headers.append('Authorization', 'Bearer ' + token)

        var body = { "PetId": petId }

        return this.http.post('http://app.petpals.love/staging/api/Utils/DeletePet', body, { headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json();
                this.showloadingImageSubject.next(false)
                return jsonResult;
            })
            .catch((error: Response) => {
                window.alert(error.json().Message)
                return Observable.throw(error.json())
            });
    }





    saveImage(file: File) {
        if (file != undefined) {
            let formData: FormData = new FormData();
            formData.append('Content-Disposition', file);
            formData.append('name', 'DemoFieldName');
            formData.append('filename', file.name);
            formData.append('Content-Type', file.type);

            let headers = new Headers()

            //headers = new Headers({ 'Content-Type': 'multipart/form-data; boundary=-------------------------acebdf13572468' });
            let options = new RequestOptions({ headers: headers });


            return this.http.post(this.baseUrl2 + 'Utils/UploadFile', formData, options)
                .map((response: Response) => {
                    const jsonResult = response.json().Data;
                    return jsonResult;
                })
                .catch((error: Response) => {
                    window.alert('Please add pet image');
                    return Observable.throw(error.json())
                });
        }
        else {
            window.alert('Please add pet image');
        }

    }

}