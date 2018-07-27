import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {NgModule} from '@angular/core';
import {OwnAPetComponent} from './own-a-pet/own-a-pet.component';
import {FindPetLoveComponent} from './find-pet-love/find-pet-love.component';
import {BuyPetNeedsComponent} from './buy-pet-needs/buy-pet-needs.component';
import {AlliedServiceComponent} from './allied-service/allied-service.component';
import {AdoptionComponent} from './adoption/adoption.component';
import {ErrorpageComponent} from './errorpage/errorpage.component';
import { OwnAPetDetailsComponent } from './own-a-pet/own-a-pet-details/own-a-pet-details.component';
import { FindPetLoveDetailsComponent } from './find-pet-love/find-pet-love-details/find-pet-love-details.component';
import { AdoptionDetailsComponent } from './adoption/adoption-details/adoption-details.component';
import { AlliedServiceDetailsComponent } from './allied-service/allied-service-details/allied-service-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthGuard } from './auth/auth-guard.service';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'own-a-pet', component: OwnAPetComponent},
  { path: 'own-a-pet-details/:id', component: OwnAPetDetailsComponent},
  { path: 'find-pet-love', component: FindPetLoveComponent},
  { path: 'find-pet-love-details/:id', component: FindPetLoveDetailsComponent},
  { path: 'buy-pet-needs', component: BuyPetNeedsComponent},
  { path: 'allied-service', component: AlliedServiceComponent},
  { path: 'allied-service-details/:id', component: AlliedServiceDetailsComponent},
  { path: 'adoption', component: AdoptionComponent},
  { path: 'adoption-details/:id', component: AdoptionDetailsComponent},
  { path: 'sign-up', component: RegisterComponent},
  { path: 'sign-in', component: LoginComponent},
  { path: 'contact-us', component: ContactUsComponent,canLoad: [AuthGuard],canActivate: [AuthGuard]},
  { path: 'not-found', component: ErrorpageComponent},
  { path: '**', redirectTo: '/not-found'}
]
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

