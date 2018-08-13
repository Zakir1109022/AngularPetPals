import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { OwnAPetComponent } from './own-a-pet/own-a-pet.component';
import { FindPetLoveComponent } from './find-pet-love/find-pet-love.component';
import { BuyPetNeedsComponent } from './buy-pet-needs/buy-pet-needs.component';
import { AlliedServiceComponent } from './allied-service/allied-service.component';
import { AdoptionComponent } from './adoption/adoption.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { OwnPetService } from './own-a-pet/own-a-pet.service';
import { HttpModule } from '@angular/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchService } from './search/search.service';
import { FindPetLoveService } from './find-pet-love/find-pet-love.service';
import { AlliedService } from './allied-service/aliend-service.service';
import { AdoptionService } from './adoption/adoption.service';
import { OwnAPetDetailsComponent } from './own-a-pet/own-a-pet-details/own-a-pet-details.component';
import { AdoptionDetailsComponent } from './adoption/adoption-details/adoption-details.component';
import { FindPetLoveDetailsComponent } from './find-pet-love/find-pet-love-details/find-pet-love-details.component';
import { AlliedServiceDetailsComponent } from './allied-service/allied-service-details/allied-service-details.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollerDirective } from './shared/infinite-scroller.directive';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { AuthService } from './auth/auth.service';
import { SharedService } from './shared/shared.service';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactUsService } from './contact-us/contact-us.service';
import { AuthGuard } from './auth/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { MyRequestComponent } from './my-request/my-request.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    FooterComponent,
    OwnAPetComponent,
    FindPetLoveComponent,
    BuyPetNeedsComponent,
    AlliedServiceComponent,
    AdoptionComponent,
    ErrorpageComponent,
    NavBarComponent,
    OwnAPetDetailsComponent,
    AdoptionDetailsComponent,
    FindPetLoveDetailsComponent,
    AlliedServiceDetailsComponent,
    RegisterComponent,
    LoginComponent,
    InfiniteScrollerDirective,
    ContactUsComponent,
    MyRequestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularDateTimePickerModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [
    OwnPetService,
    SearchService,
    FindPetLoveService,
    AlliedService,
    AdoptionService,
    AuthService,
    SharedService,
    ContactUsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
