import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Route } from "@angular/compiler/src/core";

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.authService.isAuthenticate() == false)
        {
            this.router.navigate(['/home']);
        }
        return this.authService.isAuthenticate();
    }

    canLoad(route: Route) {
        if(this.authService.isAuthenticate() == false)
        {
            this.router.navigate(['/home']);
        }
        return this.authService.isAuthenticate();
    }
}