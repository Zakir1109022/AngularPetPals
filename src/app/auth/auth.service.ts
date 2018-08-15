import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Observable, Subject } from 'rxjs'
import { Http, Response, Headers, RequestOptions } from "@angular/http";


@Injectable()
export class AuthService {

    private baseUrl = " http://app.petpals.love/staging/api/";


    token: string;
    tokenValue = new Subject<string>();
    emailValue = new Subject<string>();

    constructor(private http: Http) {

    }

    signUp(user: User) {
        var body = {
            "FirstName": user.FirstName,
            "AreaId": user.AreaId,
            "Dob": user.Dob,
            "UserId": user.UserId,
            "LastName": user.LastName,
            "MobilePhone": user.MobilePhone,
            "EmailId": user.EmailId,
            "Gender": user.Gender,
            "Password": user.Password,
            "EmailNotification": user.EmailNotification,
            "SmsNotification": user.SmsNotification,
            "UserProfilePicture": user.UserProfilePicture,
            "UserType": user.UserType,
            "CountryName": user.CountryName,
            "CityName": user.CityName,
            "CityId": user.CityId,
            "CountryId": user.CountryId,
            "AreaName": user.AreaName,
            "KCIRegistered": user.KCIRegistered,
            "KCIDetails": user.KCIDetails,
            "DeviceType": user.DeviceType,
            "ReferralCode": user.ReferralCode

        }

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';

        return this.http.post(this.baseUrl + 'MobileAccount/Register?token=' + token, body, { headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json();
                return jsonResult;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }



    saveUser(body: any, userToken: string) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('SecurityToken',userToken)
        headers.append('Authorization','Bearer '+userToken)


        return this.http.post(this.baseUrl + 'MobileAccount/SaveMyProfile', body, { headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json().Data;
                return jsonResult;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }



    signIn(UserName: string, Password: string) {
        var body = {
            "UserName": UserName,
            "Password": Password
        }

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = '6742142b-0623-4adc-8e41-0b290330db7f';
        return this.http.post(this.baseUrl + 'MobileAccount/Login?token=' + token, body, { headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json().Data;

                //for authentication
                if(jsonResult !=null)
                {
                    this.token=jsonResult.SecurityToken;
                    this.tokenValue.next(this.token);
                    this.emailValue.next(jsonResult.EmailId);
                }
               

                return jsonResult;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }




    saveImage(file: File) {
        let formData: FormData = new FormData();  
        formData.append('Content-Disposition', file);
        formData.append('name', 'DemoFieldName');
        formData.append('filename', file.name);
        formData.append('Content-Type', file.type);

        let headers = new Headers() 

        //headers = new Headers({ 'Content-Type': 'multipart/form-data; boundary=-------------------------acebdf13572468' });
        let options = new RequestOptions({ headers: headers });

        this.baseUrl='http://app.petpals.love/staging/api/';

        return this.http.post(this.baseUrl + 'Utils/UploadFile', formData, options)
            .map((response: Response) => {
                const jsonResult = response.json().Data;
                return jsonResult;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }



    forgotPassword(email: string) {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        var body={
            "EmailId":email
        }
        return this.http.post(this.baseUrl + 'MobileAccount/ForgotPassword', body, { headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json().Data;
                return jsonResult;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }



    isAuthenticate() {
        return this.token != null;
    }

}

