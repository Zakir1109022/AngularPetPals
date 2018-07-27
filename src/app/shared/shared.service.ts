import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../auth/user.model";

@Injectable()
export class SharedService {

    securityToken = new Subject<string>();
    emailId = new Subject<string>();
    loginUser = new Subject<User>();
    constructor() {

    }

}