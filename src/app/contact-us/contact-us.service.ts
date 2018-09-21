import { Injectable } from "@angular/core";
import { Observable } from 'rxjs'
import { Http, Response, Headers } from "@angular/http";
import { ConfigService } from "../shared/api_settings/config.service";


@Injectable()
export class ContactUsService {


    private baseUrl;

    constructor(
        private http: Http,
        private apiConfig: ConfigService
    ) {
        this.baseUrl = apiConfig.getApiURI()
    }


    contactUs(subject: string, message: string, token: string) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('SecurityToken', token)
        headers.append('Authorization', 'Bearer ' + token)


        return this.http.get(this.baseUrl + 'Utils/ContactUs?Subject=' + subject + '&Message=' + message, { headers: headers })
            .map((response: Response) => {
                const jsonResult = response.json();
                return jsonResult;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json())
            });
    }




}

