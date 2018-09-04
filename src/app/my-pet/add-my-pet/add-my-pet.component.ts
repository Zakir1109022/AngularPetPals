import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { MyPet } from '../MyPet.model';
import { City } from '../../search/city.model';
import { Area } from '../../search/area.model';
import { MyPetService } from '../MyPet.service';
import { Breed } from '../../search/breed.model';
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-add-my-pet',
  templateUrl: './add-my-pet.component.html',
  styleUrls: ['./add-my-pet.component.css']
})
export class AddMyPetComponent implements OnInit {

  myPet: MyPet = {
    PetId: 0,
    PetName: '',
    BreedName: '',
    Height: 0,
    Wight: 0,
    Colors: '',
    GroomingNeeds: true,
    ExerciseNeeds: true,
    GoodWithDogs: true,
    WatchdogAbility: true,
    CountryName: 'India',
    CityName: '',
    AreaName: '',
    HeatingCycleFrom: '',
    HeatingCycleTo: '',
    PetGender: '',
    PictrueName: '',
    PetDob: '',
    PetType: '',
    KCIRegistered: false,
    KCIDetails: '',
    AvilableForAdotpion: false,
    OfferPriceFrom: 0,
    OfferPriceTo: 0,
    Parenting: false,
    Taken: false,
    Latitude: 0,
    Longitude: 0
  }



  petTypeList = [];
  breedList: Breed[] = [];
  countryList = [];
  cityList: City[] = [];
  areaList: Area[] = [];
  selectedCityName = '';
  selectedCountryName = '';
  selectedAreaName = '';

  files: FileList;
  uploadedFile: File;
  imagePath: string = "#";
  petId: number;
  isEditPet: boolean = false;
  myPetList: MyPet[] = [];
  buttonName = 'Add';
  petImageUrl: string;
  showloadingImage: boolean = true;




  constructor(
    private myPetService: MyPetService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.petId = params['id'];

        if (this.petId != null) {
          this.isEditPet = true;
          this.buttonName = 'Update';
        }
        else {
          this.isEditPet = false;
          this.buttonName = 'Save';
          this.showloadingImage=false;
        }
      })


    const token = localStorage.getItem("token");
    if (this.isEditPet) {
      this.myPetService.mypetByPetId(token, this.petId)
        .subscribe((result: any) => {
          let status = result.Status;
          if (status != "Errored") {
            this.myPetList = result.Data;
            console.log(result.Data[0].CityId);

            this.myPet.PetId = this.myPetList[0].PetId;
            this.myPet.PetName = this.myPetList[0].PetName;
            this.myPet.BreedName = this.myPetList[0].BreedName;
            this.myPet.Height = this.myPetList[0].Height;
            this.myPet.Wight = this.myPetList[0].Wight;
            this.myPet.Colors = this.myPetList[0].Colors;
            this.myPet.GroomingNeeds = this.myPetList[0].GroomingNeeds;
            this.myPet.ExerciseNeeds = this.myPetList[0].ExerciseNeeds;
            this.myPet.GoodWithDogs = this.myPetList[0].GoodWithDogs;
            this.myPet.WatchdogAbility = this.myPetList[0].WatchdogAbility;
            this.myPet.CountryName = this.myPetList[0].CountryName;
            this.myPet.CityName = this.myPetList[0].CityName;
            this.myPet.AreaName = this.myPetList[0].AreaName;
            this.myPet.HeatingCycleFrom = this.formatDate(this.myPetList[0].HeatingCycleFrom);
            this.myPet.HeatingCycleTo = this.formatDate(this.myPetList[0].HeatingCycleTo);
            this.myPet.PetGender = this.myPetList[0].PetGender;
            this.myPet.PictrueName = this.myPetList[0].PictrueName;
            this.myPet.PetDob = this.formatDate(this.myPetList[0].PetDob);
            this.myPet.PetType = this.myPetList[0].PetType;
            this.myPet.KCIRegistered = this.myPetList[0].KCIRegistered;
            this.myPet.KCIDetails = this.myPetList[0].KCIDetails;
            this.myPet.AvilableForAdotpion = this.myPetList[0].AvilableForAdotpion;
            this.myPet.OfferPriceFrom = this.myPetList[0].OfferPriceFrom;
            this.myPet.OfferPriceTo = this.myPetList[0].OfferPriceTo;
            this.myPet.Parenting = this.myPetList[0].Parenting;
            this.myPet.Taken = this.myPetList[0].Taken;
            this.myPet.Latitude = this.myPetList[0].Latitude;
            this.myPet.Longitude = this.myPetList[0].Longitude;

            this.imagePath = this.myPetList[0].PictrueName;

            //load area list
            this.myPetService.getAreaList(result.Data[0].CityId)
              .subscribe((areaList: Area[]) => {
                this.areaList = areaList;
              });
          }
          else {
            this.toastr.error(result.ErrorMessage, 'Error')
          }

        })
    }

    this.myPetService.showloadingImageSubject
    .subscribe((trueorfalse: boolean) => {
      this.showloadingImage = trueorfalse;
    })

    //...........................................................................................................
    this.myPetService.getCityList(24)
      .subscribe((cityList: City[]) => {
        this.cityList = cityList;
      });



    this.myPetService.getPetTypeList()
      .subscribe((petTpeList) => {
        this.petTypeList = petTpeList;
      });



    this.myPetService.getBreedList()
      .subscribe((breedList: Breed[]) => {
        this.breedList = breedList;
      });


  }


  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }



  onCityChange(selectedCity: string) {
    //get cityId from city list
    let cityId = this.cityList.find(c => c.CityName == selectedCity).CityId

    this.myPetService.getAreaList(cityId)
      .subscribe((areaList: Area[]) => {
        this.areaList = areaList;
      });

    this.selectedCityName = selectedCity;
  }

  onAreaChange(selectedArea: string) {
    this.selectedAreaName = selectedArea;
  }



  fileChangeEvent(fileInput: any) {
    this.files = fileInput.target.files;
    this.uploadedFile = this.files[0];


    var reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      //no problem for this error
      this.imagePath = (<FileReader>event.target).result;
    }

    reader.readAsDataURL(fileInput.target.files[0]);
  }


  onChange(selectedValue: string) {
    console.log(selectedValue)
    if (selectedValue == "Dating") {
      this.myPet.Taken = true;
    }
    else if (selectedValue = "AvilableForAdotpion") {
      this.myPet.AvilableForAdotpion = true;
    }
    else {
      this.myPet.Parenting = true;
    }
  }


  onSubmit(myPetForm: NgForm) {


    if (this.isEditPet) { //for edit pet
      if (this.uploadedFile != undefined) {
        //save image
        this.myPetService.saveImage(this.uploadedFile)
          .subscribe((result) => {
            this.myPet.PictrueName = result.ImgUrl;
            this.petImageUrl = result.ImgUrl;
          });
      }


      if (myPetForm.value.PetName != "" && myPetForm.value.PetType != "" && myPetForm.value.Description && myPetForm.value.BreedName != "" &&
        myPetForm.value.City != undefined && myPetForm.value.Area != undefined &&
        myPetForm.value.Gender != "" && myPetForm.value.Dob != "" && myPetForm.value.PetColor != "") {

        //set form value to myPet model
        this.myPet.PetId = this.petId;
        this.myPet.PetName = myPetForm.value.PetName;
        this.myPet.PetType = myPetForm.value.PetType;
        this.myPet.KCIDetails = myPetForm.value.Description;
        this.myPet.BreedName = myPetForm.value.BreedName;
        this.myPet.PetGender = myPetForm.value.Gender;
        this.myPet.CityName = myPetForm.value.City;
        this.myPet.AreaName = myPetForm.value.Area;
        this.myPet.PetDob = myPetForm.value.Dob;
        this.myPet.Colors = myPetForm.value.PetColor;
        this.myPet.HeatingCycleFrom = myPetForm.value.HeatingCycleFrom;
        this.myPet.HeatingCycleTo = myPetForm.value.HeatingCycleTo;
        this.myPet.KCIRegistered = myPetForm.value.KCIRegistered;


        const token = localStorage.getItem("token");

        this.myPetService.updateMypet(this.myPet, token, this.petImageUrl)
          .subscribe((result: any) => {
            let status = result.Status;
            if (status != "Errored") {
              this.router.navigate(['/my-pet']);
              this.toastr.success('Success', 'Success')
            }
            else {
              this.toastr.error(result.ErrorMessage, 'Error')
            }

          });

      }
      else {
        this.toastr.error('Please add required data', 'Error')
      }
    }
    else { //for add pet

      //save image
      this.myPetService.saveImage(this.uploadedFile)
        .subscribe((result) => {
          this.myPet.PictrueName = result.ImgUrl;
          this.petImageUrl = result.ImgUrl;
        });

      if (myPetForm.value.PetName != "" && myPetForm.value.PetType != "" && myPetForm.value.Description && myPetForm.value.BreedName != "" &&
        myPetForm.value.City != undefined && myPetForm.value.Area != undefined &&
        myPetForm.value.Gender != "" && myPetForm.value.Dob != "" && myPetForm.value.PetColor != "") {

        //set form value to myPet model
        this.myPet.PetName = myPetForm.value.PetName;
        this.myPet.PetType = myPetForm.value.PetType;
        this.myPet.KCIDetails = myPetForm.value.Description;
        this.myPet.BreedName = myPetForm.value.BreedName;
        this.myPet.PetGender = myPetForm.value.Gender;
        this.myPet.CityName = myPetForm.value.City;
        this.myPet.AreaName = myPetForm.value.Area;
        this.myPet.PetDob = myPetForm.value.Dob;
        this.myPet.Colors = myPetForm.value.PetColor;
        this.myPet.HeatingCycleFrom = myPetForm.value.HeatingCycleFrom;
        this.myPet.HeatingCycleTo = myPetForm.value.HeatingCycleTo;
        this.myPet.KCIRegistered = myPetForm.value.KCIRegistered;


        const token = localStorage.getItem("token");

        this.myPetService.saveMypet(this.myPet, token, this.petImageUrl)
          .subscribe((result: any) => {
            let status = result.Status;
            if (status != "Errored") {
              this.router.navigate(['/my-pet']);
              this.toastr.success('Success', 'Success')
            }
            else {
              this.toastr.error(result.ErrorMessage, 'Error')
            }

          });

      }
      else {
        this.toastr.error('Please add required data', 'Error')
      }
    }


  }



}
