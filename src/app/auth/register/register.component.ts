import { Country } from './../../search/country.model';
import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { SearchService } from '../../search/search.service';
import { City } from '../../search/city.model';
import { Area } from '../../search/area.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    UserName: '',
    Password: '',
    FirstName: '',
    AreaId: 0,
    Dob: '',
    UserId: 0,
    LastName: '',
    MobilePhone: '',
    EmailId: '',
    Gender: '',
    EmailNotification: true,
    SmsNotification: true,
    UserProfilePicture: '',
    DeviceType: '',
    UserType: '',
    CountryId: 0,
    CountryName: '',
    CityId: 0,
    CityName: '',
    AreaName: '',
    KCIRegistered: 1,
    KCIDetails: '',
    ReferralCode: 0
  }



  UserTypeList = [];
  countryList = [];
  cityList = [];
  areaList = [];
  selectedCityName = '';
  selectedCountryName = '';
  selectedAreaName = '';

  files: FileList;
  uploadedFile: File;

  showloadingImage: boolean = false;


  constructor(
    private authService: AuthService,
    private searchService: SearchService,
  ) { }

  ngOnInit() {

    this.searchService.getUserTypeList()
      .subscribe((UserTypeList) => {
        this.UserTypeList = UserTypeList;
      });


    this.searchService.getCountryList()
      .subscribe((countryList: Country[]) => {
        this.countryList = countryList;
      })

  }



  onCountryChange(selectedCountry: Country) {
    this.searchService.getCityList(selectedCountry)
      .subscribe((cityList: City[]) => {
        this.cityList = cityList;
      });

    this.selectedCountryName = selectedCountry.CountryName;
  }


  onCityChange(selectedCity: City) {
    this.searchService.getAreaList(selectedCity)
      .subscribe((areaList: Area[]) => {
        this.areaList = areaList;
      });

    this.selectedCityName = selectedCity.CityName;
  }

  onAreaChange(selectedArea: Area) {
    this.selectedAreaName = selectedArea.AreaName;
  }





  fileChangeEvent(fileInput: any) {
    this.files = fileInput.target.files;
    this.uploadedFile= this.files[0];
  }



  onSubmit(userForm: NgForm) {
    this.showloadingImage = true;

    //save image
    this.authService.saveImage(this.uploadedFile)
      .subscribe((result) => {
        console.log(result.ImgUrl)
        this.user.UserProfilePicture=result.ImgUrl;
      });


    const UserName = userForm.value.FirstName + ' ' + userForm.value.LastName;

    this.user.UserName = UserName;
    this.user.Password = userForm.value.Password
    this.user.FirstName = userForm.value.FirstName
    this.user.AreaId = userForm.value.Area.Areaid;
    this.user.Dob = userForm.value.Dob;
    this.user.UserId = 6;
    this.user.LastName = userForm.value.LastName;
    this.user.MobilePhone = userForm.value.MobilePhone;
    this.user.EmailId = userForm.value.EmailId;
    this.user.Gender = userForm.value.Gender;
    this.user.EmailNotification = true;
    this.user.SmsNotification = true;
    this.user.DeviceType = "Web";
    this.user.UserType = userForm.value.UserType;
    this.user.CountryId = userForm.value.Country.CountryId;
    this.user.CountryName = userForm.value.Country.CountryName;
    this.user.CityId = userForm.value.City.CityId;
    this.user.CityName = userForm.value.City.CityName;
    this.user.AreaName = userForm.value.Area.AreaName;
    this.user.KCIRegistered = 1;
    this.user.KCIDetails = userForm.value.KCIDetails;
    this.user.ReferralCode = 0;


    console.log(this.user);

    this.authService.signUp(this.user)
    .subscribe((result:any)=>{
      this.showloadingImage = false;
      window.alert('success');
    });


  }



}
